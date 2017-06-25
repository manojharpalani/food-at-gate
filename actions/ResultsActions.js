import firebase from 'firebase';
import { createAction } from 'redux-actions';
import { LOAD_RESTAURANTS, SELECT_RESTAURANT } from './ActionType';
import { Restaurant } from '../model';

const logger = require('../common/Logger');

export const loadRestaurants = createAction(LOAD_RESTAURANTS,
  restaurants => restaurants);

export const selectRestaurant = createAction(SELECT_RESTAURANT,
  restaurantId => restaurantId);

export function loadRestaurantsFromDB(airportId, terminalId) {
  return (dispatch) => {
    const restaurantsPath = `/restaurant/${airportId}_${terminalId}`;
    firebase.database().ref(restaurantsPath).once('value', (snapshot) => {
      const restaurants = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach((restaurantId) => {
          const restaurant = new Restaurant(restaurantId, snapshot.val()[restaurantId]);
          logger.debug(`Reading Restaurant ID ${restaurantId} - ${restaurant}`);
          restaurants.push(restaurant);
        });
      }
      dispatch(loadRestaurants(restaurants));
    });
  };
}
