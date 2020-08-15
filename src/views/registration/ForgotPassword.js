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

  Button,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';

import LinearGradient from 'react-native-linear-gradient';

import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appstyle from '../../assets/styles/appStyle';
export default class Login extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      // params: params,
    };
  }

  render() {
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <KeyboardAvoidingView style={{backgroundColor: colors.white,flexGrow:1}}>
          
          <ScrollView>
            <View>
              <LinearGradient
                colors={colors.orablu}
                start={{x: -0.9, y: 1}}
                end={{x: 1, y: 0}}
                style={[style.headerHeight1]}>
                <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                  <Image source={images.logoDark} style={[image.splashImg]} />
                </View>
              </LinearGradient>
            </View>
            <View style={[appstyle.bodyBg]}>
              <View style={[appstyle.headingLayout]}>
                <Text style={[style.headerStyle]}>Forgot Password</Text>
              </View>
              <View style={[style.mh20]}>
                <Text style={[text.text14, text.center, {color: colors.gray}]}>
                  Enter email registered at Nohalt to get email for resetting
                  password
                </Text>
              </View>
              <View>
                <View style={[input.textinputcontainer, style.mv30]}>
                  <Image source={images.email} style={image.InputImage}></Image>
                  <TextInput
                    style={input.textinputstyle}
                    placeholder="Email"
                    underlineColorAndroid="transparent"></TextInput>
                </View>
              </View>
              <TouchableOpacity>
                <View style={[button.buttoncontainer, style.mv10]}>
                  <Text
                    style={[button.touchablebutton, {color: colors.darkBlue}]}>
                    Reset
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}>
                <View
                  style={[
                    button.buttoncontainer,
                    style.mv30,
                    {backgroundColor: colors.purple},
                  ]}>
                  <Text
                    style={[
                      {color: colors.white},
                      button.touchablebutton,
                      text.semibold,
                    ]}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
