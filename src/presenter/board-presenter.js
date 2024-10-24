import SortView from '../view/sort.js';
import ListView from '../view/trip-events-list.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import ListEmpty from '../view/list-empty.js';
import MessageView from '../view/message-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortByPrice, sortByTime, sortByDay } from '../utils.js';
import { SortType, UserAction, UpdateType, Message } from '../const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #tripListComponent = new ListView();
  #messageComponent = null;
  #sortComponent = null;
  #listEmpty = new ListEmpty();
  #newPointButtonComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
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

  constructor({container, header, pointModel, offersModel, citiesModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#offersModel = offersModel;
    this.#citiesModel = citiesModel;
    this.#header = header;


    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return [...this.#pointModel.points].sort(sortByDay);
      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortByPrice);
    }
    return this.#pointModel.points;
  }

  start() {
    this.#renderBoard();
  }

  init() {
    this.#newPointButtonComponent = new NewPointButtonView({onClick: this.#handleNewPointClick});
    render(this.#newPointButtonComponent, this.#header);

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities,
    });
  }

  createPoint() {
    remove(this.#listEmpty);
    this.#currentSortType = SortType.DEFAULT;
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
        remove(this.#listEmpty, this.#container);
        this.#isLoading = false;
        this.#renderMessage('message Error');

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
    if (this.points === 0){
      render(this.#listEmpty, this.#tripListComponent.element);

      return;
    }

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

  #renderBoard() {
    render(this.#tripListComponent, this.#container);

    if (this.#isLoading) {
      this.#renderMessage('loading...');
      return;
    }

    const points = this.points;

    this.#renderSort();

    if (points.length === 0) {
      render(this.#listEmpty, this.#container);
      return;
    } else {
      remove(this.#listEmpty, this.#container);
    }


    this.#renderPoints(points);

  }

  #handleNewPointClick = () => {
    this.createPoint();
    this.#newPointButtonComponent.setDisabled();
  };

  #handleNewPointDestroy = () => {
    this.#newPointButtonComponent.setEnabled();
    render(this.#listEmpty, this.#tripListComponent.element);
  };
}
