import AbstractView from '../framework/view/abstract-view.js';
import { sortType } from '../const.js';

function createSortTemplate () {

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--${sortType.DEFAULT}">
        <input id="${sortType.DEFAULT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType.DEFAULT}">
        <label class="trip-sort__btn" for="${sortType.DEFAULT}">${sortType.DEFAULT}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${sortType.EVENT}">
        <input id="${sortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType.EVENT}" disabled>
        <label class="trip-sort__btn" for="${sortType.EVENT}">${sortType.EVENT}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${sortType.TIME}">
        <input id="${sortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType.TIME}">
        <label class="trip-sort__btn" for="${sortType.TIME}">${sortType.TIME}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${sortType.PRICE}">
        <input id="${sortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType.PRICE}" checked>
        <label class="trip-sort__btn" for="${sortType.PRICE}">${sortType.PRICE}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${sortType.OFFER}">
        <input id="${sortType.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortType.OFFER}" disabled>
        <label class="trip-sort__btn" for="${sortType.OFFER}">${sortType.OFFER}s</label>
      </div>
      </form>
  `);
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandle);
  }

  get template() {

    return createSortTemplate();
  }

  #sortTypeChangeHandle = (evt) => {
    console.log(evt.target.value);
    this.#handleSortTypeChange(evt.target.value);
  };
}
