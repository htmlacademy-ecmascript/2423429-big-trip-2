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
    id: '3954f7a5-4d2d-4065-8c3a-36605e32689f',
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Kaliningrad',
    id: '3954f7a5-4d2d-4065-8c3a-36605e326877',
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Vaduz',
    id: 'dc43bec3-c630-48c5-9023-d6c7aa2988f1',
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Rome',
    id: 'a4347946-1f2d-4e78-ae35-e17bc8c5da6f',
    pictures: [{
      description: getRandomArrayElement(FISH_TEXT),
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
    }]
  },
  {
    name: 'Jakarta',
    id: '01fd8f32-5902-40c5-8e51-5768e966766e',
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
        id: 'dc6b51f7-0961-4aef-aaa1-1e13708d5386',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 'dc6b51f7-0961-4aef-aaa1-1e13uu8d0086',
        title: 'Celebrations on the ship',
        price: 200
      },
      {
        id: 'dc6b51f7-0961-4aef-afgh-1e13uu8d0086',
        title: 'Photos during the cruise',
        price: 80
      },
      {
        id: 'dc6b51f7-0961-4aef-afgh-1e13uu8d0086',
        title: 'Internet nd telephone on the ship',
        price: 60
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '01960644-7779-4c1a-810c-f493f06d92a2',
        title: 'Uprgade to a business class',
        price: 100
      },
      {
        id: 'bf62f514-e57a-49fc-851b-86a6ba725765',
        title: 'Car wash',
        price: 50
      },
      {
        id: 'ef559446-7ec4-49f5-a67f-db68719fd1ad',
        title: 'Goodies for the road',
        price: 30
      },
      {
        id: 'c6e96aec-713d-4d4d-a532-79e060cb528a',
        title: 'trailer',
        price: 120
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '34cb2f41-8ecf-4f32-8190-169aa9cef41b',
        title: 'Uprgade to a business class',
        price: 120
      },
      {
        id: 'e90654c5-0334-4540-acfb-c37944970630',
        title: 'Special meals',
        price: 40
      },
      {
        id: '1c6390e3-c292-4a06-b41a-f94cdab1d7de',
        title: 'flight of a passenger with disabilities',
        price: 60
      },
      {
        id: 'eb6b471e-b8cf-474e-ace7-9976d0f21adc',
        title: 'Flight with pets',
        price: 80
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'f4611e74-145d-40f2-b6ec-a597ca0577f4',
        title: 'Upgrade the room class',
        price: 120
      },
      {
        id: '8496f818-5313-4ee7-8a69-e20d99a46ecb',
        title: 'Dry cleaning',
        price: 40
      },
      {
        id: '48bf277e-c9b9-43e2-a8c9-69d1337befbc',
        title: 'Late check-out',
        price: 40
      },
      {
        id: '0e1ade24-b397-49dc-ac23-1b04da949dec',
        title: 'Access to the spa and gym',
        price: 100
      },

    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '9b8082e7-4f0e-4c25-8249-27ce99a12d65',
        title: 'Museum guide',
        price: 80
      },
      {
        id: '9b8082e7-4f0e-4c25-8249-27ce99a13u65',
        title: 'Sightseeing guide',
        price: 80
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '3954f7a5-4d2d-4065-8c3a-36605782689f',
        title: 'Music service',
        price: 30
      },
      {
        id: '3954f7a5-4d2d-4065-8c3a-36605e326800',
        title: 'Pre-booking of tables',
        price: 20
      },
      {
        id: '3954f7a5-4d2d-4065-8c3a-36605e22689f',
        title: 'Fire show and fireworks',
        price: 50
      },
      {
        id: '3954f7a5-4d2d-4065-877a-36605e32689f',
        title: 'Calling a taxi to the restaurant',
        price: 10
      },
    ]
  },
];

export {MAX_POINTS, FISH_TEXT, OFFERS, CITIES};
