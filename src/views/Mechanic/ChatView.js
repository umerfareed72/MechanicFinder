import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
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

export default class ChatView extends React.Component {
  constructor(props) {
    super(props);

    this.handleSendMessage = this.onSendMessage.bind(this);
  }

  onSendMessage(e) {
    // (1)
    this.props.onSendMessage(e.nativeEvent.text);
    this.refs.input.clear();
  }

  render() {
    // (2)
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />

        <KeyboardAvoidingView style={{flexGrow: 1}}>
          <View>
            <LinearGradient
              colors={colors.orablu}
              start={{x: -0.9, y: 1}}
              end={{x: 1, y: 0}}
              style={[{paddingTop: 30}]}>
              <View style={style.aiCenter}>
                <View style={[style.row, style.mb10]}>
                  <View style={style.pr15}>
                    <Image
                      source={images.logoSmall}
                      style={[image.Size50]}></Image>
                  </View>
                  <View style={style.jcCenter}>
                    <Text style={[text.goodfishbd, text.text18, text.white]}>
                      Smart Auto Mechanic Finder
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={[style.flex2]}>
            <AutoScroll>
              <FlatList
                data={this.props.messages}
                renderItem={this.renderItem}
              />
            </AutoScroll>
          </View>
          <View style={[button.buttoncontainer, {borderColor: colors.white}]}>
            <TextInput
              autoFocus
              keyboardType="default"
              returnKeyType="done"
              enablesReturnKeyAutomatically
              style={[text.textlabel15]}
              blurOnSubmit={false}
              onSubmitEditing={this.handleSendMessage}
              ref="input"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      /*     
          <KeyboardAvoidingView style={styles.container} behavior="padding">

                         </KeyboardAvoidingView> */
    );
  }

  renderItem({item}) {
    // (3)
    const action = item.action;
    const name = item.name;
    if (action == 'message') {
      return (
        <View style={appStyle.chatcontainerleft}>
 <View style={[style.mh10]}>
                    <Text style={[text.leftchatstyle]}>
                 
          {name}: {item.message}
        </Text>
        </View>
        </View>
      );
    }
  }
}
