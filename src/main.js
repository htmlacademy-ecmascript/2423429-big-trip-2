import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter.js';
import { render } from './framework/render.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offer-model.js';
const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const siteMainElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const offersModel = new OffersModel();
const boardPresenter = new BoardPresenter({
  container: siteMainElement,
  pointModel,
  offersModel
});

boardPresenter.init();
