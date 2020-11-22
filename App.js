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
import AppNavigator from './src/navigations/AppNavigator';
import Bottomtabnavigator from './src/navigations/BottomTabNavigation';
import MechanicTab from './src/navigations/MechanicNavigation';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasToken: false,
      isLoaded: false,
      isloggedin: null,
      isMechanicLogin: null,
    };
    console.disableYellowBox = true;
  }

  detectlogin = async () => {
    this.setState({isLoaded: true});
    const token = await AsyncStorage.getItem('usersignintoken');
    if (token) {
      this.setState({isloggedin: true});
    } else {
      this.setState({isloggedin: false});
    }
  };
  detectMechanicLogin = async () => {
    this.setState({isLoaded: true});
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.setState({isMechanicLogin: true});
    } else {
      this.setState({isMechanicLogin: false});
    }
  };
  async componentDidMount() {
    this.detectlogin();
    this.detectMechanicLogin();
  }
  isLogin = () => {
    if (this.state.isloggedin) {
      return <Bottomtabnavigator></Bottomtabnavigator>;
    } else if (this.state.isMechanicLogin) {
      return <MechanicTab></MechanicTab>;
    } else {
      return <AppNavigator></AppNavigator>;
    }
  };

  render() {
    return <View style={styles.container}>{this.isLogin()}</View>;
  }

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}

AppRegistry.registerComponent('Driver', () => Point);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
