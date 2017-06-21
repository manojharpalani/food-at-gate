import React, { Component } from 'react';
import {
  Alert,
} from 'react-native';
import Database from "../firebase/database";
import { CustomFooterTab } from "./CustomFooterTab";
import { Container, Content, H1, H2, H3, Text, Button, Icon, Picker } from "native-base";
import { styles} from '../css/Styles';

const Environment = require('../common/Environment');
const logger = require('../common/Logger');

export default class SearchActivity extends Component {

  constructor(props){
    super(props);
    this.state = {
      airports: "",
      terminals: "",
      gates: "",
      airport: "",
      terminal: "",
      gate: ""
    };
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.loadAirports();
  }

  next() {
    if (this.state.airport && this.state.terminal && this.state.gate) {
      this.props.navigator.push({
        name: Environment.Routes.Results
      });
    } else {
      this.alert('Pick an airport, terminal and gate')
    }
  }

  alert(message) {
    Alert.alert(
      'Search Restaurants',
      message,
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    )
  }

  loadAirports() {
    logger.debug("Loading supported airports from database");
    Database.getAirports((supportedAirports) => {
        this.setState({
          airports: supportedAirports
        });
        logger.debug("Successfully loaded airports from database. Count: " +
         supportedAirports.length);
        if (supportedAirports.length == 0) {
          this.alert('Sorry no airports supported currently.');
        }
      });
  }

  onSelectAirport(airportId) {
    logger.debug("Loading supported terminals from database at airport : "
      + airportId);
    this.setState({
      airport: airportId
    });
    Database.getTerminals(airportId, (supportedTerminals) => {
      this.setState({
        terminals: supportedTerminals,
        gates: "",
        terminal: "",
        gate: ""
      });
      logger.debug("Successfully loaded terminals from database. Count: " +
      supportedTerminals.length);
      if (supportedTerminals.length == 0 && this.state.airports.length > 0) {
        this.alert('Sorry no terminals supported at this airport');
      }
    });
  }

  onSelectTerminal(terminalId) {
    let airportId = this.state.airport;
    logger.debug("Loading supported gates from database at terminal : "
      + terminalId);
    this.setState({
      terminal: terminalId
    });
    Database.getGates(airportId, terminalId, (supportedGates) => {
      this.setState({
        gates: supportedGates,
        gate: ""
      });
      logger.debug("Successfully loaded gates from database. Count: " +
      supportedGates.length);
      if (supportedGates.length == 0 && this.state.terminals.length > 0) {
        this.alert('Sorry no gates supported at this airport and terminal');
      }
    });
  }

  onSelectGate(gateId) {
    logger.debug("Selecting gate - " + gateId);
    this.setState({gate: gateId});
  }

  createAirportPickerItems() {
    var airportPickerItems = [];
    var airports = this.state.airports;
    if (airports.length == 0) {
      return <Picker.Item value='' label='No Airports Supported' />;
    }
    for (var i =0; i < airports.length; i++) {
      var airport = airports[i];
      airportPickerItems.push(<Picker.Item key = {i} value={airport.getId()} label={airport.getLabel()} />);
    }
    return airportPickerItems;
  }

  createTerminalPickerItems() {
    var terminalPickerItems = [];
    var terminals = this.state.terminals;
    if (terminals.length == 0) {
      return <Picker.Item value='' label='No Terminals Supported' />;
    }
    for (var i =0; i < terminals.length; i++) {
      var terminal = terminals[i];
      terminalPickerItems.push(<Picker.Item key = {i} value={terminal.getId()} label={terminal.getLabel()} />);
    }
    return terminalPickerItems;
  }

  createGatePickerItems() {
    var gatePickerItems = [];
    var gates = this.state.gates;
    if (gates.length == 0) {
      return <Picker.Item value='' label='No Gates Supported' />;
    }
    for (var i =0; i < gates.length; i++) {
      var gate = gates[i];
      gatePickerItems.push(<Picker.Item key = {i} value={gate.getId()} label={gate.getLabel()} />);
    }
    return gatePickerItems;
  }

  render() {
    logger.debug("Rendering SearchActivity component");
    return (
      <Container>
      <Content>

        <H1>
          Search Restaurants
        </H1>

        <H2>
          Select airport , terminal and gate.
        </H2>

        <H3>
          Airport:
        </H3>
        <Picker
          supportedOrientations={['portrait','landscape']}
          iosHeader="Select One"
          mode="dropdown"
          prompt="Select Airport"
          selectedValue={this.state.airport || this.state.airports}
          onValueChange={(itemValue) => {
            this.onSelectAirport(itemValue);
          }}>
          {this.createAirportPickerItems()}
        </Picker>

        <H3>
          Terminal:
        </H3>
        <Picker
          supportedOrientations={['portrait','landscape']}
          iosHeader="Select One"
          mode="dropdown"
          prompt="Select Terminal"
          selectedValue={this.state.terminal || this.state.terminals}
          onValueChange={(itemValue) => {
            this.onSelectTerminal(itemValue);
          }}>
          {this.createTerminalPickerItems()}
        </Picker>

        <H3>
          Airport:
        </H3>
        <Picker
          supportedOrientations={['portrait','landscape']}
          iosHeader="Select One"
          mode="dropdown"
          prompt="Select Gate"
          selectedValue={this.state.gate || this.state.gates}
          onValueChange={(itemValue) => {
            this.onSelectGate(itemValue);
          }}>
          {this.createGatePickerItems()}
        </Picker>

          <Button onPress={this.next}>
              <Text> Next </Text>
          </Button>
        </Content>
        <CustomFooterTab tab={Environment.Routes.Search} navigator={this.props.navigator}/>
        </Container>
    );
  }
}
