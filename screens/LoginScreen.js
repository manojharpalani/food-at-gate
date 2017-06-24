import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback
} from "react-native";
import Button from "apsl-react-native-button";
import { FontAwesome as Icon } from '@expo/vector-icons';
import DismissKeyboard from "dismissKeyboard";
import {Sae} from "react-native-textinput-effects";
import CommonStyles from "../css/CommonStyles";
const logger = require('../common/Logger');
import { connect } from 'react-redux';
import { login, signUp, demoLogin } from '../actions/LoginActions';

class LoginScreen extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          email: "",
          password: "",
          response: "",
          authenicated: false
      };
  }

  static navigationOptions = {
    title: 'Login',
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.props.auth.user !== null) {
      setTimeout(() => {navigate('Main')}, 300);
    }
    return (
      <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
          <View style={CommonStyles.container}>
              <View style={styles.formGroup}>
              <Text style={styles.title}>Food @ Gate</Text>
              <Sae
                  label={"Email Address"}
                  labelStyle={{ color: "black" }}
                  inputStyle={{ color: "black" }}
                  iconClass={Icon}
                  iconName={"pencil"}
                  iconColor={"black"}
                  onChangeText={(email) => this.setState({email})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  inputStyle={{ color: "black" }}
              />
              <Sae
                  label={"Password"}
                  labelStyle={{ color: "black" }}
                  iconClass={Icon}
                  iconName={"key"}
                  iconColor={"black"}
                  onChangeText={(password) => this.setState({password})}
                  password={true}
                  autoCapitalize="none"
                  inputStyle={{ color: "black" }}
              />
              <View style={styles.submit}>
                  <Button onPress={() => {this.props.login(this.state.email, this.state.password)}} style={styles.buttons} textStyle={{fontSize: 18}}>
                      Login
                  </Button>
                  <Button onPress={() => {this.props.signUp(this.state.email, this.state.password)}} style={styles.buttons} textStyle={{fontSize: 18}}>
                      Signup
                  </Button>
                  <Button onPress={() => {this.props.demoLogin()}} style={styles.buttons} textStyle={{fontSize: 18}}>
                      Demo
                  </Button>
              </View>
              </View>
              <View>
                {
                  this.props.auth.isAuthenticating && <Text style={styles.response}>Logging In ...</Text>
                }
                <Text style={styles.response}>{this.props.auth.authResponse}</Text>
              </View>
          </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
    formGroup: {
        padding: 50
    },
    title: {
        paddingBottom: 16,
        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold"
    },
    submit: {
        paddingTop: 30
    },
    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    }
});

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
    signUp: (email, password) => dispatch(signUp(email, password)),
    demoLogin: () => dispatch(demoLogin())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
