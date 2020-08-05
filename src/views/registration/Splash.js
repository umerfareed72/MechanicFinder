import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {colors, images, screenHeight, screenWidth} from '../../config/Constant';
import image from '../../assets/styles/image';
import style from '../../assets/styles/style';

import text from '../../assets/styles/text';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  static navigationOptions = {
    header: null,
  };

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('splash');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <SafeAreaView style={[style.splashheight]}>
        <View style={[text.splashtext]}>
          <Image source={images.logoDark} style={[image.splashImg]} />
        </View>
      </SafeAreaView>
    );
  }
}
