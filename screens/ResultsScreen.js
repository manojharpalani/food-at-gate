import React from 'react';
import {
  ListView
} from 'react-native';
import { Container, Content } from 'native-base';
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
    this.createDataSource(nextProps.results.restaurants);
  }

  onSelectRestaurant(restaurant) {
      this.props.selectRestaurant(restaurant);
      this.props.navigation.navigate('Restaurant');
  }

  createDataSource(restaurants) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(restaurants);
  }

  renderRow(restaurant) {
    return (<RestaurantCard
            restaurant={restaurant}
            onRowPress={(selectedRestaurant) => this.onSelectRestaurant(selectedRestaurant)}
    />);
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        <Content>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { results, search } = state;
  return { results, search };
};

export default connect(mapStateToProps,
  { loadRestaurantsFromDB, selectRestaurant })(ResultsScreen);
