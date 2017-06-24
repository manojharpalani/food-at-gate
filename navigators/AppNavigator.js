import {MainScreenNavigator} from './MainScreenNavigator';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';

import { StackNavigator } from 'react-navigation';

export const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Main: { screen: MainScreenNavigator },
});
