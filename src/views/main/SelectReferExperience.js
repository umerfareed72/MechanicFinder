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

export default class SelectReferExperience extends Component {
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
      <SafeAreaView style={[appStyle.safeAreaHeight]}>
        <StatusBar />
        {/*Body */}
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height30}}>
            <View style={{margin: 20}} />
            <StatusBar backgroundColor={'transparent'} />
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
          <View style={[appStyle.rowjustify, appStyle.bodyLayout]}>
            <Text style={[text.heading2, text.semibold]}>Restaurants</Text>
            <TouchableOpacity>
              <TouchableOpacity>
                <Text style={[text.link]}>Select</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          {/* <View style={[appStyle.bottomBorder]}></View> */}

          <ScrollView style={style.mb50}>
            <View style={[style.row, appStyle.flexWrap, style.mv10]}>
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
                  source={images.HomeImg2}>
                  <View
                    style={[
                      appStyle.tickCenter,
                      {display: this.state.CircleTick},
                    ]}>
                    {/* <Image style={[image.circleTick]} source={images.circleTick} /> */}
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
                    {/* <Image style={[image.circleTick]} source={images.circleTick} /> */}
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
                    {/* <Image style={[image.circleTick]} source={images.circleTick} /> */}
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              {/* <TouchableOpacity style={style.mv5}>
                                <ImageBackground imageStyle={{ borderRadius: 4 }} style={[image.galleryImg]} source={images.HomeImg}>
                                    <View style={[appStyle.tickCenter]}>
                                       
                                    </View>

                                </ImageBackground>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.mv5}>
                                <ImageBackground imageStyle={{ borderRadius: 4 }} style={[image.galleryImg]} source={images.HomeImg2}>
                                    <View style={[appStyle.tickCenter]}>
                                        
                                    </View>

                                </ImageBackground>
                            </TouchableOpacity> */}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
