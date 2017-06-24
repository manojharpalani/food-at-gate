import { combineReducers } from 'redux'
import nav from './navReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  nav,
  auth
});

export default rootReducer
