import AbstractView from '../framework/view/abstract-view.js';

function createNoPointTemplate() {
  return (`
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Loading...</p>
    </section>
  `);
}

export default class LoadingView extends AbstractView {
  get template () {
    return createNoPointTemplate();
  }
}
