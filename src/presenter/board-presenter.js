import PointView from '../view//event.js';
import SortView from '../view/sort.js';
import {render} from '../framework/render.js';
import listView from '../view/tripEventsList.js';
import EditorView from '../view/eventEditForm.js';

export default class BoardPresenter {
  #tripListComponent = new listView();
  #sortComponent = new SortView();
  #boardPoints = [];
  #editor = new EditorView();

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
      render(this.#editor, this.container);
      //this.#renderPoints({point:this.#boardPoints[i]});
    }

    // #renderPoints(this.#boardPoints) {
    //   const pointComponent = new PointView({point:this.#boardPoints[i]});

    //   render(pointComponent, this.container.querySelector('.trip-events__list'));

    // }

  }

}
