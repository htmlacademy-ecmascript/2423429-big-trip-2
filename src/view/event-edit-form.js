import AbstractView from '../framework/view/abstract-view.js';
import { findOffersByType } from '../utils.js';


function createOffersItemTemplate (offers, point) {
  return offers.offers.map((offer, i) => {
    const isChecked = point.offers.includes(offer.id);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${offer.type}-${i}"
          type="checkbox"
          name="event-offer-${offer.title}}"
          ${isChecked ? 'checked' : ''}
          >
        <label
        class="event__offer-label"
        for="event-offer-${offer.type}-${i}">
          <span class="event__offer-title">Add ${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
     </div>`
    );
  }).join('');
}


function createTypesItemTemplate (offers) {
  return offers.map((offer, i) =>
    `<div class="event__type-item">
      <input id="event-type-${offer.type}-${i}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${offer.type}"
        {i === 0 ? 'checked' : ''}
      >
      <label class="event__type-label
        event__type-label--${offer.type}"
        for="event-type-${offer.type}-${i}">
        ${offer.type}
      </label>
    </div>`).join('');
}

function createDestinationList (cities) {
  return cities.map((city) =>(`<option value="${city.name}"></opion>`)).join('');
}

function createEditorFormTemplate(point, offers, cities){
  const destinationName = cities.find((city) => city.id === point.destination)?.name;

  return `
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
           ${createTypesItemTemplate(offers)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationList(cities)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.date_from}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${point.date_to}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.base_price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersItemTemplate(findOffersByType(offers, point.type), point)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationName}-Mont-Blanc (usually shortened to ${destinationName}) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
      </section>
      <img
    </section>
  </form>`;
}

export default class EditorView extends AbstractView {
  constructor({point, onEditorClick, offers, cities}){
    super();
    this.point = point;
    this.offers = offers;
    this.cities = cities;
    this.onEditorClick = onEditorClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.onEditorClick);
  }

  get template() {
    return createEditorFormTemplate(this.point, this.offers, this.cities);
  }

}
