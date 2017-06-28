import { LOAD_CART_INFO,
  LOAD_CART_ITEMS,
  ADD_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_SUCCESS,
  } from '../actions/ActionType';

const initialState = {
  info: {},
  items: []
};

export default function cart(state = initialState, action) {
  let list;
  let index;
  switch (action.type) {
    case LOAD_CART_INFO:
      console.log('Load cart info event' + JSON.stringify(action));
      return {
        ...state,
        info: action.payload
      };
    case LOAD_CART_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_CART_ITEM_SUCCESS:
      list = state.cart.cartItems.concat([action.payload]);
      return {
        ...state,
        items: list
      };
    case REMOVE_CART_ITEM_SUCCESS:
      list = state.cart.cartItems.slice(0);
      index = list.map(cartItem => cartItem.getId()).indexOf(action.payload);
      list.splice(index, 1);
      return {
        ...state,
        items: list
      };
    default:
      return state;
  }
}
