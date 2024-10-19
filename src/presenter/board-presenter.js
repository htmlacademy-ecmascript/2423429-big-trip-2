import SortView from '../view/sort.js';
import ListView from '../view/trip-events-list.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import { sortByPrice, sortByTime, sortByDay } from '../utils.js';
import { SortType, UserAction, UpdateType } from '../const.js';

export default class BoardPresenter {
  #tripListComponent = new ListView();
  #sortComponent = null;
  #listEmpty = new ListEmpty();
  #newPointButtonComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #newPointPresenter = null;
  #header = null;

  constructor({container, header, pointModel, offersModel, citiesModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
    this.citiesModel = citiesModel;
    this.#header = header;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
      offers: offersModel.offers,
      cities: citiesModel.cities,
    });
    this.pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return [...this.pointModel.points].sort(sortByDay);
      case SortType.TIME:
        return [...this.pointModel.points].sort(sortByTime);
      case SortType.PRICE:
        return [...this.pointModel.points].sort(sortByPrice);
    }
    return this.pointModel.points;
  }

  init() {
    this.#newPointButtonComponent = new NewPointButtonView({onClick: this.#handleNewPointClick});
    render(this.#newPointButtonComponent, this.#header);
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.pointModel.deletePoint(updateType, update);
        break;
    }
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
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.container, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#tripListComponent,
      offersModel: this.offersModel,
      citiesModel: this.citiesModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    if (this.points.length === 0){
      render(this.#listEmpty, this.#tripListComponent.element);

      return;
    }

    this.points.forEach((point) => this.#renderPoint(point));
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#tripListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderBoard() {
    this.#renderSort();

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      render(this.#listEmpty, this.#tripListComponent.element);
      return;
    }
    render(this.#tripListComponent, this.container);

    this.#renderPoints(points);

  }

  #handleNewPointClick = () => {
    this.createPoint();
    this.#newPointButtonComponent.setDisabled();
  };

  #handleNewPointDestroy = () => {
    this.createPoint();
    this.#newPointButtonComponent.setDisabled();
  };
}
