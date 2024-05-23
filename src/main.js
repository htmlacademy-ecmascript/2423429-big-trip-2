import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import { render } from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const siteSortElement = document.querySelector('.trip-events');
render(new SortView(), siteSortElement);

