import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortTemplate (currentSortType) {

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--${SortType.DEFAULT}">
        <input
         id="${SortType.DEFAULT}"
         class="trip-sort__input  visually-hidden"
         type="radio"
         name="trip-sort"
         value="${SortType.DEFAULT}"
         checked="${currentSortType === SortType.DEFAULT ? 'checked' : ''}"
        >
        <label
         class="trip-sort__btn"
         for="${SortType.DEFAULT}"
        >
         ${SortType.DEFAULT}
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
        <input
         id="${SortType.EVENT}"
         class="trip-sort__input  visually-hidden"
         type="radio" name="trip-sort"
         value="${SortType.EVENT}"
         disabled
        >
        <label
         class="trip-sort__btn"
         for="${SortType.EVENT}"
        >
         ${SortType.EVENT}
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
        <input
         id="${SortType.TIME}"
         class="trip-sort__input  visually-hidden"
         type="radio"
         name="trip-sort"
         value="${SortType.TIME}"
         ${currentSortType === SortType.TIME ? 'checked' : ''}
        >
        <label
         class="trip-sort__btn"
         for="${SortType.TIME}"
        >
         ${SortType.TIME}
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
        <input
         id="${SortType.PRICE}"
         class="trip-sort__input  visually-hidden"
         type="radio"
         name="trip-sort"
         value="${SortType.PRICE}"
         ${currentSortType === SortType.PRICE ? 'checked' : ''}
        >
        <label
         class="trip-sort__btn"
         for="${SortType.PRICE}"
        >
         ${SortType.PRICE}
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.OFFERS}">
        <input id="${SortType.OFFERS}"
         class="trip-sort__input  visually-hidden"
         type="radio" name="trip-sort"
         value="${SortType.OFFERS}"
         disabled
        >
         <label
         class="trip-sort__btn"
         for="${SortType.OFFERS}"
        >
         ${SortType.OFFERS}
        </label>
      </div>
      </form>
  `);
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleSortTypeChange(evt.target.value);
  };
}
