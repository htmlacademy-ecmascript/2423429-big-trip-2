import PointView from '../view//event.js';
import SortView from '../view/sort.js';
import {render, replace} from '../framework/render.js';
import listView from '../view/tripEventsList.js';
import EditorView from '../view/eventEditForm.js';
import ListEmpty from '../view/listEmpty.js';
export default class BoardPresenter {
  #tripListComponent = new listView();
  #sortComponent = new SortView();
  #boardPoints = [];
  #listEmpty = new ListEmpty();


  #renderPoint(point){
    const pointComponent = new PointView({
      point,
      onPointClick: () => {
        replacePointToEditor();
      },
      offers: this.offersModel.offers
    });

    const editorComponent = new EditorView({
      point,
      onEditorClick: () => {
        replaceEditorToPoint();
      },
      offers: this.offersModel.offers
    });

    function replacePointToEditor (){
      replace(editorComponent, pointComponent);
    }

    function replaceEditorToPoint (){
      replace(pointComponent, editorComponent);
    }

    render(pointComponent, this.container.querySelector('.trip-events__list'));
  }

  #renderPoints() {
    if(this.#boardPoints.length === 0){
      render(this.#listEmpty, this.container.querySelector('.trip-events__list'));
    } else {
      for (let i = 0 ; i < this.#boardPoints.length; i++){
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  }

  constructor({container, pointModel, offersModel}){
    this.container = container;
    this.pointModel = pointModel;
    this.offersModel = offersModel;
  }

  init() {
    this.#boardPoints = [...this.pointModel.element];
    render(this.#sortComponent, this.container);
    render(this.#tripListComponent, this.container);
    this.#renderPoints();
  }

}
