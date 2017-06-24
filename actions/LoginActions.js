import { AUTH, AUTH_SUCCESS, AUTH_FAILURE } from './ActionType';
import firebase from "firebase";

export function auth() {
  return {
    type: AUTH
  }
}

export function authSuccess(user, response) {
  return {
    type: AUTH_SUCCESS,
    authResponse: response,
    user
  }
}

export function authFailure(response) {
  return {
    type: AUTH_FAILURE,
    authResponse: response
  }
}

export function demoLogin() {
  return login("demo@foodatgate.com", "demo123");
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(auth());
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      (user) => {
      dispatch(authSuccess(user, 'Login Successful'));
      }).catch((error) => {
          dispatch(authFailure(error.toString()));
      });
    }
}


export function signUp(email, password) {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (user) => {
        dispatch(authSuccess(firebase.User, 'Account Created'));
        }).catch((error) => {
            dispatch(authFailure(error.toString()));
        });
  }
}
