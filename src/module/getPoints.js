import { getRandomArrayElement, getRandomInteger } from '../utils.js';
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
    destination: CITY.id,
    'is_favorite': false,
    offers: offer.offers,
    type: offer.type,
    pictures: CITY.pictures
  };
};
export {generatePoint};

