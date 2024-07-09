import PointView from '../view//event.js';
import FormView from '../view/tripEventsList.js';
import SortView from '../view/sort.js';
import {render} from '../framework/render.js';
import listView from '../view/tripEventsList.js';

export default class BoardPresenter {
  #tripListComponent = new listView();
  #sortComponent = new SortView();
  #boardPoints = [];

  constructor({container, pointModel}){
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.#boardPoints = [...this.pointModel.element];
    render(this.#sortComponent, this.container);
    render(this.#tripListComponent, this.container);
    for (let i = 0 ; i < this.#boardPoints.length; i++){
      render(new PointView({point:this.#boardPoints[i]}), this.container.querySelector('.trip-events__list'));
    }
  }

}
