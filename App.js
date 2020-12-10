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
import jwt from "jwt-decode"
import {Provider} from "react-redux"
import {  createStore,applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import {set_CurrentUser} from "./src/actions/index"
import RootReducers from "./src/reducers/RootReducers"
const store=createStore(RootReducers,compose(applyMiddleware(thunk)))
if(AsyncStorage.usertoken){
  store.dispatch(set_CurrentUser(jwt(AsyncStorage.usertoken)))
  }
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

  render() {
    console.log(store.getState().auth.user)
    if (this.state.isloggedin) {
      return <Bottomtabnavigator></Bottomtabnavigator>;
    } else if (this.state.isMechanicLogin) {
      return <MechanicTab></MechanicTab>;
    } 
    // else {
    //   return <AppNavigator></AppNavigator>;
    // }
  return(<Provider store={store}>
    <AppNavigator></AppNavigator>
  </Provider>
  )
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
