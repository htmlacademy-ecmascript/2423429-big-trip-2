import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/event.js';
import EditorView from '../view/event-edit-form.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING : 'EDITING',
};

export default class PointPresenter {

  #point = null;
  #pointListContainer = null;
  #offersModel = null;
  #citiesModel = null;
  #pointComponent = null;
  #editorComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({pointListContainer, offersModel, citiesModel, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
    this.#citiesModel = citiesModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    const prevPointComponent = this.#pointComponent;
    const prevEditorComponent = this.#editorComponent;
    this.#point = point;

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
    if (this.#mode === Mode.EDITING) {
      replace(this.#editorComponent, prevEditorComponent);
    }

    remove(prevPointComponent);
    remove(prevEditorComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditorToPoint();
    }
  }

  #replacePointToEditor() {
    replace(this.#editorComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditorToPoint() {
    replace(this.#pointComponent, this.#editorComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
