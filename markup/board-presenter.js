import SortView from '../view/sort.js';
import PointView from '../view//event.js';
import FormView from '../view//event-form.js';
import {render} from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  formComponent = new FormView();
  pointComponent = new PointView();

  constructor({container}){
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.formComponent, this.container);
    for (let i = 0 ; i < 3; i++){
      render(new PointView(), this.container);
    }

  }

}
