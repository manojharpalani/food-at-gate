import React from 'react';
import {
  Button,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, H3, Badge, Text } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CheckoutItemCard from '../components/CheckoutItemCard';
import { checkout } from '../actions';

class CheckoutScreen extends React.Component {
  static navigationOptions = {
    title: 'Checkout'
  };

  state = {
    isDateTimePickerVisible: false,
  };

  componentWillMount() {
    this.createDataSource(this.props.cart.items);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.cart.items);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  createDataSource(restaurants) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(restaurants);
  }

  renderRow(cartItem) {
    return (<CheckoutItemCard
            cartItem={cartItem}
            onRowPress={(selectedCartItem) => this.onSelectCartItem(selectedCartItem)}
    />);
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        <Content>
          <Badge success><Text>{this.props.cart.info.getCount()} items in cart!</Text></Badge>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
          <Button onPress={this._showDateTimePicker} title='Select Time'/>
          <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          />
          <Button
            onPress={() => this.props.navigation.navigate('Confirmation')}
            title="Checkout"
          />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const { cart } = state;
  return { cart };
};

export default connect(mapStateToProps, {
  checkout
})(CheckoutScreen);
