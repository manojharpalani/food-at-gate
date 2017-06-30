import React from 'react';
import {
  ListView, View, Text, Alert
} from 'react-native';
import { Container, Content, Spinner, Button } from 'native-base';
import { connect } from 'react-redux';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import MenuItemCard from '../components/MenuItemCard';
import RestaurantDetailsCard from '../components/RestaurantDetailsCard';
import { loadMenuFromDB, selectMenuItem, addItem } from '../actions';
import MenuItemPopUp from '../components/MenuItemPopUp';
import { CartItem } from '../model/CartItem';

class RestaurantScreen extends React.Component {
  static navigationOptions = {
    title: 'Restaurant Menu'
  }

  constructor(props) {
    super(props);
    this.onSelectMenuItem = this.onSelectMenuItem.bind(this);
  }

  componentWillMount() {
    this.props.loadMenuFromDB(this.props.search.selectedAirport,
       this.props.search.selectedTerminal,
       this.props.results.selectedRestaurant.getId());

    this.createDataSource(this.props.restaurant.menuItems);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.restaurant.menuItems);
  }

  onSelectMenuItem(menuItem) {
      this.props.selectMenuItem(menuItem);
      const cartItem = new CartItem('',
        this.props.results.selectedRestaurant.getName(),
        menuItem.getInfo().getName(),
        menuItem.getInfo().getImageUri(),
        menuItem.getOptions()[0].getName(),
        menuItem.getOptions()[0].getPrice(),
        1,
        '');

      Alert.alert(
        'Add Item',
        'Do you wish to add item to your cart?',
        [
          { text: 'Yes', onPress: () => this.props.addItem(cartItem) },
          { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
        );
      //FIXME: Dialog doesnt show up, probably some style issue.
      // this.popupDialog.show();
  }

  onCancelMenuItem() {
    this.popupDialog.show();
  }

  getContent() {
    const { restaurants, selectedRestaurant } = this.props.results;
    const { menuItems } = this.props.restaurant;

    if (selectedRestaurant && restaurants && menuItems) {
      return (
            <View>
              <PopupDialog
                dialogTitle={<DialogTitle title="Add To Cart" />}
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
              >
                <MenuItemPopUp
                  menuItem={this.props.restaurant.selectedMenuItem}
                  onCancel={() => { this.onCancelMenuItem.bind(this); }}
                />
              </PopupDialog>

              <RestaurantDetailsCard restaurant={selectedRestaurant} />
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
              { menuItems.length === 0 && <Text> Sorry no items available </Text> }
            </View>
      );
    }
    return <Spinner color='blue' />;
  }

  createDataSource(menuItems) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(menuItems);
  }

  renderRow(menuItem) {
    return (<MenuItemCard
            menuItem={menuItem}
            onRowPress={(menuItemId) => this.onSelectMenuItem(menuItemId)}
    />);
  }

  render() {
    console.log(this.props);

    return (
      <Container>
        <Content>
          { this.getContent() }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { results, search, restaurant } = state;
  return { results, search, restaurant };
};

export default connect(mapStateToProps,
  { loadMenuFromDB,
    selectMenuItem,
    addItem })(RestaurantScreen);
