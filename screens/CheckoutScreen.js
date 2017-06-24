import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

export default class CheckoutScreen extends React.Component {
  static navigationOptions = {
    title: 'Checkout'
  };
  render() {
    return (
      <View>
      <Text>List of all items to buy</Text>
      <Button
        onPress={() => this.props.navigation.navigate('Search')}
        title="Back to search"
      />
      </View>
    )
  }
}
