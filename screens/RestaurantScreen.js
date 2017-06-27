import React from 'react';
import {
  ListView, View, Text
} from 'react-native';
import { Container, Content, Spinner, Button } from 'native-base';
import { connect } from 'react-redux';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import MenuItemCard from '../components/MenuItemCard';
import RestaurantDetailsCard from '../components/RestaurantDetailsCard';
import { loadMenuFromDB, selectMenuItem,
  addMenuItemToCart, removeMenuItemFromCart } from '../actions';
import MenuItemPopUp from '../components/MenuItemPopUp';

const _ = require('lodash');

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
       this.props.results.selectedRestaurant);

    this.createDataSource(this.props.restaurant.menuItems);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.restaurant.menuItems);
  }

  onSelectMenuItem(menuItem) {
      this.props.selectMenuItem(menuItem);
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
      const restaurant = _.find(restaurants, { _id: `${selectedRestaurant}` });
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

              <RestaurantDetailsCard restaurant={restaurant} />
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
    addMenuItemToCart,
    removeMenuItemFromCart })(RestaurantScreen);
