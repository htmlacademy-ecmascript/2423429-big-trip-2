import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';
export default class CitiesModel extends Observable{
  #destinationsApiService = null;
  #destinations = [];

  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
      this._notify(UpdateType.INIT_ERROR);
    }
  }

  get cities () {
    return this.#destinations;
  }

}
