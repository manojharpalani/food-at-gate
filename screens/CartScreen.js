import React from 'react';
import {
  ListView, Alert, Button
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Container, Content, Footer, H3, Badge, Text } from 'native-base';
import { removeItem } from '../actions';
import CartItemCard from '../components/CartItemCard';

class CartScreen extends React.Component {
  static navigationOptions = {
    title: 'Cart',
    tabBarLabel: 'Cart',
    tabBarIcon: () => (<Icon name="shopping-cart" size={24} color="white" />)
  }

  componentWillMount() {
    this.createDataSource(this.props.cart.items);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.cart.items);
  }

  onSelectCartItem(cartItem) {
    Alert.alert(
    'Remove Item',
    'Do you wish to remove the item from your cart?',
    [
      { text: 'Yes', onPress: () => this.props.removeItem(cartItem.getId()) },
      { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    ],
    { cancelable: false }
    );
  }

  createDataSource(restaurants) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(restaurants);
  }

  renderRow(cartItem) {
    return (<CartItemCard
            cartItem={cartItem}
            onRowPress={(selectedCartItem) => this.onSelectCartItem(selectedCartItem)}
    />);
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        <Content>
          <Badge success><Text>{this.props.cart.info._count} items in cart!</Text></Badge>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
          <Button
            onPress={() => this.props.navigation.navigate('Checkout')}
            title="Proceed to checkout"
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

export default connect(mapStateToProps,
  { removeItem })(CartScreen);
