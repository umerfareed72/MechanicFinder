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
  TouchableNativeFeedbackBase,
  ToastAndroid,
} from 'react-native';
import {
  colors,
  URL,
  screenHeight,
  screenWidth,
  images,
} from '../../config/Constant';
import Textarea from 'react-native-textarea';
const axios = require('axios');
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
class Help extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      message: '',
      question: '',
    };
  }

  validatefield = () => {
    if (this.state.question == '') {
      ToastAndroid.show(
        'Subject Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.message == '') {
      ToastAndroid.show(
        'Message Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  submithelp = () => {
    if (this.validatefield()) {
      axios
        .post(URL.Url + 'uhelp', {
          question: this.state.question,
          message: this.state.message,
          userid: this.props.auth.user.userid,
          userimage: this.props.auth.user.photo,
        })
        .then(async (res) => {
          console.log(res);
          console.log(res.data);
          try {
            ToastAndroid.show(
              'Question sent successfully!',
              ToastAndroid.BOTTOM,
            );
          } catch (e) {
            console.log('error hai', e);
          }
        })
        .catch((error) => {
          Alert.alert('something went Wrong!!');

          console.log(error);
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <KeyboardAvoidingView>
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

                  <View style={[input.textinputcontainer, style.mv10]}>
                    <Image
                      source={images.Question}
                      style={[
                        image.drawerIcon,
                        {tintColor: colors.gray},
                      ]}></Image>
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
                      <Image style={[image.emailIcon]} source={images.email} />
                      <Text style={[{color: colors.gray}]}>Message</Text>
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

export default connect(mapStateToProps, null)(Help);
