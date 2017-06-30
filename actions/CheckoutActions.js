import firebase from 'firebase';
import { createAction } from 'redux-actions';
import { CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE } from './ActionType';

const logger = require('../common/Logger');

export const checkoutSuccess = createAction(CHECKOUT_SUCCESS, orderId => orderId);
export const checkoutFailure = createAction(CHECKOUT_FAILURE, orderId => orderId);

export function checkout(order) {
  return (dispatch) => {
    const userId = firebase.auth().currentUser.uid;
    const userOrderPath = `/order/${userId}`;
    const newOrderRef = firebase.database().ref(userOrderPath).push();
    const userOrderCountPath = `${userOrderPath}/count`;
    const userOrderCount = firebase.database().ref(userOrderCountPath);

    newOrderRef.set(order.toJson()).onComplete((error) => {
      if (error) {
        logger.error('Error while creating order!', error);
      } else {
        userOrderCount.transaction((currentCount) => {
          if (currentCount) {
            return currentCount + 1;
          }
          return 0;
        });
      }
      dispatch(checkoutSuccess(newOrderRef));
    }).catch((error) => {
      logger.error('Error while creating order!', error);
      dispatch(checkoutFailure(newOrderRef));
    });
  };
}
