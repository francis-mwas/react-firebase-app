export const SelectTravelList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveles in exploration',
    icon: '✈️',
    people: '1',
  },
  {
    id: 2,
    title: 'A couple',
    desc: 'Two traveles in tandem',
    icon: '🥂',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏡',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '⛵',
    people: '5 to 10 People',
  },
];

export const SelectBudgetOption = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Dont worry about cost',
    icon: '💸',
  },
];

export const AI_PROMPT =
  'Generate Travel Plan for Location: {location}, for {totalDays} days for {traveller} with a {budgetType} budget, Give me Hotels options list with HotelName, Hotel Address, Price, hotel image url, geo coordinates, descriptions, and suggest itinerary with placeName, Place, details, Place image Url, Geo Coordinates, ticket pricing, rating, Time to travel each of the location for {totalDays} days with each day plan with time to visit in JSON Format.';