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

const getWeightForNull = (valueA, valueB) => {
  //значение отсутствует
  if (valueA === null && valueB === null) {
    return 0;
  }
  //B первее A
  if (valueA === null) {
    return 1;
  }
  //A первее B
  if (valueB === null) {
    return -1;
  }

  return null;
};

function sortByPrice (eventB, eventA) {
  return eventA.base_price - eventB.base_price;
}

function sortByTime (eventA, eventB) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
}

function sortByDay (eventA, eventB) {
  const startDateEventA = eventA.date_from;
  const startDateEventB = eventB.date_from;
  const sortWeightForEmptyValue = getWeightForNull(startDateEventA, startDateEventB);

  if (sortWeightForEmptyValue !== null) {
    return sortWeightForEmptyValue;
  }

  return dayjs(startDateEventA).diff(startDateEventB);
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function getEventDuration (event) {
  return dayjs(event.date_to).diff(dayjs(event.date_from));
}

function replaceFirstSymbol (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function createDatesDuration (startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const milliseconds = Math.abs(end - start).toString();
  const seconds = parseInt(milliseconds / 1000, 10);
  const minutes = parseInt(seconds / 60, 10);
  const hours = parseInt(minutes / 60, 10);
  const days = parseInt(hours / 24, 10);
  const time = `${days }D ${ hours % 24 }H ${ minutes % 60 }M ${ seconds % 60}S`;
  return time;
}

export {getRandomArrayElement, getRandomInteger, humanizeEventDate, getRandomBoolean, findOffersByType, sortByDay, sortByPrice, sortByTime, replaceFirstSymbol, isDatesEqual, createDatesDuration};
