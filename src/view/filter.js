import AbstractView from '../framework/view/abstract-view.js';

import { FilterType } from '../const.js';
function createFilterTemplate() {
  return (
    `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-${FilterType.EVERYTHING}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" checked>
          <label class="trip-filters__filter-label" for="filter-${FilterType.EVERYTHING}">${FilterType.EVERYTHING}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-${FilterType.FUTURE}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}">
          <label class="trip-filters__filter-label" for="filter-${FilterType.FUTURE}">${FilterType.FUTURE}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-${FilterType.PRESENT}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PRESENT}">
          <label class="trip-filters__filter-label" for="filter-${FilterType.PRESENT}">${FilterType.PRESENT}</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-${FilterType.PAST}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}">
          <label class="trip-filters__filter-label" for="filter-${FilterType.PAST}">${FilterType.PAST}</label>
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
