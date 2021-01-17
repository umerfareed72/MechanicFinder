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
import {ActivityIndicator} from 'react-native-paper';
import Modal from 'react-native-modal';
import Geocoder from 'react-native-geocoding';
const axios = require('axios');
Geocoder.init('AIzaSyAn4Q1cbuGVM8M6fyElhVgVGLFCLNl6Hf4');
export default class BookNow extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    super(props);
    this.state = {
      rating: 2,
      data: [],
      refreshing: false,
      bookedMechanicId: '',
      starCount: 3.5,
      isModalVisible: false,
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

  getCity = () => {
    const {data} = this.state;
    const latitude = data.latitude;
    const longitude = data.longitude;
    Geocoder.from(latitude, longitude)
      .then((json) => {
        console.log(json.results[0]);
        var addressComponent = json.results[0].formatted_address;

        const location = addressComponent;
        const label = JSON.stringify(location);
        const url = Platform.select({
          ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
          android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
        });

        Linking.openURL(url);
      })
      .catch((error) => console.warn(error));
    // axios
    //   .get(
    //     'http://api.positionstack.com/v1/reverse?access_key=01bd92ff4d189472dbd298a5f7142f38&query=' +
    //       this.state.data.latitude +
    //       ',' +
    //       this.state.data.longitude,
    //   )
    //   .then((res) => {
    //     const {data} = this.state;
    //     const address = res.data.data[0];
    //     const street = address.street;
    //     const city = address.county;
    //     const country = address.country;
    //     const location = street + ' ' + city + ' ' + country;
    //     const latitude = data.latitude;
    //     const longitude = data.longitude;
    //     const label = JSON.stringify(location);
    //     const url = Platform.select({
    //       ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
    //       android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    //     });
    //     console.log(latitude + longitude + label);
    //     Linking.openURL(url);
    //   });
  };

  getMechanicLocation = async () => {
    AsyncStorage.getItem('bookMechanicData').then((res) => {
      const mechanic = JSON.parse(res);
      this.setState({data: mechanic, refreshing: true});
      console.log(mechanic, 'Mechanic data');
    });
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  async componentDidMount() {
    const {navigation} = this.props;
    this.getMechanicLocation();

    this.focusListener = navigation.addListener('didFocus', () => {
      this.getMechanicLocation();
    });

    Animated.loop(
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 3000, // 5000ms
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
          duration: 3000, // 2000ms
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
          <View style={{}}>
            <Modal
              isVisible={this.state.isModalVisible}
              animationInTiming={500}
              animationOutTiming={500}>
              <View style={[style.flex1, appStyle.rowCenter]}>
                <TouchableOpacity
                  style={[
                    appStyle.DashboardslotCard,
                    style.w90,
                    style.aiCenter,
                  ]}
                  onPress={this.toggleModal}>
                  <View style={[style.mv10, style.aiCenter]}>
                    <Text style={[text.h1]}>Preview Image</Text>
                    <Text style={[text.heading2Gray]}>
                      {data.firstname} {data.lastname}
                    </Text>
                  </View>
                  <Image
                    source={{uri: data.photo}}
                    style={[
                      {
                        height: '70%',
                        alignSelf: 'center',
                        resizeMode: 'contain',
                        borderRadius: 10,
                      },
                      style.w100,
                    ]}></Image>
                  <TouchableOpacity
                    style={[button.buttonTheme, style.mt30, style.w50]}
                    onPress={this.toggleModal}>
                    <Text style={[button.btntext1]}> Close Preview </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          <View style={style.flex1}>
            <TouchableOpacity onPress={this.toggleModal}>
              <ImageBackground
                imageStyle={{borderRadius: 8}}
                style={[image.storeImg, style.w100]}
                source={{uri: data.photo}}>
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
            </TouchableOpacity>
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
                    rating={data.rating}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStarColor={'#E9B60D'}
                    emptyStarColor={'#E9B60D'}
                    starSize={10}
                    containerStyle={style.w40}
                  />
                  <Text style={[text.text10, style.pl10, text.lightGrey]}>
                    Reviews({data.rating}/5.0)
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
                      24 Hours Available
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
                      Service Rate: {data.mechanicrate} $
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
                      onPress={this.getCity}
                      style={[button.Profilebutton]}>
                      <Text style={[text.btntext, text.text16, text.ac]}>
                        Locate Now
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
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
