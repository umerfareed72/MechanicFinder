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
Alert,ToastAndroid,
  Button,
} from 'react-native';
import {colors, screenHeight, screenWidth,URL, images} from '../../config/Constant';
const axios = require('axios');
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
      nickname:'',
      newpassword:'',
      email:''
    };
  }

  validatefield = () => {
    if (this.state.email == '') {
      ToastAndroid.show(
        'Email Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.nickname == '') {
      ToastAndroid.show(
        'Nickname Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.newpassword == '') {
      ToastAndroid.show(
        'New Password Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } 
    return true;
  };


  updatepass = () => {
    if (this.validatefield()){console.log('in updatepass')
    axios
      .put(URL.Url + 'forgetpass/', {
        nickname:this.state.nickname,
        npassword: this.state.newpassword,
        email:this.state.email
      })
      .then(async (res) => { 
        console.log(res.data);
        
        ToastAndroid.show(
          'password updated Successfully!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        try {
          this.props.navigation.navigate('Login');
        } catch (e) {
          console.log('error hai', e);
        }
      })
      .catch((error) => {
        ToastAndroid.show(
          'Wrong Email or Nickname !!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );

        console.log(error);
      });}
    
  };


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
                  Enter your nickname and new password to reset your password.
                </Text>
              </View>
              <View>
                <View style={[input.textinputcontainer, style.mv10]}>
                  <Image source={images.email} style={image.InputImage}></Image>
                  <TextInput
                    style={input.textinputstyle}
                    placeholder="Email"
                    underlineColorAndroid="transparent"
                      onChangeText={(text) => {
                          this.setState({
                            email: text,
                          });
                        }}
                        multiline={true}
                      
                    />
                </View>
              </View>
              <View>
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
              </View>
              <View>
              <View style={[input.textinputcontainer, style.mv5]}>
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
                  </View>
                  
                  </View>
              <TouchableOpacity onPress={
                this.updatepass
                }>
                <View style={[button.buttoncontainer, style.mv10]}>
                  <Text
                    style={[button.touchablebutton, {color: colors.darkBlue}]}>
                    Reset
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={()=>{this.props.navigation.navigate('Login')}}
                >
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
