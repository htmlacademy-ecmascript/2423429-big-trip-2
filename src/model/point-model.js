//import { generatePoint } from '../mock/get-points.js';
import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    // this.#pointsApiService.points.then((points) => {
    //   console.log(points);
    //   console.log(points.map(this.#adaptToClient));
    // });
  }

  get points () {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = this.points.map((point) => point.id === update.id ? updatedPoint : point);
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ... this.#points];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\t add point');
    }
  }

  async deletePoint(updateType, update) {
    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = this.#points.filter((point) => point.id !== update.id);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\t delete task');
    }

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
