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
  Button,
} from 'react-native';
import {colors, screenHeight, screenWidth,URL, images} from '../../config/Constant';
import LinearGradient from 'react-native-linear-gradient';
const axios = require('axios');
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
  updatepass = () => {
    console.log('in m updatepass')
    axios
      .put(URL.Url + 'mforgetpass', {  
        nickname:this.state.nickname,
        npassword: this.state.newpassword,
        email:this.state.email
      })
      .then(async (res) => { 
        console.log(res.data);
        Alert.alert('password updated Successfully!');
        try {
          this.props.navigation.navigate('Login');
        } catch (e) {
          console.log('error hai', e);
        }
      })
      .catch((error) => {
        Alert.alert('Wrong Email or Nickname !!');

        console.log(error);
      });
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
                <View style={[input.textinputcontainer, style.mv10]}>
                  <Image source={images.user} style={image.InputImage}></Image>
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
                <View style={[input.textinputcontainer, style.mv5]}>
                    <Image source={images.key} style={image.InputImage}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Enter New Password"
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        this.setState({
                          newpassword: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
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
