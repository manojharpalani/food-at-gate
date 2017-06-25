import React from 'react';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Expo from 'expo';
import { View, Platform } from 'react-native';
import store from '../state/Store';
import { AppNavigator } from '../navigators/AppNavigator';

class AppContainer extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(AppContainer);


// Add padding to avoid overlap with status bar
// Ref: https://github.com/react-community/react-navigation/issues/1478
export default class Root extends React.Component {
  render() {
    return (
      <View
        style={{ flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}
      >
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    );
  }
}
