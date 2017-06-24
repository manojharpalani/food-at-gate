import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Orders',
    tabBarIcon: () => (<Icon name="list" size={24} color="white" />)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>User Orders!</Text>
        <Button
          onPress={() => navigate('Home')}
          title="Home"
        />
      </View>
    );
  }
}
