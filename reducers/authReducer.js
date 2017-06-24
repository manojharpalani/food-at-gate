import { AUTH, AUTH_SUCCESS, AUTH_FAILURE } from '../actions/ActionType';

const initialAuthState = { isAuthenticating: false,
                           user: null,
                           authResponse: null
                         };

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case AUTH:
      return { ...state,
               isAuthenticating: true };
    case AUTH_SUCCESS:
      return {
              ...state,
              isAuthenticating: false,
              authResponse: action.authResponse,
              user: action.user };
    case AUTH_FAILURE:
      return {
              ...state,
              isAuthenticating: false,
              authResponse: action.authResponse,
              user: null };
    default:
      return state;
  }
}
