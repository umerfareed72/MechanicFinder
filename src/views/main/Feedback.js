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
  TouchableNativeFeedbackBase,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import Textarea from 'react-native-textarea';

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

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <SafeAreaView >
         <StatusBar translucent={true} backgroundColor={'transparent'} />

<KeyboardAvoidingView style={{backgroundColor: colors.white,flexGrow:1}}>
  <ScrollView>

        <View>
          <View>
            <LinearGradient
              colors={colors.orablu}
              start={{x: -0.9, y: 1}}
              end={{x: 1, y: 0}}
              style={[style.headerHeight1]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={[image.headerBackArrow]}>
                <Image
                  style={[image.backArrow]}
                  source={images.backArrow}></Image>
              </TouchableOpacity>
              <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                <Image source={images.logoDark} style={[image.splashImg]} />
              </View>
              <View style={[text.tcbottomheading]}>
                <Text style={text.textheader1}>Give Feedback</Text>
              </View>
            </LinearGradient>
          </View>
          <View style={appStyle.bodyBg}>
            <View style={style.mh10}>
              <View style={style.mv10}>
                <Text style={text.mediumlabel}>Feedback</Text>
              </View>

              <View style={[input.textinputcontainer,style.mv10]}>
                <Image source={images.Subject} style={image.drawerIcon}></Image>
                <TextInput
                  onFocus={this.changeheight}
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
                  />
                </View>
              </View>
              <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("InviteFriends")}}>
                <View style={[button.buttoncontainer, style.mv30]}>
                  <Text
                    style={[button.touchablebutton, {color: colors.darkBlue}]}>
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
