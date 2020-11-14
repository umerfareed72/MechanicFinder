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
  Keyboard,
  Button,
  Platform,
  Alert,
} from 'react-native';
const axios = require('axios');
import {
  URL,
  colors,
  screenHeight,
  screenWidth,
  images,
} from '../../config/Constant';
import {Animated} from 'react-native';

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


export default class MechanicTerms extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {


      dataSource:'',


  }
  }

  componentDidMount() {
   
    this.showterms();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this.showterms();
    });
    // this.removeBooking();
  }

  showterms = async() => {
    // AsyncStorage.getItem('userId')
    //   .then((res) => {
    //     const id = JSON.parse(res);
    //     this.setState({userId: id});

    // AsyncStorage.getItem('usersignintoken').then((res) => {
    //   this.setState({token: res});
    //   console.log(this.state.token);
    //   axios
    //     .get(URL.Url + 'me', {
    //       headers: {
    //         'x-access-token': this.state.token,
    //       },
    //     })
    //     .then((response) => {
    //       this.setState({userdbid: response.data.userid}).catch((error) => {
    //         console.log(error);
    //       });
    //     });
    // });

    console.log(this.state.userdbid);
    console.log('in showissuesC');
    await axios
      .get(URL.Url + 'Cterms')
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        }
           this.setState({dataSource: response.data});
          console.log(this.state.dataSource);
       
      })
     
      .catch((error) => {
        console.log('ye lo 1', error);
      });
   
  };


  render() {
    return (
      <SafeAreaView style={appStyle.safeAreaHeight}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}></StatusBar>

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
                  <Text style={[text.heading1, text.bold]}>Terms of Services</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={style.bodycontainer5}>
            <View style={[appStyle.bodyBg]}>
              <ScrollView style={style.mb50}>
                <View style={style.mh15}>
                  <View style={style.mv10}>
                    <Text style={text.heading2}></Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        text.heading2,
                        style.asCenter,
                      text.greyRegular
                      ]}>
                      Important points
                    </Text>
                  </View>
                  <View>
                    <Text style={text.textbody}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore erat, sed diam voluptua. At vero eos et accusam
                      et justo duo dolores et ea rebum. Stet clita kasd
                      gubergren, no sea takimata sanctus est Lorem ipsum dolor
                      sit amet. Lorem ipsum dolor sit amet, consetetur
                      sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam
                      voluptua. At vero eos et accusam et justo duo dolores et
                      ea rebum. Stet
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}