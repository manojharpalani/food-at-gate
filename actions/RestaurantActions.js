import firebase from 'firebase';
import { createAction } from 'redux-actions';
import { LOAD_MENU,
  SELECT_MENU_ITEM,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM } from './ActionType';

import { MenuItem } from '../model';

const logger = require('../common/Logger');

export const loadMenu = createAction(LOAD_MENU, menuItems => menuItems);
export const selectMenuItem = createAction(SELECT_MENU_ITEM, menuItem => menuItem);
export const addMenuItem = createAction(ADD_MENU_ITEM, cartItem => cartItem);
export const removeMenuItem = createAction(REMOVE_MENU_ITEM, cartItem => cartItem);

export function loadMenuFromDB(airportId, terminalId, restaurantId) {
  return (dispatch) => {
    const menuPath = `/menu/${airportId}_${terminalId}_${restaurantId}`;
    firebase.database().ref(menuPath).once('value', (snapshot) => {
      const menuItems = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach((menuItemId) => {
        const menuItem = new MenuItem(menuItemId, snapshot.val()[menuItemId]);
          logger.debug(`Reading Menu Item ID ${menuItemId} -  ${menuItem}`);
          menuItems.push(menuItem);
        });
      }
      dispatch(loadMenu(menuItems));
    });
  };
}

export function addMenuItemToCart() {

}

export function removeMenuItemFromCart() {

}