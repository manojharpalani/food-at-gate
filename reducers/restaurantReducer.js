import { LOAD_MENU,
  SELECT_MENU_ITEM,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM } from '../actions/ActionType';

const initialState = {
  menuItems: [],
  selectedMenuItem: ''
};

export default function results(state = initialState, action) {
  switch (action.type) {
    case LOAD_MENU:
      return {
        ...state,
        menuItems: action.payload,
      };
    case SELECT_MENU_ITEM:
      return {
        ...state,
        selectedMenuItem: action.payload,
      };
    case ADD_MENU_ITEM:
      return {
        ...state
      };
    case REMOVE_MENU_ITEM:
      return {
        ...state
      };
    default:
      return state;
  }
}
