
import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter.js';
import { render } from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const siteMainElement = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({container: siteMainElement});

boardPresenter.init();
