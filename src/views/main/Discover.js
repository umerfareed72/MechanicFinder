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

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      // params: params,
    };
  }

  render() {
    return (
      <SafeAreaView style={appStyle.safeAreaHeight}>
         <StatusBar translucent={true} backgroundColor={'transparent'} />
            
        <View>
          <View>
            <LinearGradient
              colors={colors.orablu}
              start={{x: -0.9, y: 1}}
              end={{x: 1, y: 0}}
              style={[style.headerHeight1]}>
              <View style={style.row}>
                <View style={[image.ovalcontainer]}>
                  <Image
                    source={images.camerdark}
                    style={image.mediumimagestyle}></Image>
                </View>

                <View style={[input.largeinputcontainer]}>
                  <TextInput
                    placeholder="First Name"
                    style={input.largeinputstyle}
                    placeholderTextColor={colors.white}></TextInput>
                  <TextInput
                    placeholder="Last Name"
                    style={input.largeinputstyle}
                    placeholderTextColor={colors.white}></TextInput>
                  <View style={text.textheader6}>
                    <Text style={text.textheader6}>Edit Photo</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={[style.bodycontainer4]}>
            <View style={[appStyle.bodyBg]}>
              <KeyboardAvoidingView
                behavior="height"
                keyboardVerticalOffset={300}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={style.mb20}>
                  <View style={[style.padding10]}>
                    <Text style={[text.mediumlabel]}>Edit</Text>
                  </View>
                  <View style={[appStyle.editbordercontainer]}>
                    <View style={style.row}>
                      <View style={[text.mediumtextcontainer]}>
                        <Text style={text.textheader4}>Phone Number</Text>
                      </View>
                      <View style={[input.mediuminputstyle]}>
                        <TextInput placeholder="0123456789"></TextInput>
                      </View>
                    </View>
                  </View>

                  <View style={[appStyle.editbordercontainer]}>
                    <View style={style.row}>
                      <View style={[text.mediumtextcontainer]}>
                        <Text style={text.textheader4}>Email</Text>
                      </View>
                      <View style={[input.mediuminputstyle]}>
                        <TextInput placeholder="info@rex_solution.com"></TextInput>
                      </View>
                    </View>
                  </View>
                  <View style={[appStyle.editbordercontainer]}>
                    <View style={style.row}>
                      <View style={[text.mediumtextcontainer]}>
                        <Text style={text.textheader4}>Password</Text>
                      </View>
                      <View style={[input.mediuminputstyle]}>
                        <TextInput placeholder="*********"></TextInput>
                      </View>
                    </View>
                  </View>

                  <View style={[appStyle.editbordercontainer]}>
                    <View style={style.row}>
                      <View style={[text.mediumtextcontainer]}>
                        <Text style={text.textheader4}>Gender</Text>
                      </View>
                      <View style={[input.mediuminputstyle]}>
                        <TextInput placeholder="Male"></TextInput>
                      </View>
                    </View>
                  </View>

                  <View style={[appStyle.editbordercontainer]}>
                    <View style={style.row}>
                      <View style={[text.mediumtextcontainer]}>
                        <Text style={text.textheader4}>Birthday</Text>
                      </View>
                      <View style={[input.mediuminputstyle]}>
                        <TextInput placeholder="00.00.0000"></TextInput>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Discover');
            }}>
            <View style={[button.buttoncontainer, style.mt20]}>
              <Text style={[button.touchablebutton, {color: colors.darkBlue}]}>
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
