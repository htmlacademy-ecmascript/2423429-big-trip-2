import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import PointView from './view/event.js';
import FormView from './view/event-form.js';

import {render} from '../render.js';

export default class boardPresenter {
  boardComponent = new FilterView();
  sortComponent = new SortView();
  pointComponent = new PointView();
  formComponent = new FormView();

  constructor({boardContainer}){
    this.boardComponent = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new FilterView(), this.boardComponent.getElement());

    render(this.sortComponent, this.boardComponent.getElement());
    render(new SortView(), this.boardComponent.getElement());

    render(this.formComponent, this.boardComponent.getElement());
    render(new FormView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(this.pointComponent, this.boardComponent.getElement());
      render(new PointView(), this.boardComponent.getElement());
    }

  }

}
