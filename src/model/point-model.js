import { generatePoint } from '../mock/get-points.js';
import { MAX_POINTS } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = Array.from ({length: MAX_POINTS}, generatePoint);

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      console.log(points);
      console.log(points.map(this.#adaptToClient));
    });
  }

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
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      'base_price': point.base_price,
      'date_from': point.date_from,
      'date_to': point.date_to,
      destination: point.destination,
      offers: point.offers,
      type: point.type,
      'is_favorite': point.is_favorite,
    };

    return adaptedPoint;
  }
}
