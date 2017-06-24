import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search'
  };

  render() {
    return (
      <View>
      <Text>Select airport, terminal and gate</Text>
      <Button
        onPress={() => this.props.navigation.navigate('Checkout', { airport: 'SFO' })}
        title="Search"
      />
      </View>
    )
  }
}
