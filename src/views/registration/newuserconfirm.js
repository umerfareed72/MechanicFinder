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
import {connect} from 'react-redux';

class Newuserconfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',

      gettingLoginStatus: true,
      user_name: '',
      // Bussinessid: '',
      token: '',
      // FacebookPageId: '',
      profile_pic: '',
      code: this.props.navigation.getParam('code'),
      email: this.props.navigation.getParam('email'),
      newcode:'',
      code: '',
      Email: '',
   
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
  number = () => {
    this.setState({ newcode : Math.trunc(Math.random()*100000).toString()})
      console.log("code",this.state.newcode)
  }

  sendemail = () => {  
    try {
      axios.post(URL.Url + 'sendemail',{
        email:this.state.email,
        code:this.state.newcode
      }).then((res) => {
        console.log(res.data);
        ToastAndroid.show(
          'Email Resent Successfully',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      });
    } catch (error) {
      console.log(error);
      return (
        <View style={[style.aiCenter]}>
          <ActivityIndicator color="#bc2b78" size="large"></ActivityIndicator>
        </View>
      );
    }
  };

  resend = () => {
    console.log("in resend code");
    axios
    .put(URL.Url + 'resendcode', {
      email:this.state.email,
      code: this.state.newcode
    })
    .then((response) => {
      console.log(response.data);
      ToastAndroid.show(
        'Code Updated Successfully',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    }).then(()=>{this.setState({code:this.state.newcode})})
    this.sendemail();
  };
    
  validateuser = () => {
    if (this.state.code == '') {
      ToastAndroid.show(
        'Code is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  async componentDidMount() {
    const {navigation} = this.props;
   this.number();
    this.focusListener = navigation.addListener('didFocus', () => {
      
      this.number();
      
    });
  }

  submitData = () => {
    {
      this.validateuser();
      if (this.state.code === this.props.auth.user.code) {
        axios
          .put(URL.Url + 'confirmuser', {
            email: this.props.auth.user.email,
            econfirm: true,
          })
          .then((res) => {
            console.log('resss', res);
            try {
              if (res.data.message == 'confirm') {
                ToastAndroid.show('Email Confirmed', ToastAndroid.BOTTOM);
                this.props.navigation.navigate('LoginasMechanic');
              } else {
                ToastAndroid.show('Email Not Confirmed', ToastAndroid.BOTTOM);
              }
            } catch (e) {
              console.log('error hai', e);
              Alert.alert('Invalid some');
            }
          })
          .catch((error) => {
            console.log('error1', error);

            console.log(error);
            ToastAndroid.show('Invalid Api', ToastAndroid.BOTTOM);
          });
      } else {
        ToastAndroid.show('Invalid code', ToastAndroid.BOTTOM);
      }
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
                    (Welcom to our App)
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <View style={[appStyle.bodyBg]}>
              <View style={[appStyle.headingLayout]}>
                <Text style={[text.heading2]}>Confirm your email</Text>
              </View>
              <View>
                <View style={[style.w80, style.asCenter, style.mv30]}>
                  <Text style={[text.center, text.heading2Gray]}>
                    Code is send to your email!Please verify your email
                  </Text>
                </View>
                <View style={[input.textinputcontainer]}>
                  <Image source={images.key} style={image.InputImage}></Image>
                  <TextInput
                    onFocus={this.changeheight}
                    style={input.textinputstyle}
                    placeholder="Code"
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                      this.setState({
                        code: text,
                      });
                    }}
                    secureTextEntry={false}
                    underlineColorAndroid="transparent"></TextInput>
                </View>
                {/* <View style={[style.pv10, style.ph30]}>
                  <Text
                    onPress={this.resend}
                    style={[text.right, text.text14, {color: colors.link}]}>
                    Resend code
                  </Text>
                </View> */}

                <TouchableOpacity onPress={this.submitData}>
                  <View style={[button.buttoncontainer, style.mt20]}>
                    <Text
                      style={[
                        button.touchablebutton,
                        {color: colors.darkBlue},
                      ]}>
                      Submit
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Newuserconfirm);
