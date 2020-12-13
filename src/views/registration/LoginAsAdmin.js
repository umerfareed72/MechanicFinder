import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ToastAndroid,
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
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';

import {connect} from 'react-redux';
import {adminlogin} from '../../actions/index';
class LoginAsAdmin extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      Uregister: colors.white,
      Mregister: colors.white,
      textUser: colors.black,
      textMechanic: colors.black,
      isLoading: false,
      Email: '',
      Password: '',
      error: '',
    };
  }

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
    if (this.validateuser()) {
      this.setState({isLoading: true});

      const data = {email: this.state.Email, password: this.state.Password};
      this.props
        .adminlogin(data)
        .then(async (res) => {
          try {
            ToastAndroid.show('Successfully Login', ToastAndroid.BOTTOM);
            this.props.navigation.navigate('AdminStack');
            this.setState({isLoading: false});
          } catch (e) {
            console.log('error hai', e);
            ToastAndroid.show('Invalid Email', ToastAndroid.BOTTOM);
          }
        })
        .catch((error) => {
          ToastAndroid.show('Invalid User', ToastAndroid.BOTTOM);
        });
    }
  };

  render() {
    if (this.props.auth.user != null && this.state.isLoading == false) {
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
                    <Image
                      source={images.email}
                      style={image.InputImage}></Image>
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

                  <TouchableOpacity
                    onPress={
                      // ()=>{this.props.navigation.navigate('AdminDashboard')}
                      this.submitData
                    }>
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
    } else {
      return (
        <SafeAreaView style={[appStyle.safeContainer]}>
          <StatusBar
            barStyle={'dark-content'}
            translucent={true}
            backgroundColor="transparent"></StatusBar>
          <View style={[style.flex1, style.jcCenter]}>
            <View style={[style.aiCenter]}>
              <ActivityIndicator
                color="#bc2b78"
                size="large"></ActivityIndicator>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {adminlogin})(LoginAsAdmin);
