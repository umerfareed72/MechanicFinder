import io from 'socket.io-client';

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
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../../config/Constant';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import AutoScroll from 'react-native-auto-scroll';
import appStyle from '../../assets/styles/appStyle';
import {connect} from 'react-redux';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
      name: '',
    };
  }

  componentDidMount() {
    this.socket = io(URL.Url);
    this.socket.on('chat message', (msg) => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }

  submitChatMessage = () => {
    this.socket.emit(
      'chat message',
      this.props.auth.user.firstname + ' '+":" + this.state.chatMessage,
    );
    this.setState({chatMessage: ''});
  };

  render() {
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
              {this.state.chatMessages.map((msg) => {
                return (
                  <View style={appStyle.chatcontainerleft}>
                    <View style={[style.mh10]}>
                      <Text style={[text.leftchatstyle]}>{msg}</Text>
                    </View>
                  </View>
                );
              })}
            </AutoScroll>
          </View>
          <View style={[button.buttoncontainer, {borderColor: colors.white}]}>
            <View style={style.row}>
              <View style={style.flex2}>
                <TextInput
                  style={[text.textlabel15]}
                  autoCorrect={false}
                  value={this.state.chatMessage}
                  onSubmitEditing={this.submitChatMessage}
                  onChangeText={(chatMessage) => {
                    this.setState({chatMessage});
                  }}
                />
              </View>
              <TouchableOpacity
                style={(style.flex1, style.row)}
                onPress={this.submitChatMessage}>
                <Image
                  source={images.arrowright}
                  style={[image.insidebox]}></Image>
              </TouchableOpacity>
            </View>
          </View>
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

export default connect(mapStateToProps, null)(ChatBox);
