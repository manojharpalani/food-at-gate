/**
 * @class ProfileScreen for updating user profile data
 */

import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import { Container, Content } from "native-base";
import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Hideo} from "react-native-textinput-effects";
import CommonStyles from "../css/CommonStyles";
import * as firebase from "firebase";
import Database from "../firebase/database";
import DismissKeyboard from "dismissKeyboard";
import { User } from "../model/User";
import { UserProfile } from "../model/UserProfile";

const logger = require('../common/Logger');
const Environment = require('../common/Environment');

class ProfileScreen extends Component {
    static route = {
      navigationBar: {
        title: 'Profile',
      },
    };

    constructor(props) {
        super(props);
        var defaultUser = new User("", new UserProfile("", ""));
        this.state = {
            user: defaultUser,
            nameForm: "",
            mobileForm: ""
        };
        this.logout = this.logout.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    }

    async logout() {
        logger.debug("Logging out user");
        try {
            await firebase.auth().signOut();
            this.props.navigation.getNavigator('root').replace('login');
        } catch (error) {
            logger.error(error);
        }
    }

    async componentDidMount() {
        logger.debug("Fetching user profile from Firebase DB");
        try {
            // Get User Credentials
            let user = await firebase.auth().currentUser;

            // Listen for Profile Changes
            Database.listenUserProfile(user.uid, (profile) => {
                var loggedInUser = new User(user.uid, profile);
                this.setState({
                    user: loggedInUser,
                    nameForm: profile.getName(),
                    mobileForm: profile.getMobile()
                });
            });
        } catch (error) {
            logger.error(error);
        }
    }

    saveProfile() {
        logger.debug("Saving users profile in Firebase DB");
        // Save user profile
        if (this.state.user.getId()) {
            var nameToSave = this.state.nameForm ? this.state.nameForm : "";
            var mobileToSave = this.state.mobileForm ? this.state.mobileForm : "";
            var profile = this.state.user.getProfile();
            profile.setName(nameToSave);
            profile.setMobile(mobileToSave);
            Database.setUserProfile(this.state.user.getId(), profile);
            DismissKeyboard();
        }
    }

    render() {

        return (
          <Container>
            <Content>
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.content}
                  >
                    <Text style={styles.heading}>Hello {this.state.user.getProfile().getName()}</Text>
                    <Text style={styles.heading}>UserId: {this.state.user.getId()}</Text>
                    <Text style={styles.heading}>Mobile Number: {this.state.user.getProfile().getMobile()}</Text>
                    <View style={styles.form}>
                        <Hideo
                            iconClass={FontAwesomeIcon}
                            iconName={"user"}
                            iconColor={"white"}
                            iconBackgroundColor={"#c41717"}
                            value={this.state.nameForm}
                            onChangeText={(nameForm) => this.setState({nameForm})}
                        />
                    </View>
                    <View style={styles.form}>
                        <Hideo
                            iconClass={FontAwesomeIcon}
                            iconName={"mobile"}
                            iconColor={"white"}
                            iconBackgroundColor={"#c41717"}
                            value={this.state.mobileForm}
                            onChangeText={(mobileForm) => this.setState({mobileForm})}
                        />
                    </View>
                    <View style={styles.actions}>
                        <Button onPress={this.saveProfile} style={CommonStyles.buttons} textStyle={{fontSize: 18}}>
                            Save
                        </Button>
                        <Button onPress={this.logout} style={CommonStyles.buttons} textStyle={{fontSize: 18}}>
                            Logout
                        </Button>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 24,
      backgroundColor: '#ecf0f1',
    },
    content: {
      // not cool but good enough to make all inputs visible when keyboard is active
      paddingBottom: 300,
    },
    heading: {
        textAlign: "center"
    },
    actions: {
        padding: 50
    },
    form: {
        paddingTop: 10,
        padding: 10
    },
    card1: {
      paddingVertical: 16,
    },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});

module.exports = ProfileScreen;
