import React, { Component } from 'react';
import { styles} from '../css/Styles';
import { Container, Content, H1, H2, H3, Text, Button, Icon, Picker } from "native-base";

const Environment = require('../common/Environment');
const logger = require('../common/Logger');

export default class ResultsScreen extends Component {

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
      name: Environment.Routes.Vendor
    });
  }

  render() {
    logger.debug("Rendering Results Activity");
    return (
      <Container>
        <Content>
          <H1>
            Results Activity
          </H1>
          <H2>
            Todo Show Results
          </H2>
          <Button onPress={this.back} title="Back">
              <Text>Back</Text>
          </Button>
          <Button onPress={this.next} title="Next">
              <Text>Next</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
