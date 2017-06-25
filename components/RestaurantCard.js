import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';

class RestaurantCard extends Component {
  onRowPress() {
  }

  render() {
    const name = this.props.restaurant.getName();

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default RestaurantCard;
