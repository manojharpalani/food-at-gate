import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import Button from 'apsl-react-native-button';
import { FontAwesome as Icon } from '@expo/vector-icons';
import DismissKeyboard from 'dismissKeyboard';
import { Sae } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, login, signUp, demoLogin } from '../actions';
import CommonStyles from '../css/CommonStyles';

class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  render() {
    console.log(this.props);
    const { navigate } = this.props.navigation;
    if (this.props.user !== null) {
      setTimeout(() => { navigate('Main'); }, 500);
    }
    return (
      <TouchableWithoutFeedback onPress={() => { DismissKeyboard(); }}>
          <View style={CommonStyles.container}>
              <View style={styles.formGroup}>
              <Text style={styles.title}>Food @ Gate</Text>
              <Sae
                  label={'Email Address'}
                  labelStyle={{ color: 'black' }}
                  inputStyle={{ color: 'black' }}
                  iconClass={Icon}
                  iconName={'pencil'}
                  iconColor={'black'}
                  onChangeText={(email) => this.props.updateEmail(email)}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  inputStyle={{ color: 'black' }}
              />
              <Sae
                  label={'Password'}
                  labelStyle={{ color: 'black' }}
                  iconClass={Icon}
                  iconName={'key'}
                  iconColor={'black'}
                  onChangeText={(password) => this.props.updatePassword(password)}
                  password={'true'}
                  autoCapitalize='none'
                  inputStyle={{ color: 'black' }}
              />
              <View style={styles.submit}>
                  <Button onPress={() => { DismissKeyboard(); this.props.login(this.props.email, this.props.password); }} style={styles.buttons} textStyle={{ fontSize: 18 }}>
                      Login
                  </Button>
                  <Button onPress={() => { DismissKeyboard(); this.props.signUp(this.props.email, this.props.password); }} style={styles.buttons} textStyle={{fontSize: 18}}>
                      Signup
                  </Button>
                  <Button onPress={() => { DismissKeyboard(); this.props.demoLogin(); }} style={styles.buttons} textStyle={{ fontSize: 18 }}>
                      Demo
                  </Button>
              </View>
              </View>
              <View>
                {
                  this.props.isAuthenticating && <Text style={styles.response}>Logging In ...</Text>
                }
                <Text style={styles.response}>{this.props.authResponse}</Text>
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
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold'
    },
    submit: {
        paddingTop: 30
    },
    response: {
        textAlign: 'center',
        paddingTop: 0,
        padding: 50
    }
});

const mapStateToProps = (state) => state.auth;

export default connect(
  mapStateToProps,
  { updateEmail, updatePassword, login, signUp, demoLogin })(LoginScreen);
