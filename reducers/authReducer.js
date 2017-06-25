import { AUTH,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  UPDATE_EMAIL,
  UPDATE_PASSWORD } from '../actions/ActionType';

const initialAuthState = {
                           isAuthenticating: false,
                           email: '',
                           password: '',
                           user: null,
                           authResponse: null
                         };

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case AUTH:
      return { ...state,
               isAuthenticating: true,
               authResponse: '' };
    case AUTH_SUCCESS:
      return {
              ...state,
              isAuthenticating: false,
              user: action.payload,
              authResponse: 'Login Successful' };
    case AUTH_FAILURE:
      return {
              ...state,
              isAuthenticating: false,
              authResponse: action.payload };
    case UPDATE_EMAIL:
      return { ...state,
               email: action.payload };
    case UPDATE_PASSWORD:
     return { ...state,
              password: action.payload };
    default:
      return state;
  }
}
