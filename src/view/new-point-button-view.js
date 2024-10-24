import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createNewPointButtonTemplate({disabled}) {
  return (`
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
      ${disabled ? 'disabled' : ''}
    >
      New event
    </button>
  `);
}

export default class NewPointButtonView extends AbstractStatefulView {
  #handleClick = null;

  constructor({onClick, disabled = false}) {
    super();
    this.#handleClick = onClick;
    this._setState(NewPointButtonView.initState(disabled));
    this._restoreHandlers();

  }

  setDisabled = () => {
    this.updateElement({
      disabled: true
    });
  };

  setEnabled = () => {
    this.updateElement({
      disabled: false
    });
  };

  static initState (disabled) {
    return {disabled};
  }

  get template() {
    return createNewPointButtonTemplate(this._state, );
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#clickHandler);

  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
