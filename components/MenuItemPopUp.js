import React, { Component } from 'react';
import { Container, Content, Button, Text,
  Card, CardItem, Thumbnail, Left, Body } from 'native-base';

export default class MenuItemPopUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      selectedOption: '',
      selectedMenuItem: ''
    };
  }

  render() {
    if (this.props.menuItem === '') {
      return null;
    }
    const name = this.props.menuItem.getInfo().getName();
    const description = this.props.menuItem.getInfo().getDescription();
    const imageUri = this.props.menuItem.getInfo().getImageUri();

    return (
      <Container>
        <Content>
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
            <Button
              text="Cancel"
              onPress={() => {
                this.props.onCancel();
              }}
            />
        </Content>
      </Container>
    );
  }

}
