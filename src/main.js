import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter.js';
import { render } from './framework/render.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offer-model.js';
import CitiesModel from './model/cities-model.js';
import PointsApiService from './points-api-service.js';
import OffersApiService from './view/offers-api-service.js';
import DestinationsApiService from './view/destinations-api-service.js';

const AUTHORIZATION = 'Basic iJ5mgI78cvo4oi5i';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteMainElement = document.querySelector('.trip-events');
const siteMainTripEvent = document.querySelector('.main-button');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const citiesModel = new CitiesModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const boardPresenter = new BoardPresenter({
  container: siteMainElement,
  header: siteMainTripEvent,
  pointModel,
  offersModel,
  citiesModel,
});

render(new FilterView(), siteFilterElement);

Promise.all([citiesModel.init(), offersModel.init()])
  .then(() => pointModel.init())
  .then(() => boardPresenter.init(offersModel.offers, citiesModel.cities)
  );
