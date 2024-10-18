import { remove, render, RenderPosition } from '../framework/render.js';
import EventEditView from '../view/event-edit-form.js';
import { UpdateType, UserAction } from '../const.js';

// const BLANK_POINT = {
//   id: crypto.randomUUID(),
//   'base_price': 0,
//   'date_from': '',
//   'date_to': '',
//   destination: '',
//   'is_favorite': false,
//   type: '',
//   offers: [],

// };

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #offers = null;
  #cities = null;

  constructor({pointListContainer, onDataChange, onDestroy, offers, cities}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;

    this.#offers = offers;
    this.#cities = cities;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#pointEditComponent = new EventEditView ({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      offers: this.#offers,
      cities: this.#cities,
      isEditMode: true,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.addEventListener('click', this.#closeClickHandler);
  }

  #closeClickHandler = () => {
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: crypto.randomUUID(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }

  };
}
