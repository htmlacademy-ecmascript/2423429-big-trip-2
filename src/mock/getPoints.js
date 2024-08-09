import { getRandomArrayElement, getRandomInteger, checkFavorite} from '../utils.js';
import {CITIES, OFFERS } from '../const.js';

const generatePoint = () => {
  const id = crypto.randomUUID();
  const offer = getRandomArrayElement(OFFERS);
  const CITY = getRandomArrayElement(CITIES);


  return {
    id,
    'base_price': getRandomInteger(1, 1000),
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    destination: CITY.name, // добавить в event,js
    'is_favorite': checkFavorite(), // или true
    type: offer.type,
    pictures: CITY.pictures,
    offers: offer.offers.map((el) => el.id)
  };
};
export {generatePoint};
