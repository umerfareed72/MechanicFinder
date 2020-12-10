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
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

  const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
  }

  const persistedReducer = persistReducer(persistConfig, RootReducers)
  const store=createStore(persistedReducer,compose(applyMiddleware(thunk)))
  if(AsyncStorage.usertoken){
    store.dispatch(set_CurrentUser(jwt(AsyncStorage.usertoken)))
    }
  
  let persistor = persistStore(store)
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
    const token = await AsyncStorage.getItem('usertoken');
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
  // if(store.getState().auth.isAuthenticated==false){
    // }
  }

  render() {
    console.log(store.getState().auth.user)
   const user=store.getState().auth.user
    if (this.state.isloggedin && user.role=="User") {
      return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
  <Bottomtabnavigator></Bottomtabnavigator>
</PersistGate>
</Provider>
        );
    } else if (this.state.isMechanicLogin && user.role=="Mechanic") {
      return <MechanicTab></MechanicTab>;
    } 
    
  return(<Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
    <AppNavigator></AppNavigator>
</PersistGate>
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
