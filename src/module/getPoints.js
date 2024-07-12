import { getRandomArrayElement, getRandomInteger, getRandomBoolean } from '../utils.js';
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
    destination: CITY.id, // добавить в event,js
    'is_favorite': getRandomBoolean(), // или true
    type: offer.type, // point.type добавить смену иконки типа маршрута
    pictures: CITY.pictures
  };
};
export {generatePoint};

// позже добавить дополнительные предложения
