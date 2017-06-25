import React from 'react';
import { StackNavigator } from 'react-navigation';
import SearchScreen from '../screens/SearchScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import CartScreen from '../screens/CartScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { FontAwesome as Icon } from '@expo/vector-icons';

export const HomeNavigator = StackNavigator({
  Search: { screen: SearchScreen },
  Results: { screen: ResultsScreen },
  Vendor: { screen: RestaurantScreen },
  Cart: { screen: CartScreen },
  Checkout: { screen: CheckoutScreen },
  Confirmation: { screen: ConfirmationScreen },
});

HomeNavigator.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: () => (<Icon name="home" size={24} color="white" />)
};
