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

export default class ReferExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      CircleTick: 'none',
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  showCircleTick = () => {
    if (this.state.CircleTick == 'none') {
      this.setState({CircleTick: 'flex'});
    } else {
      this.setState({CircleTick: 'none'});
    }
  };

  render() {
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
 <StatusBar barStyle={"light-content"} backgroundColor={'transparent'} />
               
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
                <Text style={[text.heading1, text.bold]}>
                  Refer An Experience
                </Text>
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

        <View style={[appStyle.bodyBg, appStyle.bodyHeight30]}>
          <View style={[appStyle.rowJustify, appStyle.bodyLayout]}>
            <Text style={[text.heading2, text.semibold]}>Restaurants</Text>
            <TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SelectReferExperience');
                }}>
                <Text style={[text.link]}>See all</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          {/* <View style={[appStyle.bottomBorder]}></View> */}

          <ScrollView style={style.mb50}>
            <View style={[style.row, appStyle.rowBtw, appStyle.flexWrap]}>
              <TouchableOpacity
                style={style.mv5}
                onPress={() => this.showCircleTick()}>
                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg2}>
                  <View
                    style={[
                      appStyle.tickCenter,
                      {display: this.state.CircleTick},
                    ]}>
                    <Image
                      style={[image.circleTick]}
                      source={images.circleTick}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={style.mv5}
                onPress={() => this.showCircleTick()}>
                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View
                    style={[
                      appStyle.tickCenter,
                      {display: this.state.CircleTick},
                    ]}>
                    {/* <Image style={[image.circleTick]} source={images.circleTick} /> */}
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior="padding">
              <View style={[appStyle.headingLayout]}>
                <View style={[appStyle.rowAlignCenter, style.mv10]}>
                  <Image
                    style={[image.emailIcon, style.mr15]}
                    source={images.email}
                  />
                  <Text style={[text.heading2Gray, {color: colors.gray}]}>
                    Your Experience
                  </Text>
                </View>
                <View style={[appStyle.textareaBorder]}>
                  <Textarea
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>

              <View style={[style.mv20]}>
                <View
                  style={[
                    style.row,
                    style.mv5,
                    style.jcCenter,
                    {width: screenWidth.width100 - 20},
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
                      {width: screenWidth.width40 + 10},
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
                    {width: screenWidth.width100 - 20},
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
                      {width: screenWidth.width40 + 10},
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
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
