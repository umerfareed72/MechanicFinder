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
  Animated,
  KeyboardAvoidingView,
  Linking,
  Keyboard,
  Platform,
  Button,
} from 'react-native';

import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
  height,
} from '../../config/Constant';

import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
var FloatingLabel = require('react-native-floating-labels');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appStyle from '../../assets/styles/appStyle';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
const axios = require('axios');
export default class BookNow extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    super(props);
    this.state = {
      rating: 2,
      data: [],
      refreshing: true,
      bookedMechanicId: '',
      starCount: 3.5,

      fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    };
    this.fadeOut = this.fadeOut.bind(this);
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      console.log(this.state.data.phone);
      phoneNumber = 'tel:' + this.state.data.phone;
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };
  getMechanicLocation = async () => {
    try {
      await AsyncStorage.getItem('Mechanicid')
        .then((response) => {
          const data = JSON.parse(response);
          console.log(data, 'data agya');
          axios.get(URL.Url + 'getbookedUser/' + data).then((res) => {
            res.data.map((item) => {
              axios
                .get(URL.Url + 'mechanic/' + item.mechanicid)
                .then((mechanic) => {
                  this.setState({data: mechanic.data});
                  const sendMechanicdata = JSON.stringify(this.state.data);
                  AsyncStorage.setItem('Mechanicdata', sendMechanicdata);
                });
            });
          });
        })
        .then((bookid) => {
          AsyncStorage.getItem('BookedMechanicId').then((res) => {
            const bookedId = JSON.parse(res);
            this.setState({bookedMechanicId: bookedId});
          });
        })
        .catch((error) => {
          console.log('User data not Fetched', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  CancelBooking = async () => {
    axios
      .put(URL.Url + 'cancelbookeduser/' + this.state.bookedMechanicId)
      .then((res) => {
        AsyncStorage.removeItem('Mechanicdata');
        AsyncStorage.removeItem('Mechanicid');
        this.setState({refreshing: false});
        this.props.navigation.navigate('Dashboard');
        console.log(res.data, 'data updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  RemoveBooking = () => {
    setInterval(() => {
      axios
        .put(URL.Url + 'cancelbookeduser/' + this.state.bookedMechanicId)
        .then((res) => {
          this.setState({refreshing: false});
          AsyncStorage.removeItem('Mechanicdata');
          AsyncStorage.removeItem('Mechanicid');
          this.props.navigation.navigate('Dashboard');
          console.log(res.data, 'data updated');
        })
        .catch((error) => {
          console.log(error);
        });
    }, 10000000);
  };
  componentDidMount() {
    console.log(this.state.data, 'hello');
    const {navigation} = this.props;
    this.getMechanicLocation();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getMechanicLocation();
    });
    this.RemoveBooking();
    Animated.loop(
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 5000, // 5000ms
          useNativeDriver: true,
        },
      ),
      {iterations: 1000},
    ).start();
  }

  fadeOut() {
    this.setState({fadeAnim: new Animated.Value(1)}, () => {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          duration: 2000, // 2000ms
          useNativeDriver: true,
        },
      ).start();
    });
  }

  render() {
    let {fadeAnim, data, refreshing} = this.state;
    if (refreshing != false && data != null) {
      return (
        <SafeAreaView style={appStyle.safeContainer}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'transparent'}
            translucent={true}
          />

          <View style={style.flex1}>
            <ImageBackground
              imageStyle={{borderRadius: 8}}
              style={[image.storeImg, style.w100]}
              source={images.userImg}>
              <View style={style.bgOverlay} />
              <View style={[style.rowBtw, style.ph20, style.pb10]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Dashboard')}>
                  <Image
                    source={images.backarrowh}
                    style={[
                      image.backArrow2,
                      {tintColor: colors.white},
                    ]}></Image>
                </TouchableOpacity>
                <View>
                  <Text style={[text.heading1, text.bold]}>Profile</Text>
                </View>
                <Text style={[text.text16, text.orange]}></Text>
              </View>
            </ImageBackground>

            <View style={appStyle.curvedContainer}>
              <ScrollView style={style.ph20}>
                <View style={[style.mt30]}>
                  <Text style={[text.h1Purple]}>
                    {data.firstname} {data.lastname}{' '}
                  </Text>
                </View>
                <View style={[appStyle.overviewStarsContainer]}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStarColor={'#E9B60D'}
                    emptyStarColor={'#E9B60D'}
                    starSize={10}
                    containerStyle={style.w40}
                  />
                  <Text style={[text.text10, style.pl10, text.lightGrey]}>
                    Reviews(85)
                  </Text>
                </View>

                <View style={[]}>
                  <Text style={[text.h1]}>Discription</Text>
                  <Text style={text.para}>
                    it is a long established fact that a reader will be
                    distracted by the readable content page when looking at its
                    layout.it is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </Text>
                </View>

                <View style={style.mt20}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={[image.medium]}
                      source={images.timing}></Image>
                    <Text style={[text.listItems, style.p5]}>
                      11:00am-03:00pm
                    </Text>
                  </View>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.medium}
                      source={images.location}></Image>
                    <Text style={[text.listItems, style.p5]}>
                      {data.address} {data.city} {data.country}
                    </Text>
                  </View>
                  <View style={[style.row, style.aiCenter]}>
                    <Image style={image.medium} source={images.dollar}></Image>
                    <Text style={[text.listItems, style.p5]}>
                      Estimated Rate: 5$
                    </Text>
                  </View>
                  <Animated.View
                    style={[
                      {...this.props.style, opacity: fadeAnim},
                      style.rowBtw,
                    ]}>
                    {/* {this.props.children} */}
                    <TouchableOpacity
                      onPress={this.makeCall}
                      style={[button.Profilebutton]}>
                      <Text style={[text.btntext, text.text16, text.ac]}>
                        Call Now
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(
                          'google.navigation:q=' +
                            data.latitude +
                            data.longitude,
                        );
                        console.log(data.latitude, data.longitude);
                      }}
                      style={[button.Profilebutton]}>
                      <Text style={[text.btntext, text.text16, text.ac]}>
                        Locate Now
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <View style={[style.mt30]}>
                    <TouchableOpacity
                      style={[button.button1]}
                      onPress={() => {
                        this.props.navigation.navigate('ProfileDetail');
                      }}>
                      <Text style={[button.btntext1, text.center]}>
                        Go To Detail
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={this.CancelBooking}
                      style={[button.button1, style.mt10]}>
                      <Text style={[button.btntext1, text.center]}>
                        Cancel Booking
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={appStyle.safeContainer}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'transparent'}
            translucent={true}
          />

          <View style={[style.flex1]}>
            <ImageBackground
              imageStyle={{borderRadius: 8}}
              style={[image.storeImg, style.w100]}
              source={images.userImg}>
              <View style={style.bgOverlay} />
              <View style={[style.rowBtw, style.ph20, style.pb10]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Dashboard')}>
                  <Image
                    source={images.backarrowh}
                    style={[
                      image.backArrow2,
                      {tintColor: colors.white},
                    ]}></Image>
                </TouchableOpacity>

                <View>
                  <Text style={[text.heading1, text.bold]}>Profile</Text>
                </View>
                <Text style={[text.text16, text.orange]}></Text>
              </View>
            </ImageBackground>

            <View style={[appStyle.curvedContainer]}>
              <ScrollView style={style.ph20}>
                <View style={[style.mt40]}>
                  <View style={[style.aiCenter]}>
                    <Text style={[text.h1Purple]}>No Data Available</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}
