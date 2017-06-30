import React, { Component } from 'react';
import {
  Text, Button
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Picker } from 'native-base';
import { selectGate, loadAirportsFromDB,
  loadTerminalsFromDB, loadGatesFromDB, saveCartInfo, removeAllCartItems } from '../actions';
import { CartInfo } from '../model/CartInfo';

class SearchScreen extends Component {

  static navigationOptions = {
    title: 'Select Pickup Location'
  }

  getAirportPickerItems() {
    const airportPickerItems = [];
    const { airports } = this.props;
    if (airports.length === 0) {
      airportPickerItems.push(<Picker.Item key='-1' value='' label='No Airports Supported' />);
      return airportPickerItems;
    }

    airportPickerItems.push(
      <Picker.Item value='' label='Select Airport' key='-1' />);

    for (let i = 0; i < airports.length; i++) {
      const airport = airports[i];
      airportPickerItems.push(
        <Picker.Item key={i} value={airport.getId()} label={airport.getLabel()} />);
    }
    return airportPickerItems;
  }

  getTerminalPickerItems() {
    const terminalPickerItems = [];
    const { terminals } = this.props;

    if (terminals.length === 0 && this.props.selectedAirport !== '') {
      terminalPickerItems.push(<Picker.Item key='-1' value='' label='No Terminals Supported' />);
      return terminalPickerItems;
    }

    terminalPickerItems.push(
      <Picker.Item value='' label='Select Terminal' key='-1' />);
    for (let i = 0; i < terminals.length; i++) {
      const terminal = terminals[i];
      terminalPickerItems.push(
        <Picker.Item key={i} value={terminal.getId()} label={terminal.getLabel()} />);
    }
    return terminalPickerItems;
  }

  getGatePickerItems() {
    const gatePickerItems = [];
    const { gates } = this.props;

    if (gates.length === 0 && this.props.selectedTerminal !== '') {
      gatePickerItems.push(<Picker.Item key='-1' value='' label='No Gates Supported' />);
      return gatePickerItems;
    }

    gatePickerItems.push(<Picker.Item value='' label='Select Gate' key='-1' />);

    for (let i = 0; i < gates.length; i++) {
      const gate = gates[i];
      gatePickerItems.push(
        <Picker.Item key={i} value={gate.getId()} label={gate.getLabel()} />);
    }
    return gatePickerItems;
  }

  search() {
    // Save state to cart
    this.props.saveCartInfo(new CartInfo(this.props.selectedAirport,
    this.props.selectedTerminal,
    this.props.selectedGate, 0));
    this.props.removeAllCartItems();
    this.props.navigation.navigate('Results');
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        <Content>
              <Text style={styles.pickerTextStyle}> Airport </Text>
              <Picker
                supportedOrientations={['portrait', 'landscape']}
                iosHeader="Select one"
                headerBackButtonText="Go Back"
                mode="dropdown"
                selectedValue={this.props.selectedAirport}
                onValueChange={(value) => this.props.loadTerminalsFromDB(value)}
                style={{ flex: 1, paddingLeft: 20 }}
              >
              { this.getAirportPickerItems() }
              </Picker>

             <Text style={styles.pickerTextStyle}> Terminal </Text>
             <Picker
               supportedOrientations={['portrait', 'landscape']}
               iosHeader="Select one"
               headerBackButtonText="Go Back"
               mode="dropdown"
               selectedValue={this.props.selectedTerminal}
               onValueChange={(value) =>
                 this.props.loadGatesFromDB(this.props.selectedAirport, value)}
               style={{ flex: 1, paddingLeft: 20 }}
             >
             { this.getTerminalPickerItems() }
             </Picker>

            <Text style={styles.pickerTextStyle}> Gate </Text>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              headerBackButtonText="Go Back"
              mode="dropdown"
              selectedValue={this.props.selectedGate}
              onValueChange={(value) => this.props.selectGate(value)}
              style={{ flex: 1, paddingLeft: 20 }}
            >
            { this.getGatePickerItems() }
            </Picker>

           {
               this.props.selectedGate !== '' &&
               <Button info onPress={() => this.search()} title='Search'/>
           }
      </Content>
    </Container>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => state.search;

export default connect(mapStateToProps, { selectGate,
  loadAirportsFromDB,
  loadTerminalsFromDB,
  loadGatesFromDB,
  saveCartInfo,
  removeAllCartItems })(SearchScreen);
