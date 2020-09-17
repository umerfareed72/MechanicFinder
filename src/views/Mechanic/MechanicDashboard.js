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
  PermissionsAndroid,
  Permission,
  ImageBackground,
  Dimensions,
  Keyboard,
  Platform,
  AsyncStorage,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../../config/Constant';
const axios = require('axios');
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Hamburger from '../../components/headerComponent/Hamburger';

export default class MechanicDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
      mechanicid: '',
      loading: false,
      items: [],
      refreshing: false,
      dataSource: [],
      btncolor: colors.white,
      btnbackgroundcolor: colors.darkBlue,
      bordercolor: colors.grayd7,
      btntext: 'Offline',
    };
  }
  changeStatus = () => {
    if (this.state.btnbackgroundcolor == colors.darkBlue) {
      this.setState({
        btnbackgroundcolor: colors.white,
        btncolor: colors.black,
        bordercolor: colors.darkyellow,
        btntext: 'Online',
      });
    } else {
      this.setState({
        btnbackgroundcolor: colors.darkBlue,
        btncolor: colors.white,
        bordercolor: colors.grayd7,
        btntext: 'Offline',
      });
    }
  };
  getId = () => {
    axios
      .get(URL.Url + 'me', {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWNoYW5pY2lkIjoiNWY1MGE4M2FiMTRlNjIyYmQ4NjlkZTRkIiwiaWF0IjoxNTk5MTIxNDY4fQ.Dm6ItyGXXrPV4KtAEOgB8F9M6yJDhl56VVOyDjsHBWw',
        },
      })
      .then((response) => {
        console.log(response.data.mechanicid);
        this.setState({mechanicid: response.data.mechanicid});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  requestUserLocation = async () => {
    try {
      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',

          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Cool Location Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        grantedLocation === PermissionsAndroid.RESULTS.GRANTED &&
        granted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            this.setState({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            });
            axios
              .patch(URL.Url + 'mechanicregister', {
                mechanicid: this.state.mechanicid,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount() {
    this.requestUserLocation();
    this.getId();
  }

  render() {
    if(this.state.dataSource==[]){
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />

        {/*Body */}
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height30}}>
            <View style={{postion: 'absolute', top: 30, left: 10, width: 30}}>
              <Hamburger />
            </View>

            <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
              <Text style={[text.VanityBold, text.white, text.text30]}>
                Dashboard
              </Text>
              <Text style={[text.text18, text.Eutemia, text.white]}>
                (Have a Nice day)
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
          <ScrollView>
            <View style={[style.pv20]}>
              <View style={[style.aiCenter]}>
                <View style={[image.ovalcontainer]}>
                  <Image
                    source={images.HomeImg}
                    style={[image.ovalcontainerupload]}
                  />
                </View>
                <View style={style.mv5}>
                  <Text style={[text.paraGray, text.text18, text.goodfishbd]}>
                    Muhammad Umer Fareed
                  </Text>
                </View>
                <View style={[style.mv5]}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStarColor={'#000'}
                    emptyStarColor={'#000'}
                    starSize={20}
                    containerStyle={{width: 110, marginTop: 3}}
                  />
                  <Text style={[text.center, style.mv5]}> Reviews(4/5.0)</Text>
                </View>
              </View>
              <View style={[style.row, style.mv10, style.aiCenter]}>
                <View style={style.mr15}>
                  <Image source={images.cart} style={image.medium}></Image>
                </View>
                <Text style={text.heading2Gray}>Included Items</Text>
              </View>
              <View style={[style.row, style.mv10, style.aiCenter]}>
                <View style={style.mr15}>
                  <Image source={images.location} style={image.medium}></Image>
                </View>
                <Text style={text.heading2Gray}>Location</Text>
              </View>
              <View
                style={[
                  appStyle.rowBtw,
                  style.mh15,
                  style.mt40,
                  appStyle.bodyShadowTop,
                ]}>
                <TouchableOpacity
                  style={[appStyle.colLeft, style.row, style.aiCenter]}>
                  <View style={style.mr5}>
                    <Image
                      source={images.phone}
                      style={[
                        image.medium,
                        {tintColor: colors.darkyellow},
                      ]}></Image>
                  </View>
                  <Text
                    style={[style.asCenter, text.heading2Gray, text.semibold]}>
                    Contact Us
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[appStyle.colRight, style.row, style.aiCenter]}>
                  <View style={style.mr5}>
                    <Image
                      source={images.location}
                      style={image.medium}></Image>
                  </View>

                  <Text
                    style={[style.asCenter, text.heading2Gray, text.semibold]}>
                    Locate Me
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
                    }
                    else{
                      return (
                        <SafeAreaView style={[appStyle.safeContainer]}>
                          <StatusBar
                            barStyle={'light-content'}
                            backgroundColor={'transparent'}
                            translucent={true}
                          />
                  
                          {/*Body */}
                          <View style={{}}>
                            <LinearGradient
                              colors={colors.orablu}
                              start={{x: -0.9, y: 1}}
                              end={{x: 1, y: 0}}
                              style={{height: screenHeight.height30}}>
                              <View style={{postion: 'absolute', top: 30, left: 10, width: 30}}>
                                <Hamburger />
                              </View>
                             
                              <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                                <Text style={[text.VanityBold, text.white, text.text30]}>
                                  Dashboard
                                </Text>
                                <Text style={[text.text18, text.Eutemia, text.white]}>
                                  (Have a Nice day)
                                </Text>
                              </View>
                            </LinearGradient>
                          </View>
                          <View style={[appStyle.bodyBg]}>
                            <ScrollView>
                              <View style={[style.pv20]}>
                                <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                                  <Text style={[text.goodfishbd, text.text40, text.greyRegular]}>
                                    Hi Umer
                                  </Text>
                                </View>
                                <View style={[style.aiCenter, style.mv10]}>
                                  <View style={image.boxContainer}>
                                    <Text style={[text.text30, text.white]}> 5$</Text>
                                  </View>
                                  <View style={style.mv10}>
                                    <Text style={[text.text20, text.goodfishbd, text.darkBlue]}>
                                      {' '}
                                      Your Earning
                                    </Text>
                                  </View>
                                </View>
                                <View style={[style.aiCenter, style.mv10]}>
                                  <View style={[style.mv5]}>
                                    <StarRating
                                      disabled={true}
                                      maxStars={5}
                                      rating={this.state.starCount}
                                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                                      fullStarColor={'#000'}
                                      emptyStarColor={'#000'}
                                      starSize={20}
                                      containerStyle={{width: 110, marginTop: 3}}
                                    />
                                    <Text style={[text.center, style.mv5]}> Reviews(4/5.0)</Text>
                                  </View>
                                </View>
                                <View
                                  style={[
                                    style.aiCenter,
                                    style.mv10,
                                    button.button1
                                  ]}>
                                  <Text
                                    style={[
                                    button.btntext1
                                    ]}>
                                    {' '}
                                    You are {this.state.btntext}
                                  </Text>
                                </View>
                                <View style={[style.aiCenter, style.mv10]}>
                                  <TouchableOpacity
                                    onPress={this.changeStatus}
                                    style={[
                                      image.ovalcontainer,
                                      {
                                        borderColor: this.state.bordercolor,
                                        borderWidth: 5,
                                        backgroundColor: this.state.btnbackgroundcolor,
                                      },
                                    ]}>
                                    <Text
                                      style={[
                                        text.text16,
                                        text.center,
                                        text.spacing,
                                        {color: this.state.btncolor},
                                      ]}>
                                      {' '}
                                      {this.state.btntext}
                                    </Text>
                                  </TouchableOpacity>
                                
                                </View>
                              </View>
                            </ScrollView>
                          </View>
                        </SafeAreaView>
                      );
                  
                    }
  }
}
