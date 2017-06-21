import { createRouter } from '@expo/ex-navigation';

import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  login: () => LoginScreen,
  profile: () => ProfileScreen,
  home: () => HomeScreen,
  cart: () => CartScreen,
  orders: () => OrdersScreen,
  rootNavigation: () => RootNavigation,
}));
