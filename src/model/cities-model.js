import { CITIES } from '../const.js';

export default class CitiesModel {
  #cities = CITIES;

  get cities () {
    return this.#cities;
  }
}
