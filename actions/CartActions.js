import firebase from 'firebase';
import { createAction } from 'redux-actions';
import { LOAD_CART_INFO,
  SAVE_CART_INFO,
  LOAD_CART_ITEMS,
  ADD_CART_ITEM,
  ADD_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM,
  REMOVE_ALL_CART_ITEMS,
  REMOVE_CART_ITEM_SUCCESS } from './ActionType';
import { CartInfo, CartItem } from '../model';

const logger = require('../common/Logger');

export const loadCartInfo = createAction(LOAD_CART_INFO, cartInfo => cartInfo);
export const loadCartItems = createAction(LOAD_CART_ITEMS, cartItems => cartItems);
export const addItemSuccess = createAction(ADD_CART_ITEM_SUCCESS, cartItem => cartItem);
export const removeItemSuccess = createAction(REMOVE_CART_ITEM_SUCCESS, cartItem => cartItem);

export function addItem(cartItem) {
  const userId = firebase.auth().currentUser.uid;
  const userCartItemsPath = `/cart/${userId}/items`;
  const userCartInfoCountPath = `/cart/${userId}/info/count`;
  // Create new entry for cartItem in DB
  const newCartItemRef = firebase.database().ref(userCartItemsPath).push();
  const userCartInfoCountRef = firebase.database().ref(userCartInfoCountPath);
  // Save cartItem to database and increment count in cart info
  newCartItemRef.set(cartItem.toJson(), (error) => {
      if (error) {
        logger.error('Add item to user cart failed abnormally!', error);
      } else {
        logger.debug('Successfully added item to users cart!');
        userCartInfoCountRef.transaction((currentCount) => {
          if (currentCount) {
            return currentCount + 1;
          }
            return 1;
        });
      }
    });
    return { type: ADD_CART_ITEM };
}

export function removeItem(cartItemId) {
  const userId = firebase.auth().currentUser.uid;
  const userCartItemPath = `/cart/${userId}/items/${cartItemId}`;
  const userCartInfoCountPath = `/cart/${userId}/info/count`;
  // Create new entry for cartItem in DB
  const userCartItemRef = firebase.database().ref(userCartItemPath);
  const userCartInfoCountRef = firebase.database().ref(userCartInfoCountPath);
  // Save cartItem to database and decrement count in cart info
  userCartItemRef.remove((error) => {
      if (error) {
        logger.error('Remove item from user cart failed abnormally!', error);
      } else {
        logger.debug('Successfully removed item to users cart!');
        userCartInfoCountRef.transaction((currentCount) => {
          if (currentCount) {
            return currentCount - 1;
          }
          return 0;
        });
      }
    });
    return { type: REMOVE_CART_ITEM };
}

export function saveCartInfo(cartInfo) {
  const userId = firebase.auth().currentUser.uid;
  const userCartInfoPath = `/cart/${userId}/info`;
  firebase.database().ref(userCartInfoPath).set(cartInfo.toJson());
  return { type: SAVE_CART_INFO };
}

export function removeAllCartItems() {
  const userId = firebase.auth().currentUser.uid;
  const userCartItemsPath = `/cart/${userId}/items`;
  firebase.database().ref(userCartItemsPath).remove();
  return { type: REMOVE_ALL_CART_ITEMS };
}

export function synchronizeCartInfo() {
  const userId = firebase.auth().currentUser.uid;
  const userCartInfoPath = `/cart/${userId}/info`;
  return (dispatch) => {
    firebase.database().ref(userCartInfoPath).on('value', (snapshot) => {
        let userCartInfo = '';
        if (snapshot.val()) {
            logger.debug(`Loading cart info from DB - ${JSON.stringify(snapshot.val())}`);
            userCartInfo = CartInfo.fromJson(snapshot.val());
        }
        dispatch(loadCartInfo(userCartInfo));
    });
  }
}

export function synchronizeCartItems() {
  return (dispatch) => {
    const userId = firebase.auth().currentUser.uid;
    const userCartItemsPath = `/cart/${userId}/items`;
    firebase.database().ref(userCartItemsPath).on('child_added', (snapshot) => {
      let cartItem = '';
      if (snapshot.val()) {
          cartItem = CartItem.fromJson(snapshot.key, snapshot.val());
      }
      dispatch(addItemSuccess(cartItem));
    });

    firebase.database().ref(userCartItemsPath).on('child_removed', (snapshot) => {
      let cartItem = '';
      if (snapshot.val()) {
          cartItem = CartItem.fromJson(snapshot.key, snapshot.val());
      }
      dispatch(removeItemSuccess(cartItem));
    });
  };
}
