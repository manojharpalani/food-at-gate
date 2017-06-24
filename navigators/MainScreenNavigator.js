import {HomeNavigator} from './HomeNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CartScreen from '../screens/CartScreen';
import { TabNavigator } from "react-navigation";
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import React from 'react';

export const MainScreenNavigator = TabNavigator({
  Home: { screen: HomeNavigator },
  Cart: {screen: CartScreen},
  Orders: {screen: OrdersScreen},
  Profile: {screen: ProfileScreen},
},
{
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      backgroundColor: '#3498db'
    }
  }
});

MainScreenNavigator.navigationOptions = {
  header: null
}
