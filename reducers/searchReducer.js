import { LOAD_AIRPORTS, LOAD_TERMINALS, LOAD_GATES,
   SELECT_AIRPORT, SELECT_TERMINAL, SELECT_GATE } from '../actions/ActionType';

const initialState = {
  airports: [],
  terminals: [],
  gates: [],
  selectedAirport: '',
  selectedTerminal: '',
  selectedGate: ''
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case LOAD_AIRPORTS:
      return {
        ...state,
        airports: action.payload,
        terminals: [],
        gates: [],
        selectedAirport: '',
        selectedTerminal: '',
        selectedGate: ''
      };
    case LOAD_TERMINALS:
      return {
        ...state,
        terminals: action.payload,
        gates: [],
        selectedTerminal: '',
        selectedGate: ''
      };
    case LOAD_GATES:
      return {
        ...state,
        gates: action.payload,
        selectedGate: ''
      };
    case SELECT_AIRPORT:
      return {
        ...state,
        selectedAirport: action.payload,
        selectedTerminal: '',
        selectedGate: ''
      };
    case SELECT_TERMINAL:
      return {
        ...state,
        selectedTerminal: action.payload,
        selectedGate: ''
      };
    case SELECT_GATE:
      return {
        ...state,
        selectedGate: action.payload
      };
    default:
      return state;
  }
}
