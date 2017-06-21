import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import Router from '../navigation/Router';

export default class CartScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Cart',
    },
  };

  _goHome = () => {
    this.props.navigator.push('home');
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Text> Cart screen. </Text>
        <Button onPress={this._goHome} title='Home'/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
