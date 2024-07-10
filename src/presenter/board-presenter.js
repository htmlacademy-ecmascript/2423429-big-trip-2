import PointView from '../view//event.js';
import SortView from '../view/sort.js';
import {render, replace} from '../framework/render.js';
import listView from '../view/tripEventsList.js';
import EditorView from '../view/eventEditForm.js';

export default class BoardPresenter {
  #tripListComponent = new listView();
  #sortComponent = new SortView();
  #boardPoints = [];

  #renderPoint(point){
    const pointComponent = new PointView({
      point,
      onPointClick: () => {
        replacePointToEditor();
      }
    });

    const editorComponent = new EditorView({
      point,
      onEditorClick: () => {
        replaceEditorToPoint();
      }
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

    // render(pointComponent, this.container.querySelector('.trip-events__list'));
    // replace(pointComponent, this.#editor);

    for (let i = 0 ; i < this.#boardPoints.length; i++){
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  constructor({container, pointModel}){
    this.container = container;
    this.pointModel = pointModel;
  }

  init() {
    this.#boardPoints = [...this.pointModel.element];
    render(this.#sortComponent, this.container);
    render(this.#tripListComponent, this.container);
    this.#renderPoints();
    // render(this.#editor, this.container);


  }

}
