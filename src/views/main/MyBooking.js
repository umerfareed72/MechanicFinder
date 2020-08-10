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
  Button,
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
import StarRating from 'react-native-star-rating';
import Hamburger from '../../components/headerComponent/Hamburger';
import Modal from 'react-native-modal';

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

  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

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
          {/* <Button title="Show modal" onPress={this.toggleModal} /> */}
          <Modal
            isVisible={this.state.isModalVisible}
            animationInTiming={500}
            animationOutTiming={500}>
            <View style={[style.flex1, appStyle.rowCenter]}>
              <View style={[appStyle.modalBg]}>
                <Text style={[]}>Are You Sure?</Text>
                <View style={[style.row, style.mt10]}>
                  <TouchableOpacity
                    style={[style.mh10]}
                    onPress={this.toggleModal}>
                    <View style={[button.modalButton]}>
                      <Text style={[text.heading3]}>No</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[style.mh10]}
                    onPress={this.toggleModal}>
                    <View style={[button.modalButton]}>
                      <Text style={[text.heading3]}>Yes</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

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
          <View style={[appStyle.headingLayout]}>
            <Text style={[text.heading2, text.semibold]}>My Bookings</Text>
          </View>
          <ScrollView>
            <View style={[style.mv10]}>
              <View
                style={[
                  appStyle.bookingShadow,
                  style.mv5,
                  {backgroundColor: '#fff'},
                ]}>
                <View style={[style.row, style.jcCenter]}>
                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={[image.crossImg]}>
                    <Image style={[image.locationIcon]} source={images.cross} />
                  </TouchableOpacity>
                  <View style={{marginRight: 5, width: screenWidth.width25}}>
                    <ImageBackground
                      imageStyle={{borderRadius: 4}}
                      style={[style.mv5, {height: 80, width: '100%'}]}
                      source={images.HomeImg}>
                      <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading3, text.bold]}>
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
                          selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                          }
                          fullStarColor={'#fff'}
                          emptyStarColor={'#fff'}
                          starSize={10}
                          containerStyle={{width: 53, marginTop: 3}}
                        />
                      </View>
                    </ImageBackground>
                  </View>

                  <View style={[style.jcCenter, {width: screenWidth.width65}]}>
                    <View>
                      <Text style={[text.text14, text.semibold]}>
                        Restaurant Name
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, text.semibold]}>
                        Price:$33
                      </Text>
                    </View>

                    <View style={[appStyle.rowBtw]}>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.calendarOrange}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.clock}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.location}></Image>
                        <Text style={[text.text9]}>Some Text Some here </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={[
                  appStyle.bookingShadow,
                  style.mv5,
                  {backgroundColor: '#fff'},
                ]}>
                <View style={[style.row, style.jcCenter]}>
                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={[image.crossImg]}>
                    <Image style={[image.locationIcon]} source={images.cross} />
                  </TouchableOpacity>
                  <View style={{marginRight: 5, width: screenWidth.width25}}>
                    <ImageBackground
                      imageStyle={{borderRadius: 4}}
                      style={[style.mv5, {height: 80, width: '100%'}]}
                      source={images.HomeImg}>
                      <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading3, text.bold]}>
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
                          selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                          }
                          fullStarColor={'#fff'}
                          emptyStarColor={'#fff'}
                          starSize={10}
                          containerStyle={{width: 53, marginTop: 3}}
                        />
                      </View>
                    </ImageBackground>
                  </View>

                  <View style={[style.jcCenter, {width: screenWidth.width65}]}>
                    <View>
                      <Text style={[text.text14, text.semibold]}>
                        Restaurant Name
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, text.semibold]}>
                        Price:$33
                      </Text>
                    </View>

                    <View style={[appStyle.rowBtw]}>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.calendarOrange}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.clock}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.location}></Image>
                        <Text style={[text.text9]}>Some Text Some here </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={[
                  appStyle.bookingShadow,
                  style.mv5,
                  {backgroundColor: '#fff'},
                ]}>
                <View style={[style.row, style.jcCenter]}>
                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={[image.crossImg]}>
                    <Image style={[image.locationIcon]} source={images.cross} />
                  </TouchableOpacity>
                  <View style={{marginRight: 5, width: screenWidth.width25}}>
                    <ImageBackground
                      imageStyle={{borderRadius: 4}}
                      style={[style.mv5, {height: 80, width: '100%'}]}
                      source={images.HomeImg}>
                      <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading3, text.bold]}>
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
                          selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                          }
                          fullStarColor={'#fff'}
                          emptyStarColor={'#fff'}
                          starSize={10}
                          containerStyle={{width: 53, marginTop: 3}}
                        />
                      </View>
                    </ImageBackground>
                  </View>

                  <View style={[style.jcCenter, {width: screenWidth.width65}]}>
                    <View>
                      <Text style={[text.text14, text.semibold]}>
                        Restaurant Name
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, text.semibold]}>
                        Price:$33
                      </Text>
                    </View>

                    <View style={[appStyle.rowBtw]}>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.calendarOrange}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.clock}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.location}></Image>
                        <Text style={[text.text9]}>Some Text Some here </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={[
                  appStyle.bookingShadow,
                  style.mv5,
                  {backgroundColor: '#fff'},
                ]}>
                <View style={[style.row, style.jcCenter]}>
                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={[image.crossImg]}>
                    <Image style={[image.locationIcon]} source={images.cross} />
                  </TouchableOpacity>
                  <View style={{marginRight: 5, width: screenWidth.width25}}>
                    <ImageBackground
                      imageStyle={{borderRadius: 4}}
                      style={[style.mv5, {height: 80, width: '100%'}]}
                      source={images.HomeImg}>
                      <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading3, text.bold]}>
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
                          selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                          }
                          fullStarColor={'#fff'}
                          emptyStarColor={'#fff'}
                          starSize={10}
                          containerStyle={{width: 53, marginTop: 3}}
                        />
                      </View>
                    </ImageBackground>
                  </View>

                  <View style={[style.jcCenter, {width: screenWidth.width65}]}>
                    <View>
                      <Text style={[text.text14, text.semibold]}>
                        Restaurant Name
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, text.semibold]}>
                        Price:$33
                      </Text>
                    </View>

                    <View style={[appStyle.rowBtw]}>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.calendarOrange}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.clock}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.location}></Image>
                        <Text style={[text.text9]}>Some Text Some here </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={[
                  appStyle.bookingShadow,
                  style.mv5,
                  {backgroundColor: '#fff'},
                ]}>
                <View style={[style.row, style.jcCenter]}>
                  <TouchableOpacity
                    onPress={this.toggleModal}
                    style={[image.crossImg]}>
                    <Image style={[image.locationIcon]} source={images.cross} />
                  </TouchableOpacity>
                  <View style={{marginRight: 5, width: screenWidth.width25}}>
                    <ImageBackground
                      imageStyle={{borderRadius: 4}}
                      style={[style.mv5, {height: 80, width: '100%'}]}
                      source={images.HomeImg}>
                      <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading3, text.bold]}>
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
                          selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                          }
                          fullStarColor={'#fff'}
                          emptyStarColor={'#fff'}
                          starSize={10}
                          containerStyle={{width: 53, marginTop: 3}}
                        />
                      </View>
                    </ImageBackground>
                  </View>

                  <View style={[style.jcCenter, {width: screenWidth.width65}]}>
                    <View>
                      <Text style={[text.text14, text.semibold]}>
                        Restaurant Name
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, text.semibold]}>
                        Price:$33
                      </Text>
                    </View>

                    <View style={[appStyle.rowBtw]}>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.calendarOrange}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.clock}></Image>
                        <Text style={[text.text9]}>28-7-2020</Text>
                      </View>
                      <View style={[appStyle.BookingsmallWidth]}>
                        <Image
                          style={[image.locationIconSmall]}
                          source={images.location}></Image>
                        <Text style={[text.text9]}>Some Text Some here </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
