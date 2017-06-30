import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';

class RestaurantCard extends Component {

  render() {
    const id = this.props.restaurant.getId();
    const name = this.props.restaurant.getName();
    const category = this.props.restaurant.getCategory();
    const iconImage = this.props.restaurant.getIconImage();

    return (
      <TouchableOpacity onPress={() => this.props.onRowPress(this.props.restaurant)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: `${iconImage}` }} />
              <Body>
                <Text>{name}</Text>
                <Text note>{category}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default RestaurantCard;
