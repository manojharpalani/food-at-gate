import { combineReducers } from 'redux';
import nav from './navReducer';
import auth from './authReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  nav,
  auth,
  search
});

export default rootReducer
