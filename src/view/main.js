
import BoardPresenter from '../presenter/board-presenter.js';
import FilterView from './filter.js';
import { render } from '../render.js';
import PointModel from '../module/model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const siteMainElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const boardPresenter = new BoardPresenter({
  container: siteMainElement,
  pointModel,
});

boardPresenter.init();
