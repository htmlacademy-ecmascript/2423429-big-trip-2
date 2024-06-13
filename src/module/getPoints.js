import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import {FISH_TEXT, CITIES, OFFERS } from '../const.js';

const generatePoint = () => {
  const id = crypto.randomUUID();
  const offer = getRandomArrayElement(OFFERS);
  const CITY = getRandomArrayElement(CITIES);

  return {
    id,
    base_price: getRandomInteger(1, 1000),
    date_from: '2019:03-18T10:30',
    date_to: '2019-03-18T11:00',
    destination: CITY.id,
    is_favorite: false,
    offers: offer.offers,
    type: offer.type,
    pictures: CITY.pictures
  };
};
export {generatePoint};

