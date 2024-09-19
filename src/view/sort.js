import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortTemplate () {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--${SortType.DEFAULT}">
        <input id="sort-${SortType.DEFAULT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DEFAULT}">
        <label class="trip-sort__btn" for="sort-${SortType.DEFAULT}">${SortType.DEFAULT}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
        <input id="sort-${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" disabled>
        <label class="trip-sort__btn" for="sort-${SortType.EVENT}">${SortType.EVENT}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
        <input id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}">
        <label class="trip-sort__btn" for="sort-${SortType.TIME}">${SortType.TIME}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
        <input id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" checked>
        <label class="trip-sort__btn" for="sort-${SortType.PRICE}">${SortType.PRICE}</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.OFFER}">
        <input id="sort-${SortType.OFFER}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.OFFER}" disabled>
        <label class="trip-sort__btn" for="sort-${SortType.OFFER}">${SortType.OFFER}s</label>
      </div>
      </form>
  `);
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#handleSortTypeChange);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandle = (evt) => {

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
