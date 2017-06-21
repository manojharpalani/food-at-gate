/**
 * @class LoginScreen
 */

import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback
} from "react-native";

import React, {Component} from "react";
import firebase from "firebase";
import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
import CommonStyles from "../css/CommonStyles";
import Router from '../navigation/Router';
const Environment = require('../common/Environment');
const logger = require('../common/Logger');

export default class LoginScreen extends Component {

    state = {
      email: '',
      password: '',
      response: '',
    };

    onChangeEmail = (email) => this.setState({email});

    onChangePassword = (password) => this.setState({password});

    updateResponse = (response) => this.setState({response});

    onSubmitLogin = () => {
      DismissKeyboard();
      const {onSubmitLogin} = this.props;
      const {email} = this.state;
      const {password} = this.state;
      if (!email || !password) {
        return;
      }
      onSubmitLogin(email, password);
      this.setState({
        email: '',
        password: '',
        response: '',
      });
    }

    onSubmitCreateAccount = () => {
      DismissKeyboard();
      const {onSubmitCreateAccount} = this.props;
      const {email} = this.state;
      const {password} = this.state;
      if (!email || !password) {
        return;
      }
      onSubmitCreateAccount(email, password);
      this.setState({
        email: '',
        password: '',
        response: '',
      });
    }

    onSubmitDemo = () => {
      DismissKeyboard();
      this.setState({
        email: 'demo@foodatgate.com',
        password: 'demo123',
        response: 'Logging in with demo account!',
      });
      setTimeout(() => {this.onSubmitLogin}, 300);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View style={CommonStyles.container}>
                    <View style={styles.formGroup}>
                        <Text style={styles.title}>Food @ Gate</Text>
                        <Sae
                            label={"Email Address"}
                            labelStyle={{ color: "black" }}
                            inputStyle={{ color: "black" }}
                            iconClass={FontAwesomeIcon}
                            iconName={"pencil"}
                            iconColor={"black"}
                            onChangeText={this.onChangeEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            inputStyle={{ color: "black" }}
                        />
                        <Sae
                            label={"Password"}
                            labelStyle={{ color: "black" }}
                            iconClass={FontAwesomeIcon}
                            iconName={"key"}
                            iconColor={"black"}
                            onChangeText={this.onChangePassword}
                            password={true}
                            autoCapitalize="none"
                            inputStyle={{ color: "black" }}
                        />
                        <View style={styles.submit}>
                            <Button onPress={this.onSubmitCreateAccount} style={styles.buttons} textStyle={{fontSize: 18}}>
                                Signup
                            </Button>
                            <Button onPress={this.onSubmitLogin} style={styles.buttons} textStyle={{fontSize: 18}}>
                                Login
                            </Button>
                            <Button onPress={this.onSubmitDemo} style={styles.buttons} textStyle={{fontSize: 18}}>
                                Demo
                            </Button>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.response}>{this.state.response}</Text>
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
