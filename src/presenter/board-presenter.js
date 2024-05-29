import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import PointView from '../view//event.js';
import FormView from '../view//event-form.js';
import {render} from '../render.js';

export default class BoardPresenter {
  filterComponent = new FilterView();
  sortComponent = new SortView();
  formComponent = new FormView();
  pointComponent = new PointView();

  constructor({container}){
    this.container = container;
  }

  init() {
    render(this.filterComponent, this.container);
    render(this.sortComponent, this.sortComponent);

  }

}
