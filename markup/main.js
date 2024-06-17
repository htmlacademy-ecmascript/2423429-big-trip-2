
import BoardPresenter from '../src/presenter/board-presenter.js';
import FilterView from '../src/view/filter.js';
import { render } from '../src/render.js';
import PointModel from '../src/module/model.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const siteMainElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const boardPresenter = new BoardPresenter({
  container: siteMainElement,
  pointModel,
});

boardPresenter.init();
