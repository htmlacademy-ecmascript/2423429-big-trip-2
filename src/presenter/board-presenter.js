import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import ListEmpty from '../view/list-empty.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortByPrice, sortByTime, sortByDay, filter } from '../utils.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #tripListComponent = new ListView();
  #messageComponent = null;
  #sortComponent = null;
  #listEmpty = null;
  #newPointButtonComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #header = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #container = null;
  #pointModel = null;
  #offersModel = null;
  #citiesModel = null;
  #filterModel = null;

  constructor({container, header, pointModel, offersModel, citiesModel, filterModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#citiesModel = citiesModel;
    this.#filterModel = filterModel;
    this.#header = header;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return [...filteredPoints].sort(sortByDay);
      case SortType.TIME:
        return [...filteredPoints].sort(sortByTime);
      case SortType.PRICE:
        return [...filteredPoints].sort(sortByPrice);
    }
    return this.#pointModel.points;
  }

  start() {
    this.#newPointButtonComponent = new NewPointButtonView({onClick: this.#handleNewPointClick});
    render(this.#newPointButtonComponent, this.#header);
    this.#newPointButtonComponent.setDisabled();

    this.#renderBoard();

  }

  init() {
    this.#newPointButtonComponent.setEnabled();
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities,
    });
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.init();

  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, point) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#renderBoard();
        remove(this.#messageComponent);
        break;
      case UpdateType.INIT_ERROR:
        remove(this.#messageComponent);
        this.#isLoading = false;
        this.#renderMessage('Failed to load latest route information.');
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    render(this.#sortComponent = new SortView ({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    }),
    this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#tripListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      offersModel: this.#offersModel,
      citiesModel: this.#citiesModel,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderMessage(message) {
    render(this.#messageComponent = new MessageView({message})
      , this.#tripListComponent.element);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#messageComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderNoPoints() {
    this.#listEmpty = new ListEmpty({
      filterType: this.#filterType
    });

    render(this.#listEmpty, this.#container);
  }

  #renderBoard() {
    render(this.#tripListComponent, this.#container);

    if (this.#isLoading) {
      this.#renderMessage('Loading...');
      return;
    }

    const points = this.points;
    this.#renderSort();

    if(this.#listEmpty) {
      remove(this.#listEmpty);
    }

    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPoints(points);
  }

  #handleNewPointClick = () => {
    this.createPoint();
    this.#newPointButtonComponent.setDisabled();
  };

  #handleNewPointDestroy = () => {
    this.#newPointButtonComponent.setEnabled();
  };
}
