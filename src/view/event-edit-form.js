import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { findOffersByType, replaceFirstSymbol } from '../utils.js';


function createOffersItemTemplate (offers, point) {
  return offers.offers.map((offer, i) => {
    const isChecked = point.offers.includes(offer.id);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${offer.type}-${i}"
          type="checkbox"
          name="event-offer-${offer.title}"
          ${isChecked ? 'checked' : ''}
          >
        <label
        class="event__offer-label"
        for="event-offer-(${offer.type})}-${i}">
          <span class="event__offer-title">Add ${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
     </div>`
    );
  }).join('');
}


function createTypesItemTemplate (offers, point) {

  return offers.map((offer, i) =>
    `<div class="event__type-item">
      <input id="event-type-${offer.type}-${i}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${offer.type}"
        ${ point.type === offer.type ? 'checked' : ''}
      >
      <label class="event__type-label
        event__type-label--${offer.type}"
        for="event-type-${offer.type}-${i}">
        ${replaceFirstSymbol(offer.type)}
      </label>
    </div>`).join('');
}

function createDestinationList (cities) {
  return cities.map((city) =>(`<option value="${city.name}"></option>`)).join('');
}

function createEditDestinationPoint(destinationDescription) {
  return `<p class="event__destination-description">${destinationDescription}</p>`;
}

function createPictures(destination) {
  return destination.pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)).join('');
}

function createEditFormTemplate(point, offers, cities){
  // const destinationName = cities.find((city) => city.id === point.destination)?.name;
  // const destinationDescription = cities.find((city) => city.id === point.destination)?.description;
  const destination = cities.find((city) => city.id === point.destination);

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
                  ${createTypesItemTemplate(offers, point)}
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
               ${createDestinationList(cities)}
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

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">
           ${findOffersByType.length !== 0 ? `<section class="event__section  event__section--offers">
             <h3 class="event__section-title  event__section-title--offers">Offers</h3>
             <div class="event__available-offers">
             ${createOffersItemTemplate(findOffersByType(offers, point.type), point)}
             </div>
            </section>` : ''}

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              ${createEditDestinationPoint(destination?.description || '')}

              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${createPictures(destination)}
                </div>
              </div>
            </section>
          </section>
        </form>
     </li>
  `);
}

export default class EventEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #offers = null;
  #cities = null;

  constructor({point, onCloseClick, onFormSubmit, offers, cities}){
    super();
    this._setState(EventEditView.parsePointToState(point));
    this.#handleCloseClick = onCloseClick;
    this.#handleFormSubmit = onFormSubmit;

    this.#offers = offers;
    this.#cities = cities;

    this._restoreHandlers();
  }

  get template() {
    console.log('state', this._state);
    return createEditFormTemplate(this._state, this.#offers, this.#cities);
  }

  reset(point) {
    this.updateElement(
      EventEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleCloseClick);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandle);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    const eventTypeInputs = this.element.querySelectorAll('.event__type-input');
    eventTypeInputs.forEach((typeInput) => (typeInput.addEventListener('change', this.#typeChangeHandler)));
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #formDeleteClickHandle = (evt) => {
    evt.preventDefault();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToPoint(this._state));
  };

  #isNumeric = (value) => /^\d+$/.test(value);

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    if (this.#isNumeric(evt.target.value)){
      this._setState({
        'base_price': evt.target.value,
      });
    }
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value);

    if(evt.target.value === ''){
      return;
    }

    this._setState({
      value: evt.target.value,
    });

  };


  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};


  }
}
