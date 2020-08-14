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
import Textarea from 'react-native-textarea';

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

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <KeyboardAwareScrollView>
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
                    <Text style={[text.heading1, text.bold]}>Help</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View style={appStyle.bodyBg}>
              <View style={style.mh10}>
                <View style={style.mv10}>
                  <Text style={text.heading2}>Help</Text>
                </View>

                <View style={[input.textinputcontainer, style.mv10]}>
                  <Image
                    source={images.Question}
                    style={[image.roundCrossImg, style.mr10]}></Image>
                  <TextInput
                    onFocus={this.changeheight}
                    style={input.textinputstyle}
                    placeholder="Subject"
                    underlineColorAndroid="transparent"></TextInput>
                </View>

                <View style={[style.mh30]}>
                  <View style={[appStyle.rowAlignCenter, style.mv10]}>
                    <Image style={[image.emailIcon]} source={images.email} />
                    <Text style={[{color: colors.gray}]}>Message</Text>
                  </View>
                  <View style={[appStyle.textareaBorder]}>
                    <Textarea
                      placeholderTextColor={'#c7c7c7'}
                      underlineColorAndroid={'transparent'}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('');
                  }}
                  style={[button.btnThemeOutline, style.mt30]}>
                  <Text style={[text.btntext, text.text18, text.purple]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
