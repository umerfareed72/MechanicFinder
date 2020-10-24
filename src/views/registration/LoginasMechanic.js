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
  ToastAndroid,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
  height,
} from '../../config/Constant';
const axios = require('axios');
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appStyle from '../../assets/styles/appStyle';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Dashboard from '../main/Dashboard';

export default class Login extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      Uregister: colors.white,
      Mregister: colors.white,
      textUser: colors.black,
      textMechanic: colors.black,
      userInfo: null,
      Email: '',
      Password: '',
      error: '',

      gettingLoginStatus: true,
      user_name: '',
      // Bussinessid: '',
      token: '',
      // FacebookPageId: '',
      profile_pic: '',
    };
  }
  UserRegister = () => {
    this.setState({textUser: colors.white, Uregister: colors.orange});
    this.props.navigation.navigate('SignUp');
  };
  MechanicRegister = () => {
    this.setState({textMechanic: colors.white, Mregister: colors.orange});
    this.props.navigation.navigate('MechanicRegister');
  };
  validateuser = () => {
    if (this.state.Email == '') {
      ToastAndroid.show(
        'Email is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.Password == '') {
      ToastAndroid.show(
        'Password is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  submitData = () => {
  if(this.validateuser()){
    axios
      .post(URL.Url + 'mechanicsignin', {
        email: this.state.Email,
        password: this.state.Password,
      })
      .then(async (res) => {
        try {
          
        ToastAndroid.show('Successfully Login', ToastAndroid.BOTTOM);
          await AsyncStorage.setItem('token', res.data.token);
          console.log(res.data.token);
          this.props.navigation.navigate('mechanicStack');
        } catch (e) {
          console.log('error hai', e);
          Alert.alert('Invalid email password');
        }
      })
      .catch((error) => {
        ToastAndroid.show('Invalid Mechanic', ToastAndroid.BOTTOM);
      });
    }
  };

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
                style={[style.headerHeight4]}>
                <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                  <Text style={[text.Eutemia, text.white, text.text30]}>
                    Smart Auto Mechanic Finder
                  </Text>
                  <Text
                    style={[
                      text.text18,
                      text.CinzelDecorativeBold,
                      text.white,
                    ]}>
                    (Mechanic)
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <View style={[appStyle.bodyBg]}>
              <View style={[appStyle.headingLayout]}>
                <Text style={[style.headerStyle]}>Welcome</Text>
              </View>
              <View>
                <View style={[input.textinputcontainer, style.mv20]}>
                  <Image source={images.email} style={image.InputImage}></Image>
                  <TextInput
                    onFocus={this.changeheight}
                    style={input.textinputstyle}
                    placeholder="Email"
                    onChangeText={(text) => {
                      this.setState({
                        Email: text,
                      });
                    }}
                    underlineColorAndroid="transparent"></TextInput>
                </View>

                <View style={[input.textinputcontainer, style.mt20]}>
                  <Image source={images.key} style={image.InputImage}></Image>
                  <TextInput
                    onFocus={this.changeheight}
                    style={input.textinputstyle}
                    placeholder="Password"
                    onChangeText={(text) => {
                      this.setState({
                        Password: text,
                      });
                    }}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"></TextInput>
                </View>
                <View style={[style.pv10, style.ph30]}>
                  <Text
                    onPress={() => {
                      this.props.navigation.navigate('Forgot');
                    }}
                    style={[text.right, text.text14, {color: colors.link}]}>
                    Forgot Password
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={this.submitData}>
                  <View style={[button.buttoncontainer, style.mt20]}>
                    <Text
                      style={[
                        button.touchablebutton,
                        {color: colors.darkBlue},
                      ]}>
                      Login
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[style.asCenter, style.mt40]}>
                <Text style={[text.heading6]}>DO YOU HAVE AN ACCOUNT?</Text>
              </View>
              <View
                style={[
                  appStyle.rowBtw,
                  style.mh15,
                  style.mv10,
                  appStyle.bodyShadowTop,
                ]}>
                <TouchableOpacity
                  onPress={this.UserRegister}
                  style={[
                    {backgroundColor: this.state.Uregister},
                    appStyle.colLeft,
                  ]}>
                  <Text
                    style={[
                      style.asCenter,
                      text.heading3,
                      text.semibold,
                      {color: this.state.textUser},
                    ]}>
                    User
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.MechanicRegister}
                  style={[
                    appStyle.colRight,
                    {backgroundColor: this.state.Mregister},
                  ]}>
                  <Text
                    style={[
                      style.asCenter,
                      text.heading3,
                      text.semibold,
                      {color: this.state.textMechanic},
                    ]}>
                    Mechanic
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
