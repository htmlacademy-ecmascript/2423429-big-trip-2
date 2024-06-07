import { getRandomArrayElement, checkOffers } from '../utils.js';
import { MAX_POINTS, DESCRIPTIONS, CITIES } from '../const.js';

const generatePoint = () => {
  const id = crypto.randomUUID();
  return {
    id,
    base_price: 1100,
    date_from: '2019:03-18T10:30',
    date_to: '2019-03-18T11:00',
    destination: getRandomArrayElement(CITIES.name),
    is_favorite: false,
    offers: checkOffers() //сделать функцию на проверку выбранных дополниетльных опций
  };
};

export {generatePoint} from '..//presenter/board-presenter.js';
//crypto.randomUUID() генерируем уникальный ID
