/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

function parseCost(costString) {
  return Number.parseFloat(costString.replace('$','').replace(',',''));
}

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  if(filters.duration){
    output = output.filter(trip => trip.days >= filters.duration.from && trip.days <= filters.duration.to);
  }

  if(filters.tags.length > 0){
    output = output.filter(trip => {
      for(const tag of filters.tags) {
        if (!trip.tags.includes(tag)) {
          return false;
        }
      }
      
      return true;
    });
  }

  output = [...output].sort((tripA, tripB) => {
    const costA = parseCost(tripA.cost);
    const costB = parseCost(tripB.cost);

    return costB-costA;
  });

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips;

  // TODO - filter trips by tripId

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips;

  // TODO - filter trips by countryCode

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
