import firebase from 'firebase';
import { createAction } from 'redux-actions';
import { AUTH,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  UPDATE_EMAIL,
  UPDATE_PASSWORD } from './ActionType';

export const auth = createAction(AUTH);
export const authSuccess = createAction(AUTH_SUCCESS, user => user);
export const authFailure = createAction(AUTH_FAILURE, authResponse => authResponse);
export const updateEmail = createAction(UPDATE_EMAIL, email => email);
export const updatePassword = createAction(UPDATE_PASSWORD, password => password);

export function login(email, password) {
  return (dispatch) => {
    dispatch(auth());
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      (user) => {
      dispatch(authSuccess(user));
      }).catch((error) => {
          dispatch(authFailure(error.toString()));
      });
    };
}

export function demoLogin() {
  return (dispatch) => {
    dispatch(login('demo@foodatgate.com', 'demo123'));
  };
}

export function signUp(email, password) {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (user) => {
        dispatch(authSuccess(user));
        }).catch((error) => {
            dispatch(authFailure(error.toString()));
        });
  };
}
