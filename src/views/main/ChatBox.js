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
  AsyncStorage,
  Button,
  TouchableNativeFeedbackBase,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import Icon from 'react-native-vector-icons/AntDesign';
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
import AutoScroll from 'react-native-auto-scroll';

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <SafeAreaView style={style.flex1}>
         <StatusBar barStyle={"light-content"} backgroundColor={'transparent'} />
               
         <KeyboardAvoidingView style={{flexGrow: 1}}>
          <View>
            <LinearGradient
              colors={colors.orablu}
              start={{x: -0.9, y: 1}}
              end={{x: 1, y: 0}}
              style={[{paddingTop: 30}]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfile')}
                style={[image.headerBackArrow, style.pt15]}>
                <Image
                  style={[image.backArrow]}
                  source={images.backArrow}></Image>
              </TouchableOpacity>

              <View style={[style.row, style.mb10]}>
                <View style={[style.pl40]}>
                  <Image
                    source={images.logoSmall}
                    style={[image.Size50]}></Image>
                </View>

                <View style={[style.asCenter, style.ml10]}>
                  <Text style={[text.heading2, {color: colors.white}]}>
                    Rex_Solution
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={[style.flex2]}>
            <AutoScroll>
              <View style={appStyle.chatcontainerleft}>
                <View style={[image.smallovalcontainer]}>
                  <Image source={images.camerdark} style={image.tiny}></Image>
                </View>
                <View>
                  <View style={style.mh10}>
                    <Text style={[text.texttiny10]}>Today 5:32 pm</Text>
                  </View>
                  <View style={[style.mh10, ,]}>
                    <Text style={[text.leftchatstyle]}>
                      Hey there, Please provide the necessary data so that I
                      will start development. I would hardly take 1-2 weeks to
                      complete.{' '}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={appStyle.chatcontainerright}>
                <View>
                  <View style={style.mh10}>
                    <Text style={[text.texttiny10, style.asFlexEnd]}>
                      Today 5:32 pm
                    </Text>
                  </View>
                  <View style={[style.mh10]}>
                    <Text style={[text.rightchatstyle]}>
                      Sure. I will share it by tonight.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={appStyle.chatcontainerleft}>
                <View style={[image.smallovalcontainer]}>
                  <Image source={images.camerdark} style={image.tiny}></Image>
                </View>
                <View>
                  <View style={style.mh10}>
                    <Text style={[text.texttiny10]}>Today 5:32 pm</Text>
                  </View>
                  <View style={[style.mh10, ,]}>
                    <Text style={[text.leftchatstyle]}>
                      Thanks. I will do that then
                    </Text>
                  </View>
                </View>
              </View>
              <View style={appStyle.chatcontainerleft}>
                <View style={[image.smallovalcontainer]}>
                  <Image source={images.camerdark} style={image.tiny}></Image>
                </View>
                <View>
                  <View style={style.mh10}>
                    <Text style={[text.texttiny10]}>Today 5:32 pm</Text>
                  </View>
                  <View style={[style.mh10, ,]}>
                    <Text style={[text.leftchatstyle]}>
                      Thanks. I will do that then
                    </Text>
                  </View>
                </View>
              </View>
              <View style={appStyle.chatcontainerleft}>
                <View style={[image.smallovalcontainer]}>
                  <Image source={images.camerdark} style={image.tiny}></Image>
                </View>
                <View>
                  <View style={style.mh10}>
                    <Text style={[text.texttiny10]}>Today 5:32 pm</Text>
                  </View>
                  <View style={[style.mh10, ,]}>
                    <Text style={[text.leftchatstyle]}>
                      Thanks. I will do that then
                    </Text>
                  </View>
                </View>
              </View>

              <View style={appStyle.chatcontainerright}>
                <View>
                  <View style={style.mh10}>
                    <Text style={[text.texttiny10, style.asFlexEnd]}>
                      Today 5:32 pm
                    </Text>
                  </View>
                  <View style={[style.mh10]}>
                    <Text style={[text.rightchatstyle]}>
                      Let me know when you complete.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={appStyle.chatcontainerleft}>
                <View style={[image.smallovalcontainer]}>
                  <Image source={images.camerdark} style={image.tiny}></Image>
                </View>
                <View>
                  <View style={style.mh10}>
                    <Icon name="ellipsis1" size={22}></Icon>
                  </View>
                </View>
              </View>
            </AutoScroll>
          </View>
          <View>
            <View style={[button.buttoncontainer, {borderColor: colors.white}]}>
              <View style={style.row}>
                <View style={style.flex2}>
                  <TextInput
                    style={[text.textlabel12]}
                    placeholder="Type a Message"></TextInput>
                </View>
                <View style={(style.flex1, style.row)}>
                  <Image source={images.mic} style={[image.insidebox]}></Image>

                  <Image
                    source={images.arrowright}
                    style={[image.insidebox]}></Image>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
