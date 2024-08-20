import {render, replace} from '../framework/render.js';
import PointView from '../view/event.js';
import EditorView from '../view/event-edit-form.js';

export default class PointPresenter {
  #pointListContainer = null;
  #offersModel = null;
  #citiesModel = null;
  #pointComponent = null;
  #editorComponent = null;

  constructor({pointListContainer, offersModel, citiesModel}) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
    this.#citiesModel = citiesModel;
  }

  init(point) {
    this.#pointComponent = new PointView({
      point,
      onPointClick: () =>{
        this.#replacePointToEditor();
      },
      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities
    });

    this.#editorComponent = new EditorView({
      point,
      onEditorClick: () =>{
        this.#replaceEditorToPoint();
      },
      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities
    });
    render(this.#pointComponent, this.#pointListContainer.element);
  }

  #replacePointToEditor() {
    replace(this.#editorComponent, this.#pointComponent);
  }

  #replaceEditorToPoint() {
    replace(this.#pointComponent, this.#editorComponent);
  }
}
