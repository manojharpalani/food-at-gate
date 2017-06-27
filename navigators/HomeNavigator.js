import React from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import SearchScreen from '../screens/SearchScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import CartScreen from '../screens/CartScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

export const HomeNavigator = StackNavigator({
  Search: { screen: SearchScreen },
  Results: { screen: ResultsScreen },
  Restaurant: { screen: RestaurantScreen },
  Cart: { screen: CartScreen },
  Checkout: { screen: CheckoutScreen },
  Confirmation: { screen: ConfirmationScreen },
});

HomeNavigator.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: () => (<Icon name="home" size={24} color="white" />)
};
