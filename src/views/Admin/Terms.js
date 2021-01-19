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

export default class Terms extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      dataSource: '',
    };
  }

  componentDidMount() {
    this.showterms();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.showterms();
    });
    // this.removeBooking();
  }

  showterms = async () => {
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
                  <Text style={[text.heading1, text.bold]}>
                    Terms of Services
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={[appStyle.bodyBg,appStyle.headingLayout]}>
          <ScrollView style={[style.h70]} >
           
                <View style={style.mv10}>
                  <Text style={[text.heading2,text.center]}> Important points</Text>
                </View>
                <View>
                  <Text style={text.textbody}>
                    Privacy Policy Muhammad Umer Fareed & Hassan Ahmed built the
                    Mechanic finder app as an Open Source app. This SERVICE is
                    provided by Hassan Ahmed at no cost and is intended for use
                    as is. This page is used to inform visitors regarding my
                    policies with the collection, use, and disclosure of
                    Personal Information if anyone decided to use my Service. If
                    you choose to use my Service, then you agree to the
                    collection and use of information in relation to this
                    policy. The Personal Information that I collect is used for
                    providing and improving the Service. I will not use or share
                    your information with anyone except as described in this
                    Privacy Policy. The terms used in this Privacy Policy have
                    the same meanings as in our Terms and Conditions, which is
                    accessible at Mechanic finder unless otherwise defined in
                    this Privacy Policy. Information Collection and Use For a
                    better experience, while using our Service, I may require
                    you to provide us with certain personally identifiable
                    information, including but not limited to Hassan. The
                    information that I request will be retained on your device
                    and is not collected by me in any way. The app does use
                    third party services that may collect information used to
                    identify you. Link to privacy policy of third party service
                    providers used by the app Google Play Services Log Data I
                    want to inform you that whenever you use my Service, in a
                    case of an error in the app I collect data and information
                    (through third party products) on your phone called Log
                    Data. This Log Data may include information such as your
                    device Internet Protocol (“IP”) address, device name,
                    operating system version, the configuration of the app when
                    utilizing my Service, the time and date of your use of the
                    Service, and other statistics. Cookies Cookies are files
                    with a small amount of data that are commonly used as
                    anonymous unique identifiers. These are sent to your browser
                    from the websites that you visit and are stored on your
                    device's internal memory. This Service does not use these
                    “cookies” explicitly. However, the app may use third party
                    code and libraries that use “cookies” to collect information
                    and improve their services. You have the option to either
                    accept or refuse these cookies and know when a cookie is
                    being sent to your device. If you choose to refuse our
                    cookies, you may not be able to use some portions of this
                    Service. Service Providers I may employ third-party
                    companies and individuals due to the following reasons: To
                    facilitate our Service; To provide the Service on our
                    behalf; To perform Service-related services; or To assist us
                    in analyzing how our Service is used. I want to inform users
                    of this Service that these third parties have access to your
                    Personal Information. The reason is to perform the tasks
                    assigned to them on our behalf. However, they are obligated
                    not to disclose or use the information for any other
                    purpose. Security I value your trust in providing us your
                    Personal Information, thus we are striving to use
                    commercially acceptable means of protecting it. But remember
                    that no method of transmission over the internet, or method
                    of electronic storage is 100% secure and reliable, and I
                    cannot guarantee its absolute security. Links to Other Sites
                    This Service may contain links to other sites. If you click
                    on a third-party link, you will be directed to that site.
                    Note that these external sites are not operated by me.
                    Therefore, I strongly advise you to review the Privacy
                    Policy of these websites. I have no control over and assume
                    no responsibility for the content, privacy policies, or
                    practices of any third-party sites or services. Children’s
                    Privacy These Services do not address anyone under the age
                    of 13. I do not knowingly collect personally identifiable
                    information from children under 13. In the case I discover
                    that a child under 13 has provided me with personal
                    information, I immediately delete this from our servers. If
                    you are a parent or guardian and you are aware that your
                    child has provided us with personal information, please
                    contact me so that I will be able to do necessary actions.
                    Changes to This Privacy Policy I may update our Privacy
                    Policy from time to time. Thus, you are advised to review
                    this page periodically for any changes. I will notify you of
                    any changes by posting the new Privacy Policy on this page.
                    This policy is effective as of 2021-01-20 Contact Us If you
                    have any questions or suggestions about my Privacy Policy,
                    do not hesitate to contact me at
                    SmartAutoMechanicFinder@gmail.com. This privacy policy page
                    was created at privacypolicytemplate.net and
                    modified/generated by App Privacy Policy Generator
                  </Text>
                </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
