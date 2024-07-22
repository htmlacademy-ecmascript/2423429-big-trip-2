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
        id: 'f4f9ffbd-bb2e-4e5a-8f72-9ae5e8373b9c',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 'f4f9fdbd-bb2e-4s5a-8f72-9ae5e8373b9c',
        title: 'For a pet',
        price: 80
      },
      {
        id: 'f4f9fdbd-bbse-4s5a-wf7q-9ae5e8373b9c',
        title: 'Stop for shopping',
        price: 20
      },
      {
        id: 'f4f234bd-bb2e-4s5a-8f72-9ae5e8373b9c',
        title: 'Luggage transfer services provided by the driver',
        price: 30
      },
      {
        id: 'f4f234bd-bb2e-4s5a-8f72-9ae5e8373b9c',
        title: 'Transportation of a large number of items',
        price: 130
      },

    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'c6c21a3c-50bb-4all-8924-0323bb0a4afe',
        title: 'Upgrade to a business class in Train',
        price: 120
      },
      {
        id: 'c6c21a3c-50bb-4ahh-8924-0323bb0a4afe',
        title: 'Individual multimedia devices',
        price: 30
      },
      {
        id: 'c6c21a3c-50bb-4ahh-8924-0323bb0ayyfe',
        title: 'The ability to hold up to three pieces of luggage',
        price: 60
      },
      {
        id: 'c6c26a3c-60bb-4ahh-8924-0323bb0ayyfe',
        title: 'Travel entertainment poster',
        price: 50
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 'f4f9ffbd-bb2e-4e5a-8f72-9ae5e8373b9c',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 'f4f9ffbd-bb2e-4e5a-8f72-9ae5e8398b9c',
        title: 'Shower on the train',
        price: 40
      },
      {
        id: 'f4f9ff4t-bb2e-4e5a-8f72-9ae5e8398b9c',
        title: 'Information and entertainment systems',
        price: 50
      },
      {
        id: 'f4f9ff4t-bb2e-4e5a-8f72-9ae5e8398b9c',
        title: 'Breakfast',
        price: 20
      },
      {
        id: 'f4f9ff4t-bb2e-4e5a-8f72-9ae5e8398b9c',
        title: 'Lunch',
        price: 25
      },
      {
        id: 'f4f9ff4t-bb2e-4e5a-8f72-9ae5e7778b9c',
        title: 'Dinner',
        price: 25
      },

    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'dc6b51f7-0961-4aef-aa91-1e13708d5386', //присвоить ID
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '01960644-7779-4c1a-810c-f493f06d92a2',
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '34cb2f41-8ecf-4f32-8190-169aa9cef41b',
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: crypto.randomUUID(),
        title: 'Uprgade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'restaurant',
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
