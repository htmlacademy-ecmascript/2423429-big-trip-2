import AbstractView from '../framework/view/abstract-view.js';
import { createElement } from '../render.js';

function createEditor(point, offers){
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
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
        ${createOffersItemTemplate(filterOffers(offers, point.type))}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${point.destination}-Mont-Blanc (usually shortened to ${point.destination}) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
      </section>
      <img
    </section>
  </form>`;
}

//получение списка типов точек маршрута
function createTypesItemTemplate (typeTransport) {
  return typeTransport.map((offer, i) =>
    `<div class="event__type-item">
          <input id="event-type-${offer.type}-${i}" class="event__type-input  visually-hidden"
          type="radio" name="event-type" value="${offer.type}"
          ${i === 0 ? 'checked' : ''}
          >
        <label class="event__type-label  event__type-label--${offer.type}"
        for="event-type-${offer.type}-${i}">${offer.type}</label>
    </div>`).join('');
}

//фильтрация офферов по типу
function filterOffers (offers, type){
  const filtredOffer = offers.find((offer) => offer.type === type);
  return filtredOffer;
}

function createOffersItemTemplate (typeTransport) {
  return typeTransport.offers.map((offer, i) =>
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"
           id="event-offer-${typeTransport.type}-${i}"
           type="checkbox" name="event-offer-${offer.title}}"
            ${i === 0 ? 'checked' : ''}
           >
          <label class="event__offer-label" for="event-offer-${typeTransport.type}-${i}">
            <span class="event__offer-title">Add ${offer.title}</span>
            +€&nbsp;
           <span class="event__offer-price">${offer.price}</span>
          </label>
      </div>`).join('');

}
export default class EditorView extends AbstractView {
  #element = null;
  constructor({point, onEditorClick, offers}){
    super();
    this.point = point;
    this.offers = offers;
    this.onEditorClick = onEditorClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.onEditorClick);
  }

  get template() {
    return createEditor(this.point, this.offers);
  }

  get element () {
    if (!this.#element){
      this.#element = createElement(this.template);
    }
    return this.#element;
  }
}
