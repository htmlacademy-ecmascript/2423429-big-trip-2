import { generatePoint } from '../mock/get-points.js';
import { MAX_POINTS } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #points = Array.from ({length: MAX_POINTS}, generatePoint);

  get points () {
    return this.#points;
  }

  updatePoint(updateType, update) {
    this.#points = this.points.map((point) => point.id === update.id ? update : point);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }
}
