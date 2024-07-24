import AbstractView from '../framework/view/abstract-view.js';


function createTripEventsList(){
  return `
  <ul class="trip-events__list">
    <li class="trip-events__item">
    </li>
  </ul>`;
}

export default class listView extends AbstractView {
  #tripEventList = createTripEventsList();

  get template(){
    return this.#tripEventList;
  }

}

