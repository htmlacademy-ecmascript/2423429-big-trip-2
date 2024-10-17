import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offer-model.js';
import CitiesModel from './model/cities-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteMainTripEvent = document.querySelector('.main-button');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
const offersModel = new OffersModel();
const citiesModel = new CitiesModel();
const boardPresenter = new BoardPresenter({
  container: siteMainElement,
  pointModel,
  offersModel,
  citiesModel,
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView ({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.disabled = true;
}

render(new FilterView(), siteFilterElement);
render(newPointButtonComponent, siteMainTripEvent);

boardPresenter.init();
