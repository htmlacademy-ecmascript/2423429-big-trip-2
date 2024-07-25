import { getRandomArrayElement, getRandomInteger, checkFavorite } from '../utils.js';
import {CITIES, OFFERS } from '../const.js';

const generatePoint = () => {
  const id = crypto.randomUUID();
  const offer = getRandomArrayElement(OFFERS);
  const CITY = getRandomArrayElement(CITIES);


  return {
    id,
    'base_price': getRandomInteger(1, 1000),
    'date_from': 'date from',
    'date_to': 'date to',
    destination: CITY.name, // добавить в event,js
    'is_favorite': checkFavorite(), // или true
    type: offer.type,
    pictures: CITY.pictures,
    offers: offer.offers.map((el) => el.id)
  };
};
export {generatePoint};
