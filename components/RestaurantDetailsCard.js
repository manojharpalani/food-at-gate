import React, { Component } from 'react';
import { Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';

class RestaurantDetailsCard extends Component {

  render() {
    const name = this.props.restaurant.getName();
    const category = this.props.restaurant.getCategory();
    const iconImage = this.props.restaurant.getIconImage();
    const description = this.props.restaurant.getDescription();

    return (
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
        <CardItem cardBody>
        <Body>
          <Text>{description}</Text>
        </Body>
        </CardItem>
      </Card>
    );
  }
}

export default RestaurantDetailsCard;
