import { generatePoint } from '../mock/getPoints.js';
import { MAX_POINTS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class PointModel extends AbstractView {
  #points = Array.from ({length: MAX_POINTS}, generatePoint);

  get element () {
    return this.#points;
  }
}
