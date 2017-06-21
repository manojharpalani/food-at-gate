import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class OrdersScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Orders',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Text> Orders view. </Text>

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
