import AbstractView from '../framework/view/abstract-view.js';

function createLoadingTemplate(message) {
  return (`<p class="trip-events__msg">${message}</p>`);
}

export default class MessageView extends AbstractView {
  #message = null;

  constructor({message}) {
    super();
    this.#message = message;
  }

  get template () {
    return createLoadingTemplate(this.#message);
  }

}
