import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import Store from './state/Store';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import Logger from './common/Logger';
import Environment from './common/Environment';
import FirebaseProvider from "./firebase/firebase";
import AppContainer from './containers/AppContainer';
import { authSuccess, loadAirportsFromDB } from './actions';
import firebase from "firebase";

class RootContainer extends React.Component {

  state = {
    appIsReady: false
  };

  componentWillMount() {
    this.initialize();
  }

  async authenticate() {
    Logger.debug("Setting up listener for authenticating user.");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Logger.debug("User successfully authenicated, Set user in state to switch view directly to main");
        Store.dispatch(authSuccess(user, 'Logged In!!'));
      } else {
        Logger.debug("User not authenicated, Switching view to Login");
      }
    });
  }

  loadAirportsFromDB() {
    Logger.debug("Load airports from DB.");
    Store.dispatch(loadAirportsFromDB());
  }

  async initialize() {
    try {
      //Init Syntry logger
      Logger.init();
      // Init Firebase
      FirebaseProvider.initialise();
      // Listen to auth updates
      this.authenticate();
      // Load Airports supported
      this.loadAirportsFromDB();
      // Cache assets - fonts, images etc
      await cacheAssetsAsync({
        images: [require('./assets/icons/app-icon.png')],
        fonts: [
          FontAwesome.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            'Arial': require('./assets/fonts/arial.ttf') },
        ],
      });
      this.setState({
          appIsReady: true
      });
    } catch (e) {
      Logger.error(
        `${'There was an error initializing the app (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'}${
       e}`);
      Logger.log(e.message);
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
            <AppContainer />
        </View>
      );
    }
    return <Expo.AppLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Expo.registerRootComponent(RootContainer);
