import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM-DD'; //'2019-01-25T00:00:00-02:00Z';
const humanizeEventDate = (date) => date ? dayjs(date).format[EVENT_DATE_FORMAT] : '';
const EVENT_START_TIME_FORMAT = 'HH:mm';
const humanizeStartTime = (startTime) => startTime ? dayjs(startTime).format[EVENT_START_TIME_FORMAT] : '';

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


function checkFavorite() {
  if (getRandomBoolean()){
    return 'event__favorite-btn--active';
  }
  return 'event__favorite-btn';
}


export {getRandomArrayElement, getRandomInteger, checkFavorite, humanizeEventDate, humanizeStartTime};
