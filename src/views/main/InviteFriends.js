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
  Platform,
 
  KeyboardAvoidingView,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';

import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import Textarea from 'react-native-textarea';
import StarRating from 'react-native-star-rating';
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class InviteFriends extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  render() {
    return (
         <SafeAreaView style={style.flex1}>
      
      <StatusBar translucent={true} backgroundColor={'transparent'} />

<KeyboardAvoidingView style={{backgroundColor: colors.white,flexGrow:1}}>
  <ScrollView>

      
        {/*Body */}
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height30}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>
            <View style={text.headertextstyle}>
                <Text style={text.textheader1}>Inivite Friends </Text>
              </View>      
           </LinearGradient>
        </View>

        <View style={[appStyle.bodyBg]}>
<View style={style.mh10}>
          <View>
                    <Text style={text.smallheader}>Invite Your Friends</Text>
                  </View>
                  <View style={style.pt10}>
                    <Text style={text.text22}>Invite Your Friend To Get 20$</Text>
                  </View>
                  <View >
                    <Text style={text.textbody}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                      diam nonumy eirmod tempor invidunt ut labore et dolore magna
                      aliquyam erat, sed diam
                  </Text>
                  </View>
                
           
         
              <View style={[appStyle.headingLayout]}>
                <View style={[appStyle.rowAlignCenter, style.mv10]}>
                  <Image
                    style={[image.emailIcon]}
                    source={images.email}
                  />
                  <Text style={[text.heading6, {color: colors.gray}]}>
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
              <View style={[style.mt20]}>
              <View style={style.row}>
            <View style={text.mediumtextcontainer}>
              <Text style={text.sharetext}>Copy your Link</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}>
              <View
                style={[
                  button.buttoncontainer
                ]}>
                <Text
                  style={[
                    button.sharebutton
                  ]}>
                  Book Now
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          </View>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
  

    );
  }
}



