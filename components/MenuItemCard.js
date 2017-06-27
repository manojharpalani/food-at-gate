import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';

class MenuItemCard extends Component {

  render() {
    const name = this.props.menuItem.getInfo().getName();
    const description = this.props.menuItem.getInfo().getDescription();
    const imageUri = this.props.menuItem.getInfo().getImageUri();

    return (
      <TouchableOpacity onPress={() => this.props.onRowPress(this.props.menuItem)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: `${imageUri}` }} />
              <Body>
                <Text>{name}</Text>
                <Text note>{description}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default MenuItemCard;
