import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContext, NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Router from './navigation/Router';
import Store from './state/Store';

import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import Logger from './common/Logger';
import Environment from './common/Environment';
import FirebaseProvider from "./firebase/firebase";
import firebase from "firebase";

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
});

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
    user: null
  };

  componentWillMount() {
    this._initialize();
  }

  async _authenticate() {
    Logger.debug("Setting up listener for authenticating user.");
    firebase.auth().onAuthStateChanged((user) => {
      Logger.debug("Authenticate called");
      if (user) {
        Logger.debug("User successfully authenicated, Switching view to search");
        this.setState({user});
      }
    });
  }

  async _initialize() {
    try {
      //Init Syntry logger
      Logger.init();
      // Init Firebase
      FirebaseProvider.initialise();
      // Authenticate User
      this._authenticate();
      // Cache assets - fonts, images etc
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png')],
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
        'There was an error initializing the app (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      + e);
      console.log(e.message);
    }
  }

  render() {
    if (this.state.appIsReady) {
      let initScreen = this.state.user ? 'home' : 'login';
      return (
        <View style={styles.container}>
          <Provider store={Store}>
            <NavigationProvider context={navigationContext}>
              <StackNavigation
                id="root"
                initialRoute={initScreen}
              />
            </NavigationProvider>
          </Provider>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
        </View>
      );
    } else {
      return <Expo.AppLoading />;
    }
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

Expo.registerRootComponent(AppContainer);
