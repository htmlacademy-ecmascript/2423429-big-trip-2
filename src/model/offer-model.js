import { OFFERS, UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable{
  #offersApiService = null;
  #offers = [];

  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;

    this.#offersApiService.offers.then((offers) => {
      console.log('offersApiService', offers);
    });
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#offers = [];
      this._notify(UpdateType.INIT_ERROR);
    }
  }

  get offers () {
    return this.#offers;
  }
}
