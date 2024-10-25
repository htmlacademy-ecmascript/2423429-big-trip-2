import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { findOffersByType, replaceFirstSymbol } from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const BLANK_POINT = {
  'base_price': '',
  'date_from': '',
  'date_to': '',
  destination: [],
  'is_favorite': false,
  offers: [],
  type: 'taxi',
};

function createOffersItemTemplate(offersByType, point) {
  return offersByType.offers.map((offer, i) => {
    const isChecked = point.offers.includes(offer.id);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
          id="${offer.id}_${i}"
          type="checkbox"
          data-id="${offer.id}"
          name="event-offer-${offer.title}"
          ${isChecked ? 'checked' : ''}
          >
        <label
          class="event__offer-label"
          for="${offer.id}_${i}">
           <span class="event__offer-title">Add ${offer.title}</span>
           +€&nbsp;
           <span class="event__offer-price">${offer.price}</span>
        </label>
     </div>`
    );
  }).join('');
}


function createTypesItemTemplate(offers, point) {

  return offers.map((offer, i) =>
    `<div class="event__type-item">
      <input id="event-type-${offer.type}-${i}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${offer.type}"
        ${point.type === offer.type ? 'checked' : ''}
      >
      <label class="event__type-label
        event__type-label--${offer.type}"
        for="event-type-${offer.type}-${i}">
        ${replaceFirstSymbol(offer.type)}
      </label>
    </div>`).join('');
}

function createDestinationList(cities) {

  return cities.map((city) => (`<option value="${city.name}"></option>`)).join('');
}

function createEditDestinationPoint(destinationDescription) {
  if (destinationDescription?.length !== 0){
    return `<p class="event__destination-description">${destinationDescription}</p>`;
  }
  return '';
}

function createPictures(destination) {
  if (destination?.pictures.length === 0) {
    return '';
  }

  return destination?.pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)).join('');
}

function createEditFormTemplate(point, offers, cities, isEditMode) {
  const typesItemTemplate = createTypesItemTemplate(offers, point);
  const destinationList = createDestinationList(cities);
  const destination = cities.find((city) => city.id === point.destination);
  const offersByType = findOffersByType(offers, point.type);
  const offersItemTemplate = createOffersItemTemplate(offersByType, point);
  const destinationPoint = createEditDestinationPoint(destination?.description);
  const pictureDestination = createPictures(destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
         <header class="event__header">
            <div class="event__type-wrapper">
              <label
               class="event__type  event__type-btn"
               for="event-type-toggle-1"
               >
                <span class="visually-hidden">
                  Choose event type
                </span>
                <img
                 class="event__type-icon"
                 width="17"
                 height="17"
                 src="img/icons/${point.type}.png"
                 alt="Event type icon"
                >
              </label>
              <input
               class="event__type-toggle  visually-hidden"
               id="event-type-toggle-1"
               type="checkbox"
              >

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${typesItemTemplate}
                </fieldset>
              </div>
             </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${point.type}
              </label>
             <input class="event__input  event__input--destination" id="event-destination-1"
             type="text"
             name="event-destination"
             value="${destination?.name || ''}"
             list="destination-list-1">
              <datalist id="destination-list-1">
               ${destinationList}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
             <label class="visually-hidden" for="event-start-time-1">From</label>
             <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.date_from}">
             —
             <label class="visually-hidden" for="event-end-time-1">To</label>
             <input class="event__input  event__input--time" id="event-end-time-1"
             type="text"
             name="event-end-time"
             value="${point.date_to}">
            </div>

           <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                €
              </label>
             <input class="event__input  event__input--price" id="event-price-1"
             type="text"
             name="event-price"
             value="${point.base_price}">
           </div>

            <button class="event__save-btn  btn  btn--blue"
              type="submit">
              ${point.isSaving ? 'Saving...' : 'Save'}
            </button>

            <button class="event__reset-btn"
              type="reset">
              ${isEditMode ? `${ point.isDeleting ? 'Deleting...' : 'Delete'}` : 'Cancel'}
            </button>

            ${isEditMode ? (`
              <button class="event__rollup-btn"
                type="button">
                <span class="visually-hidden">
                  Open event
                </span>
              </button>
            `) : '' }

          </header>
          <section class="event__details">
           ${offersByType.offers.length !== 0 ? (`
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${offersItemTemplate}
              </div>
            </section>`) : ''}
            ${destination ? (`
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                 ${destinationPoint}
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${pictureDestination}
                  </div>
                </div>
              `) : ''}
            </section>
          </section>
        </form>
     </li>
  `);
}

export default class EventEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;
  #offers = null;
  #cities = null;
  #isEditMode = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = BLANK_POINT, onCloseClick, onFormSubmit, onDeleteClick, offers, cities, isEditMode}) {
    super();
    this._setState(EventEditView.parsePointToState(point));
    this.#handleCloseClick = onCloseClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#isEditMode = isEditMode;

    this.#offers = offers;
    this.#cities = cities;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offers, this.#cities, this.#isEditMode);
  }

  reset(point) {
    this.updateElement(
      EventEditView.parsePointToState(point),
    );
  }

  removeElement() {
    super.removeElement();

    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    if(this.#isEditMode) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCloseClick);
    }

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);


    const eventTypeInputs = this.element.querySelectorAll('.event__type-input');
    eventTypeInputs.forEach((typeInput) => (typeInput.addEventListener('change', this.#typeChangeHandler)));

    const availableOffers = this.element.querySelectorAll('.event__offer-selector');

    if(availableOffers.length > 0) {
      availableOffers.forEach((offer) => (offer.addEventListener('input', this.#checkOffersHandler)));
    }

    this.#setDatepicker();
  }

  #checkOffersHandler = (evt) => {
    evt.preventDefault();

    let newOffers = this._state.offers;
    const checkedID = evt.target.dataset.id;

    if (evt.target.checked) {
      newOffers.push(checkedID);
    } else {
      newOffers = this._state.offers.filter((offerId) => offerId !== checkedID);
    }
    this._setState({
      offers: newOffers,
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({'date_from': userDate});
    this.#datepickerTo.set('minDate', this._state.date_from);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({'date_to': userDate});
    this.#datepickerFrom.set('maxDate', this._state.date_to);
  };

  #setDatepicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.date_from,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.date_to
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.date_to,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.date_from
      }
    );
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToPoint(this._state));
  };

  #isNumeric = (value) => /^\d+$/.test(value);

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    if (this.#isNumeric(evt.target.value)) {
      this._setState({
        'base_price': he.encode(Number(evt.target.value)),
      });
    }
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.value === '') {
      return;
    }
    const newCity = this.#cities.find((city) => city.name === evt.target.value);

    this.updateElement({
      destination: newCity.id,
    });
  };


  static parsePointToState(point) {
    return { ...point,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDeleting;
    delete point.isSaving;

    return point;
  }

}
