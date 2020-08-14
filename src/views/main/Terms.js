import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  AsyncStorage,
  Button,
  TouchableNativeFeedbackBase,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';

import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
var FloatingLabel = require('react-native-floating-labels');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appStyle from '../../assets/styles/appStyle';
import {Calendar} from 'react-native-calendars';
import QRCode from 'react-native-qrcode-svg';
import appColors from '../../assets/styles/appColors';

export default class Terms extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <SafeAreaView style={appStyle.safeAreaHeight}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}></StatusBar>

        <View>
          <View style={{}}>
            <LinearGradient
              colors={colors.orablu}
              start={{x: -0.9, y: 1}}
              end={{x: 1, y: 0}}
              style={{height: screenHeight.height25}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={[image.headerBackArrow]}>
                <Image
                  style={[image.backArrow]}
                  source={images.backArrow}></Image>
              </TouchableOpacity>
              <View style={[appStyle.headInner]}>
                <View style={[]}>
                  <Text style={[text.heading1, text.bold]}>Terms</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={style.bodycontainer5}>
            <View style={[appStyle.bodyBg]}>
              <ScrollView style={style.mb50}>
                <View style={style.mh15}>
                  <View style={style.mv10}>
                    <Text style={text.heading2}>Terms of Service</Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        text.heading2,
                        style.asCenter,
                        appColors.greyRegular,
                      ]}>
                      Some heading Here
                    </Text>
                  </View>
                  <View>
                    <Text style={text.textbody}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore erat, sed diam voluptua. At vero eos et accusam
                      et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
