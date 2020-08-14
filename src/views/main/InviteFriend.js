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
  AsyncStorage,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';

import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

export default class InviteFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}></StatusBar>

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
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1, text.bold]}>Invite Friends!</Text>
              </View>
              <View style={[appStyle.searchBg, style.mv10]}>
                <View style={[style.row, style.aiCenter]}>
                  <View>
                    <Image
                      style={[image.searchIcon]}
                      source={images.serach}></Image>
                  </View>
                  <View style={[style.flex1]}>
                    <TextInput
                      style={[appStyle.inputTheme1]}
                      placeholder="Search"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#fff"></TextInput>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        {/* <View style={[appStyle.bodyBg, appStyle.bodyHeight30]}> */}
        <View style={[appStyle.rowBtw, appStyle.bodyLayout, appStyle.bodyBg]}>
          <TouchableOpacity>
            <Text style={[text.heading2]}>Friends</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={[appStyle.bottomBorder]}></View> */}

        <ScrollView>
          {/* OverView Tab */}
          <View style={[{display: this.state.TabDataOverview}]}>
            <View
              style={[
                style.row,
                style.mv5,
                style.jcCenter,
                {width: screenWidth.width100 - 10},
              ]}>
              <View style={[{width: screenWidth.width20}]}>
                <Image
                  style={appStyle.listImg}
                  source={images.logoSmall}></Image>
              </View>
              <View
                style={[
                  style.jcCenter,
                  style.mh5,
                  {width: screenWidth.width40 + 35},
                ]}>
                <View style={[style.row]}>
                  <Text style={[text.heading2Gray, text.semibold]}>
                    Rex_Solution
                  </Text>
                </View>
                <View>
                  <Text style={[text.paraGray]}>
                    Please let me know Please{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  appStyle.rowAlignCenter,
                  {width: screenWidth.width20 + 15},
                ]}>
                <TouchableOpacity style={[style.jcCenter]}>
                  <LinearGradient
                    colors={colors.orangeGradient}
                    start={{x: -0.9, y: 1}}
                    end={{x: 1, y: 0}}
                    style={[button.inviteBtn]}>
                    <Text style={[text.heading5white]}>Invite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                style.row,
                style.mv5,
                style.jcCenter,
                {width: screenWidth.width100 - 10},
              ]}>
              <View style={[{width: screenWidth.width20}]}>
                <Image
                  style={appStyle.listImg}
                  source={images.logoSmall}></Image>
              </View>
              <View
                style={[
                  style.jcCenter,
                  style.mh5,
                  {width: screenWidth.width40 + 35},
                ]}>
                <View style={[style.row]}>
                  <Text style={[text.heading2Gray, text.semibold]}>
                    Rex_Solution
                  </Text>
                </View>
                <View>
                  <Text style={[text.paraGray]}>
                    Please let me know Please{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  appStyle.rowAlignCenter,
                  {width: screenWidth.width20 + 15},
                ]}>
                <TouchableOpacity style={[style.jcCenter]}>
                  <LinearGradient
                    colors={colors.orangeGradient}
                    start={{x: -0.9, y: 1}}
                    end={{x: 1, y: 0}}
                    style={[button.inviteBtn]}>
                    <Text style={[text.heading5white]}>Invite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                style.row,
                style.mv5,
                style.jcCenter,
                {width: screenWidth.width100 - 10},
              ]}>
              <View style={[{width: screenWidth.width20}]}>
                <Image
                  style={appStyle.listImg}
                  source={images.logoSmall}></Image>
              </View>
              <View
                style={[
                  style.jcCenter,
                  style.mh5,
                  {width: screenWidth.width40 + 35},
                ]}>
                <View style={[style.row]}>
                  <Text style={[text.heading2Gray, text.semibold]}>
                    Rex_Solution
                  </Text>
                </View>
                <View>
                  <Text style={[text.paraGray]}>
                    Please let me know Please{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  appStyle.rowAlignCenter,
                  {width: screenWidth.width20 + 15},
                ]}>
                <TouchableOpacity style={[style.jcCenter]}>
                  <LinearGradient
                    colors={colors.orangeGradient}
                    start={{x: -0.9, y: 1}}
                    end={{x: 1, y: 0}}
                    style={[button.inviteBtn]}>
                    <Text style={[text.heading5white]}>Invite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                style.row,
                style.mv5,
                style.jcCenter,
                {width: screenWidth.width100 - 10},
              ]}>
              <View style={[{width: screenWidth.width20}]}>
                <Image
                  style={appStyle.listImg}
                  source={images.logoSmall}></Image>
              </View>
              <View
                style={[
                  style.jcCenter,
                  style.mh5,
                  {width: screenWidth.width40 + 35},
                ]}>
                <View style={[style.row]}>
                  <Text style={[text.heading2Gray, text.semibold]}>
                    Rex_Solution
                  </Text>
                </View>
                <View>
                  <Text style={[text.paraGray]}>
                    Please let me know Please{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  appStyle.rowAlignCenter,
                  {width: screenWidth.width20 + 15},
                ]}>
                <TouchableOpacity style={[style.jcCenter]}>
                  <LinearGradient
                    colors={colors.orangeGradient}
                    start={{x: -0.9, y: 1}}
                    end={{x: 1, y: 0}}
                    style={[button.inviteBtn]}>
                    <Text style={[text.heading5white]}>Invite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                style.row,
                style.mv5,
                style.jcCenter,
                {width: screenWidth.width100 - 10},
              ]}>
              <View style={[{width: screenWidth.width20}]}>
                <Image
                  style={appStyle.listImg}
                  source={images.logoSmall}></Image>
              </View>
              <View
                style={[
                  style.jcCenter,
                  style.mh5,
                  {width: screenWidth.width40 + 35},
                ]}>
                <View style={[style.row]}>
                  <Text style={[text.heading2Gray, text.semibold]}>
                    Rex_Solution
                  </Text>
                </View>
                <View>
                  <Text style={[text.paraGray]}>
                    Please let me know Please{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  appStyle.rowAlignCenter,
                  {width: screenWidth.width20 + 15},
                ]}>
                <TouchableOpacity style={[style.jcCenter]}>
                  <LinearGradient
                    colors={colors.orangeGradient}
                    start={{x: -0.9, y: 1}}
                    end={{x: 1, y: 0}}
                    style={[button.inviteBtn]}>
                    <Text style={[text.heading5white]}>Invite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                style.row,
                style.mv5,
                style.jcCenter,
                {width: screenWidth.width100 - 10},
              ]}>
              <View style={[{width: screenWidth.width20}]}>
                <Image
                  style={appStyle.listImg}
                  source={images.logoSmall}></Image>
              </View>
              <View
                style={[
                  style.jcCenter,
                  style.mh5,
                  {width: screenWidth.width40 + 35},
                ]}>
                <View style={[style.row]}>
                  <Text style={[text.heading2Gray, text.semibold]}>
                    Rex_Solution
                  </Text>
                </View>
                <View>
                  <Text style={[text.paraGray]}>
                    Please let me know Please{' '}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  appStyle.rowAlignCenter,
                  {width: screenWidth.width20 + 15},
                ]}>
                <TouchableOpacity style={[style.jcCenter]}>
                  <LinearGradient
                    colors={colors.orangeGradient}
                    start={{x: -0.9, y: 1}}
                    end={{x: 1, y: 0}}
                    style={[button.inviteBtn]}>
                    <Text style={[text.heading5white]}>Invite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}
