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

export default class LoginAsAdmin extends Component {
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
  
  submitData = () => {
    console.log('in admin submit');
    axios
      .post(URL.Url + 'adminsignin', {
        email: this.state.Email,
        password: this.state.Password,
      })
      .then(async (res) => {
        console.log(res.data);

        try {
          
          console.log(res.data.token);
          this.props.navigation.navigate('AdminStack');
        } catch (e) {
          console.log('error hai', e);
          Alert.alert('Invalid email password');
        }
      });
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
                    (Admin)
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
                  <View style={[button.buttoncontainer, style.mt40]}>
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

         
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
