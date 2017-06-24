import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

export default class CartScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Cart',
    tabBarIcon: () => (<Icon name="shopping-cart" size={24} color="white" />)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>User Cart!</Text>
        <Button
          onPress={() => navigate('Home')}
          title="Home"
        />
      </View>
    );
  }
}
