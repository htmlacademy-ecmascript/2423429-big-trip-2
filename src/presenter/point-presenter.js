import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/event.js';
import EditorView from '../view/event-edit-form.js';

export default class PointPresenter {
  #pointListContainer = null;
  #offersModel = null;
  #citiesModel = null;
  #pointComponent = null;
  #editorComponent = null;
  #handleDataChange = null;

  constructor({pointListContainer, offersModel, citiesModel, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
    this.#citiesModel = citiesModel;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    const prevPointComponent = this.#pointComponent;
    const prevEditorComponent = this.#editorComponent;

    this.#pointComponent = new PointView({
      point,
      onPointClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities
    });

    this.#editorComponent = new EditorView({
      point,
      onEditorClick: this.#handlePointClick,
      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities
    });

    if (prevPointComponent === null || prevEditorComponent === null) {
      render(this.#pointComponent, this.#pointListContainer.element);
      return;
    }

    if (this.#pointListContainer.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#pointListContainer.element.contains(prevEditorComponent.element)) {
      replace(this.#editorComponent, prevEditorComponent);
    }

    remove(prevPointComponent);
    remove(prevEditorComponent);
  }

  #replacePointToEditor() {
    replace(this.#editorComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditorToPoint() {
    replace(this.#pointComponent, this.#editorComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditorToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditor();
  };

  #handlePointClick = (point) =>{
    this.#handleDataChange(point);
    this.#replaceEditorToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.point, isFavorite: !this.point.isFavorite});
  };
}
