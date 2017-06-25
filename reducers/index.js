import { combineReducers } from 'redux';
import nav from './navReducer';
import auth from './authReducer';
import search from './searchReducer';
import results from './resultsReducer';

const rootReducer = combineReducers({
  nav,
  auth,
  search,
  results
});

export default rootReducer
