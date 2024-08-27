import SortView from '../view/sort.js';
import ListView from '../view/trip-events-list.js';
import {render} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class BoardPresenter {
  #tripListComponent = new ListView();
  #sortComponent = new SortView();
  #boardPoints = [];
  #listEmpty = new ListEmpty();
  #pointPresenters = new Map();

  constructor({container, pointModel, offersModel, citiesModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
    this.citiesModel = citiesModel;
  }

  init() {
    this.#boardPoints = [...this.pointModel.element];
    render(this.#sortComponent, this.container);
    render(this.#tripListComponent, this.container);
    this.#renderPoints();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#tripListComponent,
      offersModel: this.offersModel,
      citiesModel: this.citiesModel,
      onDataChange: this.#handlePointChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    if(this.#boardPoints.length === 0){
      render(this.#listEmpty, this.#tripListComponent.element);
      return;
    }
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

}
