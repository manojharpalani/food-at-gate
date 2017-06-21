import React, { Component } from 'react';
import { styles} from '../css/Styles';
import { CustomFooterTab } from "./CustomFooterTab";
import { Container, Content, H1, H2, H3, Text, Button, Icon, Picker } from "native-base";

const Environment = require('../common/Environment');
const logger = require('../common/Logger');

export default class OrdersActivity extends Component {

  constructor(props){
    super(props);
    this.state = {
      airport: "",
      terminal: "",
      gate: ""
    };
  }

  render() {
    logger.debug("Rendering Orders Activity");
    return (
      <Container>
        <Content>
          <H1>
            Orders Activity
          </H1>
          <H2>
            Todo Show Orders
          </H2>
        </Content>
      <CustomFooterTab tab={Environment.Routes.Orders} navigator={this.props.navigator}/>
      </Container>
    );
  }
}
