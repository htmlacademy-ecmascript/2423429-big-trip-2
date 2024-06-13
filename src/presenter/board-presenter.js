import SortView from '../view/sort.js';
import PointView from '../view//event.js';
import FormView from '../view//event-form.js';
import {render} from '../render.js';
//TODO: импортировать Model только сюда (new Model)
export default class BoardPresenter {
  sortComponent = new SortView();
  formComponent = new FormView();
  // pointComponent = new PointView(); //TODO: добавить аргументы
  boardPoints = [];

  constructor({container, pointModel}){
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.pointModel.getPoints()];
    render(this.sortComponent, this.container);
    render(this.formComponent, this.container);
    for (let i = 0 ; i < this.boardPoints.length; i++){
      render(new PointView({point:this.boardPoints[i]}), this.container.querySelector('.trip-events__list'));
    }
  }

}
