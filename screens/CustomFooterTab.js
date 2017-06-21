import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { styles} from '../css/Styles';
const Environment = require('../common/Environment');

export default class CustomFooterTab extends Component {

  constructor(props){
    super(props);
    this.state = {
      homeTab: this.props.tab === Environment.Routes.Search,
      profileTab: this.props.tab === Environment.Routes.Profile,
      cartTab: this.props.tab === Environment.Routes.Cart,
      ordersTab: this.props.tab === Environment.Routes.Orders,
    };
    this.profileTab = this.profileTab.bind(this);
    this.homeTab = this.homeTab.bind(this);
    this.cartTab = this.cartTab.bind(this);
    this.ordersTab = this.ordersTab.bind(this);
  }

  profileTab() {
    if (!this.state.profileTab) {
      this.props.navigator.replace({
          name: Environment.Routes.Profile
      });
    }
  };

  homeTab() {
    if (!this.state.homeTab) {
      this.props.navigator.replace({
          name: Environment.Routes.Search
      });
    }
  }

  cartTab() {
    if (!this.state.cartTab) {
      this.props.navigator.replace({
          name: Environment.Routes.Cart
      });
    }
  }

  ordersTab() {
    if (!this.state.ordersTab) {
      this.props.navigator.replace({
          name: Environment.Routes.Orders
      });
    }
  }

  render() {
    return (
        <Footer>
          <FooterTab>
              <Button active={this.state.homeTab} vertical onPress = {this.homeTab}>
                  <Icon name="home" />
                  <Text>Home</Text>
              </Button>
              <Button active={this.state.cartTab} vertical onPress = {this.cartTab}>
                  <Icon name="cart" />
                  <Text>Cart</Text>
              </Button>
              <Button active={this.state.ordersTab} vertical onPress = {this.ordersTab}>
                  <Icon active name="folder" />
                  <Text>Orders</Text>
              </Button>
              <Button active={this.state.profileTab} vertical onPress = {this.profileTab}>
                  <Icon name="person" />
                  <Text>Profile</Text>
              </Button>
            </FooterTab>
          </Footer>
    );
  }
}

module.exports = { CustomFooterTab }
