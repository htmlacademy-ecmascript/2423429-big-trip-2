import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point.',
  [FilterType.FUTURE]: 'There are no future points now.',
  [FilterType.PAST]: 'There are no past points now.',
  [FilterType.PRESENT]: 'There are no present points now.'
};


function createListEmpty (filterType) {
  const noPointsTextValue = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noPointsTextValue}
    </p>`
  );
}

export default class ListEmpty extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template () {
    return createListEmpty(this.#filterType);
  }
}
