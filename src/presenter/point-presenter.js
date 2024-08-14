import {render, replace} from '../framework/render.js';
import PointView from '../view/event.js';
import EditorView from '../view/eventEditForm.js';

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

  init(point, closeEditors) {
    this.#point = point;
    this.#pointComponent = new PointView({
      point: this.#point,
      onPointClick: () =>{
        //TODO: донести метод closeEditors
        closeEditors();
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
