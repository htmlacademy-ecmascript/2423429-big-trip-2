import SortView from '../view/sort.js';
import ListView from '../view/trip-events-list.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { sortByPrice, sortByTime, sortByDay } from '../utils.js';
import { SortType, UserAction, UpdateType, MAX_POINTS } from '../const.js';

export default class BoardPresenter {
  #tripListComponent = new ListView();
  #sortComponent = null;
  #listEmpty = new ListEmpty();
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;

  #renderedPointCount = MAX_POINTS;

  constructor({container, pointModel, offersModel, citiesModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
    this.citiesModel = citiesModel;

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
    // this.#boardPoints = [...this.pointModel.points];
    // this.#sourcedBoardPoints = [...this.pointModel.points];
    this.#renderBoard();
  }

  //#handlePointChange = (updatedPoint) => {
  // this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
  // this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
  // Здесь будет вызывать обновление модели
  //this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  //};

  #handleViewAction = (actionType, updateType, update) => {
    //console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

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
        this.#clearBoard({resetRenderedPointCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedPointCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#handleSortTypeChange,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.container, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
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

  // #clearPoints() {
  //   this.#pointPresenters.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenters.clear();
  // }

  #renderPoints() {
    if (this.points.length === 0){
      render(this.#listEmpty, this.#tripListComponent.element);

      return;
    }

    this.points.forEach((point) => this.#renderPoint(point));
  }

  #clearBoard({ resetSortType = false} = {}) {

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
    //this.#renderPoints();
    render(this.#tripListComponent, this.container);

    this.#renderPoints(points.slice(0, Math.min(pointCount, this.#renderedPointCount)));

  }
}
