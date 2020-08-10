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

export default class QrCode extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <SafeAreaView style={appStyle.safeAreaHeight}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View>
          <ImageBackground source={images.beef} style={appStyle.bodyHeight60}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>
            <View style={text.headertextstyle}>
              <Text style={text.textheader1}>Restaurant </Text>
            </View>
          </ImageBackground>
          <View style={style.bodycontainer3}>
            <View style={[appStyle.bodyBg]}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text style={text.smallheader}>Booking Name</Text>
                </View>
                <View style={[style.row,style.flex1]}>
                  <View style={[image.attachtextimageleft]}>
                    <Image
                      source={images.date}
                      style={[image.smallimagestyle]}></Image>
                    <Text style={text.textheader4}>Date</Text>
                  </View>
                  <View style={[image.attachtextimageright]}>
                    <Image
                      source={images.timing}
                      style={[image.smallimagestyle]}></Image>
                    <Text style={text.textheader4}>Timing</Text>
                  </View>
                </View>
                <View style={style.row}>
                  <View style={[image.attachtextimageleft]}>
                    <Image
                      source={images.dollar}
                      style={[image.smallimagestyle]}></Image>
                    <Text style={text.textheader4}>Price</Text>
                  </View>
                  <View style={[image.attachtextimageright]}>
                    <Image
                      source={images.location}
                      style={[image.smallimagestyle]}></Image>
                    <Text style={text.textheader4}>Address Text Here</Text>
                  </View>
                </View>
                <View style={style.padding10}>
                  <Text style={text.textheader3}>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo.
                  </Text>
                </View>
                <View style={[style.pb10]}>
                  <Text style={style.padding5}>Qr Code</Text>
                </View>

                <View style={[style.asCenter]}>
                  <QRCode
                    value="Just some string value"
                    logo={images.qrCode}
                    logoSize={30}
                    color={colors.black2B}
                    size={250}
                    logoBackgroundColor="transparent"
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
