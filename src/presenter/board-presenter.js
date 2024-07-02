import PointView from '../view//event.js';
import FormView from '../view//event-form.js';
import SortView from '../view/sort.js';
import {render} from '../framework/render.js';

export default class BoardPresenter {
  formComponent = new FormView();
  sortComponent = new SortView();
  boardPoints = [];

  constructor({container, pointModel}){
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.pointModel.getElement()];
    render(this.sortComponent, this.container);
    render(this.formComponent, this.container);
    for (let i = 0 ; i < this.boardPoints.length; i++){
      render(new PointView({point:this.boardPoints[i]}), this.container.querySelector('.trip-events__list'));
    }
  }

}
