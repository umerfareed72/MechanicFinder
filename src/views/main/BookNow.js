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

export default class BookNow extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.onDayPress = this.onDayPress.bind(this);
    this.state = {
      slots: [
        {time: '11:30', id: 1},
        {time: '11:00', id: 2},
        {time: '14:30', id: 3},
        {time: '15:00', id: 4},
        {time: '14:30', id: 5},
        {time: '15:00', id: 6},
        {time: '18:00', id: 7},
        {time: '18:30', id: 8},
      ],
      slot: '',
      defaultcolor: '#EAEEF6',
      darkcolor: colors.darkBlue,
      white: colors.white,
      black: colors.black,
    };
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString,
    });
  }
  changebuttoncolor = (id) => {
    this.setState({
      slot: id,
    });
  };
  changetextcolor = (id) => {
    this.setState({
      slot: id,
    });
  };

  render() {
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={"light-content"} backgroundColor={'transparent'} />
               
        <KeyboardAwareScrollView style={{backgroundColor: colors.white}}>
          <View>
            <ImageBackground source={images.beef} style={style.HeaderHeight3}>
            <View style={style.bgOverlay}/>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('HomeDetail')}
                style={[image.headerBackArrow]}>
                <Image
                  style={[image.backArrow]}
                  source={images.backArrow}></Image>
              </TouchableOpacity>

              <View style={text.headertextstyle}>
                <Text style={text.heading1}>Restaurant Name</Text>
              </View>
            </ImageBackground>
            <View>
              <View style={[appStyle.bodyBg]}>
                <View style={[style.mh10]}>
                <View style={[appStyle.headingLayout]}>
                  <Text style={text.textHeader2}>Select Date & Time</Text>
                </View>

                <View style={appStyle.CalenderContainer}>
                  <Calendar
                    onDayPress={this.onDayPress}
                    markedDates={{[this.state.selected]: {selected: true}}}
                    theme={{
                      selectedDayBackgroundColor: colors.darkyellow,
                    }}
                    markingType={'custom'}
                    renderArrow={(direction) => {
                      if (direction == 'left')
                        return (
                          <Image
                            source={images.leftarrow}
                            style={image.leftimage}
                          />
                        );
                      if (direction == 'right')
                        return (
                          <Image
                            source={images.rightarrow}
                            style={image.rightimage}></Image>
                        );
                    }}></Calendar>
                </View>
                <View>
                  <Text style={text.heading3}>Slots Available</Text>
                </View>
                <View style={[style.choiceLabelRow, appStyle.borderContainer]}>
                  {this.state.slots.map((item, key) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.changebuttoncolor(item.id)}
                        style={[
                          style.choiceLabelCol,
                          {
                            backgroundColor:
                              item.id == this.state.slot
                                ? this.state.darkcolor
                                : this.state.defaultcolor,
                          },
                        ]}
                        activeOpacity={1}>
                        <Text
                          style={[
                            style.choiceLabel,
                            {
                              color:
                                item.id == this.state.slot
                                  ? this.state.white
                                  : this.state.black,
                            },
                          ]}
                          onPress={() => this.changetextcolor(item.id)}>
                          {item.time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={appStyle.borderContainer}>
                  <Text style={[text.heading3]}>Address</Text>

                  <TextInput
                    style={[text.textheader4]}
                    placeholder="Some Address text Here"></TextInput>
                </View>
                <View style={appStyle.borderContainer}>
                  <View>
                    <TextInput
                      style={[text.textheader5]}
                      placeholder="Number of Persons"></TextInput>
                  </View>
                </View>
                <View style={[appStyle.rowJustify,style.mv20]}>
                  <View >
                    <Text>Price Per Person $33</Text>
                  </View>
                  <View >
                    <Text> Total: $61</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('QrCode');
                  }}>
                  <View
                    style={[
                      style.mv10,
                      button.buttoncontainer,
                      button.bookbuttoncontainer,
                    ]}>
                    <Text style={[button.touchablebutton, button.bookbutton]}>
                      Book Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
