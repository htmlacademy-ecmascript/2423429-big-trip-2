import AbstractView from '../framework/view/abstract-view.js';

import { filterType } from '../const.js';
function createFilterTemplate() {
  return (
    `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-${filterType.EVERYTHING}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType.EVERYTHING}" checked>
          <label class="trip-filters__filter-label" for="filter-${filterType.EVERYTHING}">${filterType.EVERYTHING}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-${filterType.FUTURE}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType.FUTURE}">
          <label class="trip-filters__filter-label" for="filter-${filterType.FUTURE}">${filterType.FUTURE}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-${filterType.PRESENT}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType.PRESENT}">
          <label class="trip-filters__filter-label" for="filter-${filterType.PRESENT}">${filterType.PRESENT}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-${filterType.PAST}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType.PAST}">
          <label class="trip-filters__filter-label" for="filter-${filterType.PAST}">${filterType.PAST}</label>
        </div>

       <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  `);
}

export default class FilterView extends AbstractView{
  get template() {
    return createFilterTemplate();
  }
}
