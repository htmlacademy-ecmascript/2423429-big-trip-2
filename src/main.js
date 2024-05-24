import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import PointView from './view/event.js';
import { render } from './render.js';

const siteFilterElement = document.querySelector('.trip-controls__filters');
render(new FilterView(), siteFilterElement);

const siteSortElement = document.querySelector('.trip-events');
render(new SortView(), siteSortElement);

const siteEventEdit = siteSortElement;
for(let i=0; i < 3; i++){
    render(new PointView(), siteEventEdit);
};

// const sitePointElement = document.querySelector('.trip-events__list');
// render(new PointView(), sitePointElement);