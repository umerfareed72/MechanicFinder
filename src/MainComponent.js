import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  AppRegistry,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import AppNavigator from './navigations/AppNavigator';
import Bottomtabnavigator from './navigations/BottomTabNavigation';
import MechanicTab from './navigations/MechanicNavigation';
import AdminTab from './navigations/AdminNavigation';

import jwt from 'jwt-decode';
import {set_CurrentUser} from './actions/index';
import {connect} from 'react-redux';

class MainComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hasToken: false,
      isLoaded: false,
      isloggedin: false,
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem('usertoken').then((res) => {
      this.props.set_CurrentUser(jwt(res));
      this.setState({isloggedin: true});
    });
  }
  render() {
    const {auth} = this.props;
    if (this.state.isloggedin === true && auth.user.role == 'User') {
      return <Bottomtabnavigator></Bottomtabnavigator>;
    } else if (this.state.isloggedin === true && auth.user.role == 'Mechanic') {
      return <MechanicTab></MechanicTab>;
    }else if (this.state.isloggedin === true && auth.user.role == 'Admin') {
      return <AdminTab></AdminTab>
    }

    return <AppNavigator></AppNavigator>;
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {set_CurrentUser})(MainComponent);
