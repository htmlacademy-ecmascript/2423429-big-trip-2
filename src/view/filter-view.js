import AbstractView from '../framework/view/abstract-view.js';


function createFilterItemTemplate(filter, currentFilterType) {
  console.log(filter, currentFilterType);
  const {type} = filter;
  return (
    `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input
            id="filter-${type}"
            class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="${type}"
            ${type === currentFilterType ? 'checked' : ''}
          >
          <label
            class="trip-filters__filter-label"
            for="filter-${type}"
          >
            ${type}
          </label>
        </div>

       <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  `);
}

function createFilterTemplate(filterItems, currentFilterType) {
  console.log(filterItems);
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<section class="main__filter filter container">
      ${filterItemsTemplate}
    </section>`
  );
}


export default class FilterView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
