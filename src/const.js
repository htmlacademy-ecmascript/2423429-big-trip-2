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
    id: crypto.randomUUID()
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
    type: 'Ship'
  },
  {
    type: 'Drive'
  },
  {
    type: 'Flight'
  },
  {
    type: 'Check-in'
  },
  {
    type: 'Sightseeing'
  },
  {
    type: 'Restaurant'
  },
];

export {MAX_POINTS, FISH_TEXT, OFFERS, CITIES};
