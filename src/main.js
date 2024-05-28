import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import PointView from './view/event.js';
import FormView from './view/event-form.js';
import { render } from './render.js';

import boardPresenter from './presenter/board-presenter.js';

const siteTripMain = document.querySelector('.trip-main');

const siteFilterElement = document.querySelector('.trip-controls__filters');
//render(new FilterView(), siteFilterElement);

const siteSortElement = document.querySelector('.trip-events');
//render(new SortView(), siteSortElement);

const siteEventFormEdit = document.querySelector('.trip-events');
//render(new FormView(), siteEventFormEdit);

const siteEventEdit = siteSortElement;
// for(let i = 0; i < 3; i++){
//   render(new PointView(), siteEventEdit);
// }

boardPresenter.init();
