import React from 'react';
import {
  Text,
  View,
  Button,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import { loadRestaurantsFromDB, selectRestaurant } from '../actions';
import RestaurantCard from '../components/RestaurantCard';

class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'Restaurants'
  };

  componentWillMount() {
    this.props.loadRestaurantsFromDB(this.props.search.selectedAirport,
       this.props.search.selectedTerminal);

    this.createDataSource(this.props.results.restaurants);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps.results.restaurants);
  }

  createDataSource(restaurants) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(restaurants);
  }

  renderRow(restaurant) {
    return <RestaurantCard restaurant={restaurant} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { results, search } = state;
  return { results, search };
};

export default connect(mapStateToProps,
  { loadRestaurantsFromDB, selectRestaurant })(ResultsScreen)
