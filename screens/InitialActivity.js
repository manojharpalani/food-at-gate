/**
 * Core initial activity of the app that controls the naviagtion flow.
**/
import React, {
    Component
} from "react";

import {
    Navigator,
} from "react-native-deprecated-custom-components";

import { styles} from '../css/Styles';
import Firebase from "../firebase/firebase";
import Splash from "./SplashActivity";
import Login from "./LoginScreen";
import Profile from "./ProfileScreen";
import Search from "./SearchActivity";
import Results from "./ResultsActivity";
import Vendor from "./VendorActivity";
import Cart from "./CartActivity";
import Checkout from "./CheckoutActivity";
import Confirmation from "./ConfirmationActivity";
import Orders from "./OrdersActivity";

const Environment = require('../common/Environment');
const logger = require('../common/Logger');

class InitialActivity extends Component {

  constructor(props) {
    super(props);
    // Ignore Android Firebase Warning
    console.ignoredYellowBox = ['Setting a timer'];

    // Initialize Firebase
    Firebase.initialise();
  }

  static renderScene(route, navigator) {

    switch (route.name) {
      case Environment.Routes.Splash:
        return <Splash navigator={navigator} />
        break;
      case Environment.Routes.Login:
        return (<Login navigator={navigator} />);
        break;
      case Environment.Routes.Profile:
        return (<Profile navigator={navigator} />);
        break;
      case Environment.Routes.Search:
        return (<Search navigator={navigator} />);
        break;
      case Environment.Routes.Results:
        return (<Results navigator={navigator} />);
        break;
      case Environment.Routes.Vendor:
        return (<Vendor navigator={navigator} />);
        break;
      case Environment.Routes.Cart:
        return (<Cart navigator={navigator} />);
        break;
      case Environment.Routes.Checkout:
        return (<Checkout navigator={navigator} />);
        break;
      case Environment.Routes.Confirmation:
        return (<Confirmation navigator={navigator} />);
        break;
      case Environment.Routes.Orders:
        return (<Orders navigator={navigator} />);
        break;
    }
  }

  static configureScene(route) {

    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      });
    }

  }

  render() {
      logger.debug("InitialActivity");
      return <Navigator
                initialRoute={{name: Environment.Routes.Splash}}
                renderScene={InitialActivity.renderScene}
                configureScene={InitialActivity.configureScene}/>;
  }

}
module.exports = InitialActivity;
