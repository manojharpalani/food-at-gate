import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

export default class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'Restaurants'
  };
  render() {
    return (
      <View>
      <Text>List of Restaurants</Text>
      <Button
        onPress={() => this.props.navigation.navigate('Search')}
        title="Back to search"
      />
      </View>
    );
  }
}
