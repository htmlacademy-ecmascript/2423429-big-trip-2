//import { generatePoint } from '../mock/get-points.js';
import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points () {
    return this.#points;
  }

  async init() {
    try {
      this.#points = await this.#pointsApiService.points;
      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#points = [];
      this._notify(UpdateType.INIT_ERROR);
    }
  }

  async updatePoint(updateType, update) {

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      this.#points = this.points.map((point) => point.id === update.id ? response : point);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      this.#points = [response, ... this.#points];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\t add point');
    }
  }

  async deletePoint(updateType, update) {
    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\t delete task');
    }
  }
}
