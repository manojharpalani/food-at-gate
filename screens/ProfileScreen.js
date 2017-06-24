import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: () => (<Icon name="user" size={24} color="white" />)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>User Profile!</Text>
        <Button
          onPress={() => navigate('Home')}
          title="Home"
        />
      </View>
    );
  }
}
