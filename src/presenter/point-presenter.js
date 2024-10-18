import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event.js';
import EventEditView from '../view/event-edit-form.js';
import { UserAction, UpdateType } from '../const.js';
import {isDatesEqual} from '../utils.js';

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

    this.#pointComponent = new EventView({
      point,
      onPointClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,

      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities
    });

    this.#editorComponent = new EventEditView({
      point,
      onCloseClick: this.#handlePointClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      offers: this.#offersModel.offers,
      cities: this.#citiesModel.cities,
      isEditMode : false,
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
      this.#editorComponent.reset(this.#point);
      this.#replaceEditorToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editorComponent);
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
      this.#editorComponent.reset(this.#point);
      this.#replaceEditorToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditor();
  };

  #handlePointClick = (evt) =>{
    evt.preventDefault();
    this.#editorComponent.reset(this.#point);
    this.#replaceEditorToPoint();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.date_from, update.date_from);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceEditorToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, 'is_favorite': !this.#point.is_favorite},
    );
  };
}
