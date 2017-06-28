import { combineReducers } from 'redux';
import nav from './navReducer';
import auth from './authReducer';
import search from './searchReducer';
import results from './resultsReducer';
import restaurant from './restaurantReducer';
import cart from './cartReducer';

const rootReducer = combineReducers({
  nav,
  auth,
  search,
  results,
  restaurant,
  cart
});

export default rootReducer;
