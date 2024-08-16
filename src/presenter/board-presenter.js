import SortView from '../view/sort.js';
import ListView from '../view/trip-events-list.js';
import {render} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #tripListComponent = new ListView();
  #sortComponent = new SortView();
  #boardPoints = [];
  #listEmpty = new ListEmpty();
  pointPresenters = [];

  #renderPoint(point){

    const pointPresenter = new PointPresenter ({
      pointListContainer: this.container,
      offersModel: this.offersModel
    });

    pointPresenter.init(point);
    //TODO: нужно созранить все pointPresenter по аналогии с boardPoints
    this.pointPresenters.push(pointPresenter);
    //TODO: this.pointPresenters.push(pointPresenter)
    //console.log(this.pointPresenters);
  }

  #renderPoints() {
    if(this.#boardPoints.length === 0){
      render(this.#listEmpty, this.#tripListComponent.element);
      return;
    }

    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  constructor({container, pointModel, offersModel}) {
    this.container = container;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
    //this.closeEditors = closeEditor;
  }

  init() {
    this.#boardPoints = [...this.pointModel.element];
    render(this.#sortComponent, this.container);
    render(this.#tripListComponent, this.container);
    this.#renderPoints();
  }
}
