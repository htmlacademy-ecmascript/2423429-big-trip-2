import {render, replace} from '../framework/render.js';
import PointView from '../view/event.js';
import EditorView from '../view/event-edit-form.js';

export default class PointPresenter {
  #pointListContainer = null;
  #offersModel = null;
  #pointComponent = null;
  #editorComponent = null;
  #point = null;


  constructor ({pointListContainer, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;
    this.#pointComponent = new PointView({
      point: this.#point,
      onPointClick: () =>{
        this.#replacePointToEditor();
      },
      offers: this.#offersModel.offers
    });

    this.#editorComponent = new EditorView({
      point,
      onEditorClick: () =>{
        this.replaceEditorToPoint();
      },
      offers: this.#offersModel.offers
    });

    render(this.#pointComponent, this.#pointListContainer.querySelector('.trip-events__list'));
  }

  #replacePointToEditor() {
    replace(this.#editorComponent, this.#pointComponent);

  }

  replaceEditorToPoint() {
    replace(this.#pointComponent, this.#editorComponent);
  }
}
