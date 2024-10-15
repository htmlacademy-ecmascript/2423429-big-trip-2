import { generatePoint } from '../mock/get-points.js';
import { MAX_POINTS } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #points = Array.from ({length: MAX_POINTS}, generatePoint);

  get points () {
    return this.#points;
  }

  updatePoint(UpdateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(UpdateType, update);
  }

  addPoint(UpdateType, update) {
    this.#points = [
      update,
      this.#points,
    ];

    this._notify(UpdateType, update);
  }

  deletePoint(UpdateType, update) {
    const index = this.#points.findIndex((point)=> point.id === update.id);

    if (index === -1) {
      throw new Error('Can\t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(UpdateType);
  }
}
