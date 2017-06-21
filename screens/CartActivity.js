import React, { Component } from 'react';
import { styles} from '../css/Styles';
import { CustomFooterTab } from "./CustomFooterTab";
import { Container, Content, H1, H2, H3, Text, Button, Icon, Picker } from "native-base";

const Environment = require('../common/Environment');
const logger = require('../common/Logger');

export default class CartActivity extends Component {

  constructor(props){
    super(props);
    this.state = {
      airport: "",
      terminal: "",
      gate: ""
    };

    this.back = this.back.bind(this);
    this.next = this.next.bind(this);

  }

  back() {
    this.props.navigator.pop();
  }

  next() {
    this.props.navigator.push({
      name: Environment.Routes.Checkout
    });
  }

  render() {
    logger.debug("Rendering Cart Activity");
    return (
      <Container>
        <Content>
          <H1>
            Cart Activity
          </H1>
          <H2>
            Todo Show Cart
          </H2>
          <Button onPress={this.back} title="Back">
              <Text>Back</Text>
          </Button>
          <Button onPress={this.next} title="Next">
              <Text>Next</Text>
          </Button>
        </Content>
      <CustomFooterTab tab={Environment.Routes.Cart} navigator={this.props.navigator}/>
      </Container>
    );
  }
}
