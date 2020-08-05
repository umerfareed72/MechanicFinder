import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  AppRegistry,
  AsyncStorage,
  StatusBar,
} from 'react-native';

import AppNavigator from './src/navigations/AppNavigator';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {hasToken: false, isLoaded: false};
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.setState({isLoaded: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }

  _handleLoadingError = error => {
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
