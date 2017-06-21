import { createNavigationEnabledStore, NavigationReducer } from '@expo/ex-navigation';
import { combineReducers, createStore } from 'redux';
import {fagRedux} from './fagRedux';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

const store = createStoreWithNavigation(
  /* combineReducers and your normal create store things here! */
  combineReducers(fagRedux, {
    navigation: NavigationReducer,
    // other reducers
  })
);

export default store;
