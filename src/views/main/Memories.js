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
import Hamburger from '../../components/headerComponent/Hamburger';

import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';

import {withSafeAreaInsets} from 'react-native-safe-area-context';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
    };
    this.state = {
      loading: false,
      items: [],
      refreshing: false,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '',
      headerTitleAlign: 'left',
      headerShown: 'false',
      headerVisible: 'false',
      headerTitleStyle: [
        text.bold,
        {
          fontSize: 35,
          color: 'transparent',
          letterSpacing: 1,
          marginLeft: 20,
        },
      ],
      headerLeft: () => <Hamburger />,
      //headerRight: () => <ProfileIcon />,
      headerStyle: {
        elevation: 0,
        backgroundColor: 'transparent',
        // alignItems:'center',
        justifyContent: 'center',
      },
    };
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
            <StatusBar backgroundColor={'transparent'} />
            <View style={{postion: 'absolute', top: 30, left: 10,width:30}}>
              <Hamburger />
            </View>

            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1, text.bold]}>Discover</Text>
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

        <View style={[appStyle.bodyBg, appStyle.bodyHeight35]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MyBooking');
            }}>
            <View style={[appStyle.headingLayout]}>
              <Text style={[text.heading2, text.semibold]}>Saved</Text>
            </View>
          </TouchableOpacity>

          <ScrollView style={style.mb20}>
            <View style={[]}>
              <View style={[style.row, appStyle.rowBtw, appStyle.flexWrap]}>
                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant
                    Resturant
                    </Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant</Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant</Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant</Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant</Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant</Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant</Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>

                <ImageBackground
                  imageStyle={{borderRadius: 4}}
                  style={[image.galleryImg, style.mv5]}
                  source={images.HomeImg}>
                  <View style={[appStyle.popularInnerContent]}>
                    <Text style={[text.heading3, text.bold]}>Resturant</Text>

                    <StarRating
                      disabled={true}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#fff'}
                      emptyStarColor={'#fff'}
                      starSize={10}
                      containerStyle={{width: 53, marginTop: 3}}
                    />
                  </View>
                </ImageBackground>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* <View style={[appStyle.bodyHeight30, appStyle.bodyBg]}>
                    <ScrollView>
                        <View style={[style.pv20]}>
                            <TouchableOpacity style={[style.mh20, style.mv5]} onPress={() => {
                                this.props.navigation.navigate('MyBooking');
                            }}>
                                <Text style={[text.heading2, text.semibold]}>Saved</Text>

                            </TouchableOpacity>

                            <View style={[]}>

                                <View style={[style.row, appStyle.rowBtw, appStyle.flexWrap]}>

                                    <ImageBackground imageStyle={{ borderRadius: 4 }} style={[image.galleryImg, style.mv5]} source={images.HomeImg}>
                                        <View style={[appStyle.popularInnerContent]}>
                                            <Text style={[text.heading3, text.bold]}>Resturant</Text>

                                            <StarRating
                                                disabled={true}
                                                emptyStar={'ios-star-outline'}
                                                fullStar={'ios-star'}
                                                halfStar={'ios-star-half'}
                                                iconSet={'Ionicons'}
                                                maxStars={5}
                                                rating={this.state.starCount}
                                                selectedStar={rating => this.onStarRatingPress(rating)}
                                                fullStarColor={'#fff'}
                                                emptyStarColor={'#fff'}
                                                starSize={10}
                                                containerStyle={{ width: 53, marginTop: 3 }}
                                            />
                                        </View>
                                    </ImageBackground>



                                </View>
                            </View>




                        </View>
                    </ScrollView>
                </View> */}
      </SafeAreaView>
    );
  }
}
