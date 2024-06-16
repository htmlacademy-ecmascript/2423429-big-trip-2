import { getRandomArrayElement, getRandomInteger } from './utils.js';
const MAX_POINTS = 8;
const FISH_TEXT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

const CITIES = [
  {
    name: 'Amsterdam',
    id: crypto.randomUUID(),
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Kaliningrad',
    id: crypto.randomUUID(),
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Vaduz',
    id: crypto.randomUUID(),
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Rome',
    id: crypto.randomUUID(),
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Jakarta',
    id: crypto.randomUUID(),
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
];
const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 'f4f9ffbd-bb2e-4e5a-8f72-9ae5e8373b9c', //присвоить ID
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: 'c6c21a3c-50bb-4a4d-8924-0323bb0a4afe', //присвоить ID
        title: 'Upgrade to a business class in Train',
        price: 120
      }
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        id: 'f4f9ffbd-bb2e-4e5a-8f72-9ae5e8373b9c', //присвоить ID
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 'dc6b51f7-0961-4aef-aa91-1e13708d5386', //присвоить ID
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: '01960644-7779-4c1a-810c-f493f06d92a2',
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: '34cb2f41-8ecf-4f32-8190-169aa9cef41b',
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
];

export {MAX_POINTS, FISH_TEXT, OFFERS, CITIES};
