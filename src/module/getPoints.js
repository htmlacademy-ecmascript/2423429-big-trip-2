import { getRandomArrayElement, checkOffers, getRandomInteger } from '../utils.js';
import {FISH_TEXT, CITIES } from '../const.js';

const generatePoint = () => {
  const id = crypto.randomUUID();
  return {
    id,
    base_price: 1100,
    date_from: '2019:03-18T10:30',
    date_to: '2019-03-18T11:00',
    destination: getRandomArrayElement(CITIES.name),
    is_favorite: false,
    offers: checkOffers(),
    type: 'flight', //сделать функцию на проверку выбранных дополниетльных опций
    pictures: [{
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
      description: getRandomArrayElement(FISH_TEXT)
    }]
  };
};
export {generatePoint} from './model.js';
//crypto.randomUUID() генерируем уникальный ID
