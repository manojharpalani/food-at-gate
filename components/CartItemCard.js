import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

class CartItemCard extends Component {

  render() {
    const restaurant = this.props.cartItem.getRestaurant();
    const item = this.props.cartItem.getItem();
    const option = this.props.cartItem.getOption();
    const price = this.props.cartItem.getPrice();
    const quantity = this.props.cartItem.getQuantity();
    const notes = this.props.cartItem.getNotes();
    const imageUri = this.props.cartItem.getImageUri();

    return (
      <TouchableOpacity onPress={() => this.props.onRowPress(this.props.cartItem)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: `${imageUri}` }} />
              <Body>
                <Text>{item}</Text>
                <Text note>{restaurant}</Text>
                <Text note>{notes}</Text>
              </Body>
            </Left>
            <Right>
                <Text>${price}</Text>
                <Text note>Opt: {option}</Text>
                <Text note>Qty: {quantity}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default CartItemCard;
