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
  TouchableNativeFeedbackBase,ToastAndroid
} from 'react-native';
import {colors, URL, screenHeight, screenWidth, images} from '../../config/Constant';
import Textarea from 'react-native-textarea';
const axios = require('axios');
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
import AsyncStorage from '@react-native-community/async-storage';

export default class MechanicHelp extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state={
      message:'',
      question:'',
      userid:'',
      userdata:'',
    }
  }

  componentDidMount = () => {
   this.getdata();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
     
      this.getdata();
     });
  };

  getdata = () => {
    AsyncStorage.getItem('Mechanicdata').then((res) => {
      
      this.setState({userdata: JSON.parse(res)});
      this.setState({userid:this.state.userdata._id})
      console.log('userid',this.state.userid)
      console.log('userpoto',this.state.userdata.photo)
      
      
    })
     
    }


  submithelp = () => {
    axios
      .post(URL.Url + 'mhelp', {  
        question: this.state.question,
        message: this.state.message,
        userid:this.state.userid,
        userimage:this.state.userdata.photo
      })
      .then(async (res) => {
        console.log(res);
        console.log(res.data);
        try {
          ToastAndroid.show('Question sent successfully!', ToastAndroid.BOTTOM);
          this.props.navigation.navigate('MechanicDashboard');
        } catch (e) {
          console.log('error hai', e);
        }
      })
      .catch((error) => {
        Alert.alert('something went Wrong!!');

        console.log(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

<KeyboardAvoidingView >
  <ScrollView>

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
                <Text style={text.heading2}>Fill here for help</Text>
              </View>

              <View style={[input.textinputcontainer,style.mv10]}>
                <Image source={images.Question} style={[image.drawerIcon,{tintColor:colors.gray}]}></Image>
                <TextInput
                  onFocus={this.changeheight}
                  onChangeText={(text) => {
                    this.setState({
                      question: text,
                    });
                  }}
                  style={input.textinputstyle}
                  placeholder="Subject"
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View style={[style.mh30]}>
                <View style={[appStyle.rowAlignCenter, style.mv10]}>
                  <Image
                    style={[image.emailIcon]}
                    source={images.email}
                  />
                  <Text style={[ {color: colors.gray}]}>
                    Message
                  </Text>
                </View>
                <View style={[appStyle.textareaBorder]}>
                  <Textarea
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => {
                      this.setState({
                        message: text,
                      });
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={this.submithelp}>
                <View style={[button.buttoncontainer, style.mv30]}>
                  <Text
                    style={[button.touchablebutton, {color: colors.darkBlue}]}>
                   Submit mechanics
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
 </ScrollView>
 </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
