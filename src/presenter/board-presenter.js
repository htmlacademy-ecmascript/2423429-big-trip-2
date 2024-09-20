import SortView from '../view/sort.js';
import ListView from '../view/trip-events-list.js';
import {render, RenderPosition} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { updateItem, sortByPrice, sortByTime } from '../utils.js';
import { sortType } from '../const.js';

export default class BoardPresenter {
  #tripListComponent = new ListView();
  #sortComponent = null;
  #boardPoints = [];
  #listEmpty = new ListEmpty();
  #pointPresenters = new Map();
  #currentSortType = sortType.DEFAULT;
  #sourcedBoardPoints = [];

  constructor({container, pointModel, offersModel, citiesModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
    this.citiesModel = citiesModel;
  }

  init() {
    this.#boardPoints = [...this.pointModel.points];
    this.#sourcedBoardPoints = [...this.pointModel.points];
    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    //console.log(this.#boardPoints);


    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardPoints
    switch (sortType) {
      case "sort-day":
        this.#boardPoints.sort(sortByTime); //доработать по дню??
        break;
      case "sort-time":
        this.#boardPoints.sort(sortByTime);
        break;
      case "sort-price":
        this.#boardPoints.sort(sortByPrice);

        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardPoints исходный массив
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {

      return;
    }
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    if (this.#boardPoints.length === 0){
      render(this.#listEmpty, this.#tripListComponent.element);

      return;
    }
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard () {
    this.#renderSort();
    render(this.#tripListComponent, this.container);
    this.#renderPoints();
  }

}
