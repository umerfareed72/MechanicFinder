import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  AppRegistry,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import stores from '../MechanicFinderfyp1/src/reducers/store';
import MainComponent from './src/MainComponent';
import AsyncStorage from '@react-native-community/async-storage';

const { store } = stores();
if (AsyncStorage.usertoken) {
  store.dispatch(set_CurrentUser(jwt(AsyncStorage.usertoken)));
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainComponent></MainComponent>
      </Provider>
    );
  }

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

AppRegistry.registerComponent('Driver', () => Point);
