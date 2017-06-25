/**
 * Common splash screen for android and ios
 * https://github.com/snehamule/fag-react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const Environment = require('../common/Environment');
const logger = require('../common/Logger');
import { styles} from '../css/Styles';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    // Set timeout on splash screen
    setTimeout(() => {navigate('Login')}, 1000);
  }

  render() {
    logger.debug("Rendering FoodAtGateApp Splash screen");

    return (
      <View style={styles.container}>
        <Image source={require("../assets/icons/app-icon.png")} style={styles.homeLogo}/>
        <Text style={styles.welcome}>
          Food @ Gate!!!
        </Text>
        <Text style={styles.instructions}>
          Never go hungry on the airplane again.
        </Text>
      </View>
    );

  }
}
