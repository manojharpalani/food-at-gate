import firebase from 'firebase';
import { createAction } from 'redux-actions';
import { LOAD_AIRPORTS, LOAD_TERMINALS, LOAD_GATES,
   SELECT_AIRPORT, SELECT_TERMINAL, SELECT_GATE,
   NO_OP } from '../actions/ActionType';
import { Airport, Terminal, Gate } from '../model';

const logger = require('../common/Logger');
const sortBy = require('sort-by');

export const loadAirports = createAction(LOAD_AIRPORTS, airports => airports);
export const loadTerminals = createAction(LOAD_TERMINALS, terminals => terminals);
export const loadGates = createAction(LOAD_GATES, gates => gates);
export const selectAirport = createAction(SELECT_AIRPORT, airportId => airportId);
export const selectTerminal = createAction(SELECT_TERMINAL, terminalId => terminalId);
export const selectGate = createAction(SELECT_GATE, gateId => gateId);
export const noop = createAction(NO_OP);


export function loadAirportsFromDB() {
  return (dispatch) => {
    const airportPath = '/airport';
    firebase.database().ref(airportPath).once('value', (snapshot) => {
      const airports = [];
      if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach((airportId) => {
              const airport = new Airport(airportId, snapshot.val()[airportId]);
              logger.debug(`Reading Airport ID ${airportId} - ${airport}`);
              airports.push(airport);
          });
      }
      airports.sort(sortBy('_order'));
      dispatch(loadAirports(airports));
    });
  };
}

export function loadTerminalsFromDB(airportId) {
  if (airportId === '') {
    return noop;
  }

  return (dispatch) => {
    dispatch(selectAirport(airportId));
    const terminalsPath = `/terminal/${airportId}`;
    firebase.database().ref(terminalsPath).orderByChild('order').once('value', (snapshot) => {
      const terminals = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach((terminalId) => {
          const terminal = new Terminal(terminalId, snapshot.val()[terminalId]);
          logger.debug(`Reading Terminal ID ${terminalId} - ${terminal}`);
          terminals.push(terminal);
        });
      }
      terminals.sort(sortBy('_order'));
      dispatch(loadTerminals(terminals));
    });
  };
}

export function loadGatesFromDB(airportId, terminalId) {
  if (airportId === '' || terminalId === '') {
    return noop;
  }

  return (dispatch) => {
    dispatch(selectTerminal(terminalId));
    const gatesPath = `/gate/${airportId}_${terminalId}`;
    firebase.database().ref(gatesPath).orderByChild('order').once('value', (snapshot) => {
      const gates = [];
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach((gateId) => {
          const gate = new Gate(gateId, snapshot.val()[gateId]);
          logger.debug(`Reading Gate ID ${gateId} - ${gate}`);
          gates.push(gate);
        });
      }
      gates.sort(sortBy('_order'));
      dispatch(loadGates(gates));
      });
    };
}
