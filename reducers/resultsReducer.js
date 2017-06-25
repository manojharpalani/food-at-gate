import { LOAD_RESTAURANTS, SELECT_RESTAURANT } from '../actions/ActionType';

const initialState = {
  restaurants: [],
  selectedRestaurant: ''
};

export default function results(state = initialState, action) {
  switch (action.type) {
    case LOAD_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        selectedRestaurant: ''
      };
    case SELECT_RESTAURANT:
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
    default:
      return state;
  }
}
