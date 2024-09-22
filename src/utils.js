import dayjs from 'dayjs';

const humanizeEventDate = (date, format) => date ? dayjs(date).format(format) : '';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomBoolean(){
  return Math.random() < 0.5;
}

function findOffersByType (offers, type){
  return offers.find((offer) => offer.type === type);
}

function updateItem (items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function sortByPrice (eventB, eventA) {
  return eventA.base_price - eventB.base_price;
}

function sortByTime (eventA, eventB) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
}

function getEventDuration (event) {
  return dayjs(event.date_to).diff(dayjs(event.date_from));
}

export {getRandomArrayElement, getRandomInteger, humanizeEventDate, getRandomBoolean, findOffersByType, updateItem, sortByPrice, sortByTime };
