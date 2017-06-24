import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

export default class ConfirmationScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Order ConfirmationScreen!</Text>
        <Button
          onPress={() => navigate('Home')}
          title="Home"
        />
      </View>
    );
  }
}
