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
  Alert,
  ToastAndroid,
  Button,
} from 'react-native';
import {
  colors,
  screenHeight,
  screenWidth,
  URL,
  images,
} from '../../config/Constant';
const axios = require('axios');
import LinearGradient from 'react-native-linear-gradient';

import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appstyle from '../../assets/styles/appStyle';
export default class Mpasscode extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      // params: params,

      code: this.props.navigation.getParam('code', 'NO-ID'),
      userid: this.props.navigation.getParam('userid', 'NO-ID'),
      entercode: '',
    };
  }

  validatefield = () => {
    if (this.state.entercode == '') {
      ToastAndroid.show(
        'Code Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  updatepass = () => {
    if (this.validatefield()) {
      console.log('in updatepass');
      if (this.state.entercode == this.state.code) {
        try {
          console.log('userid ha kia', this.state.userid);
          this.props.navigation.navigate('Mnewpassword', {
            userid2: this.state.userid,
          });
        } catch (e) {
          console.log('error hai', e);
        }
      } else {
        ToastAndroid.show(
          'Code is invalid',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      }
      //   })
      //   .catch((error) => {
      //     ToastAndroid.show(
      //       'Wrong Email or Nickname !!',
      //       ToastAndroid.BOTTOM,
      //       ToastAndroid.LONG,
      //     );

      //     console.log(error);
      //   });
    }
  };
  componentDidMount() {
    console.log('code', this.state.code);
    console.log('cpass userid', this.state.userid);
  }

  render() {
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <KeyboardAvoidingView
          style={{backgroundColor: colors.white, flexGrow: 1}}>
          <ScrollView>
            <View>
              <LinearGradient
                colors={colors.orablu}
                start={{x: -0.9, y: 1}}
                end={{x: 1, y: 0}}
                style={[style.headerHeight2]}>
                <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                  <Image source={images.help} style={[image.splashImg]} />
                </View>
              </LinearGradient>
            </View>
            <View style={[appstyle.bodyBg]}>
              <View style={[appstyle.headingLayout]}>
                <Text style={[style.headerStyle]}>Forgot Password</Text>
              </View>
              <View style={[style.mh20]}>
                <Text style={[text.text14, text.center, {color: colors.gray}]}>
                  Enter code sent to your Email
                </Text>
              </View>
              <View>
                <View style={[input.textinputcontainer, style.mv10]}>
                  <Image source={images.key} style={image.InputImage}></Image>
                  <TextInput
                    keyboardType="numeric"
                    secureTextEntry={true}
                    style={input.textinputstyle}
                    placeholder="Code"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => {
                      this.setState({
                        entercode: text,
                      });
                    }}
                  />
                </View>
              </View>
              {/* <View>
                <View style={[input.textinputcontainer, style.mv10]}>
                  <Image source={images.username} style={image.InputImage}></Image>
                  <TextInput
                    style={input.textinputstyle}
                    placeholder="Nick Name"
                    underlineColorAndroid="transparent"
                      onChangeText={(text) => {
                          this.setState({
                            nickname: text,
                          });
                        }}
                        multiline={true}
                      
                    />
                </View>
              </View> */}
              <View>
                {/* <View style={[input.textinputcontainer, style.mv5]}>
                    <Image source={images.key} style={image.InputImage}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Enter Your New Password"
                      secureTextEntry={true}
                      onChangeText={(text) => {  
                        this.setState({
                          newpassword: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View> */}
              </View>
              <TouchableOpacity onPress={this.updatepass}>
                <View style={[button.buttoncontainer, style.mv10]}>
                  <Text
                    style={[button.touchablebutton, {color: colors.darkBlue}]}>
                    Next
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
                    Back to Login
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
