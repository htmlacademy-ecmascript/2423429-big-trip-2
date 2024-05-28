
import { render } from './render.js';

import boardPresenter from './presenter/board-presenter.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const siteSortElement = document.querySelector('.trip-events');
render(new SortView(), siteSortElement);

const siteEventFormEdit = document.querySelector('.trip-events');
render(new FormView(), siteEventFormEdit);

const siteEventEdit = siteSortElement;
for(let i = 0; i < 3; i++){
  render(new PointView(), siteEventEdit);
}

boardPresenter.init();
