import { generatePoint } from './getPoints.js';
import { MAX_POINTS } from '../const.js';

export default class PointModel {
  points = Array.from ({length: MAX_POINTS}, generatePoint);

  getPoints(){
    return this.points;
  }
}
