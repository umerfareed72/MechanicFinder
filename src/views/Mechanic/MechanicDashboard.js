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
import AsyncStorage from '@react-native-community/async-storage';
export default class MechanicDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
      mechanicid: '',
      loading: false,
      token: '',
      refreshing: false,
      bookedUserData: [],
      data: [],
      bookedUserid: '',
    };
  }
  getData = () => {
    AsyncStorage.getItem('token').then((res) => {
      this.setState({token: res});
      console.log(res);
      axios
        .get(URL.Url + 'me', {
          headers: {
            'x-access-token': this.state.token,
          },
        })
        .then((response) => {
          this.setState({mechanicid: response.data.mechanicid});
          axios
            .put(URL.Url + 'mechaniclocation/' + this.state.mechanicid, {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            })
            .then((response) => {
              axios
                .get(URL.Url + 'mechanic/' + this.state.mechanicid)
                .then((mechanic) => {
                  console.log(mechanic.data);
                  this.setState({data: mechanic.data});
                })
                .then((res) => {
                  axios
                    .get(URL.Url + 'getbookedUser/' + this.state.mechanicid)
                    .then((response) => {
                      console.log(response.data);

                      response.data.map((item) => {
                        axios
                          .get(URL.Url + 'user/' + item.userid)
                          .then((response) => {
                            setTimeout(() => {
                              this.setState({
                                bookedUserData: response.data,
                              });
                              this.setState({refreshing: true});
                              this.setState({bookedUserid: item._id});
                            }, 2000);

                            // this.state.data['userid'] = item.userid;
                            // this.state.data['bookedId']=item._id
                            const send = JSON.stringify(this.state.data);
                            AsyncStorage.setItem('Mechanicdata', send);
                            const ids={}
                            ids['mechanicid']=item.mechanicid
                            const sendids=JSON.stringify(ids);
                            AsyncStorage.setItem('mechanicid', sendids);
                      console.log(ids)
                                  });
                      });
                    })
                    .catch((error) => {
                      console.log(error, 'Booked User Not Accesible');
                    });
                })
                .catch((error) => {
                  console.log('Mechanic Location Not Updated', error);
                });
            });
        })
        .catch((error) => {
          console.log('Mechanic Data Not Accessible', error);
        });
    });
  };

  requestMechanicLocation = async () => {
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
            this.getData();
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
  // removeBooking = () => {
  //   setInterval(() => {
  //     axios
  //       .put(URL.Url + 'cancelbookeduser/' + this.state.bookedUserid)
  //       .then((res) => {
  //         this.setState({bookedUserData: null});
  //         console.log(res.data, 'data updated');
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, 100000);
  // };
  componentDidMount() {
    console.log(this.state.data, 'hello');
    const {navigation} = this.props;
    this.requestMechanicLocation();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.requestMechanicLocation();
    });
    // this.removeBooking();
  }
  bookedUser = () => {
    const {bookedUserData, refreshing} = this.state;
    if (refreshing != false) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('UserProfile');
          }}
          style={[appStyle.slotCard, appStyle.rowJustify, style.aiCenter]}>
          <View style={[style.row, style.aiCenter]}>
            <View style={style.mr10}>
              <Image
                style={image.userImg}
                source={{uri: bookedUserData.photo}}
              />
            </View>

            <View style={[style.rowBtw, style.aiCenter]}>
              <View style={[style.mr15]}>
                <Image source={images.imagep} style={[image.image50]}></Image>
              </View>
              <View>
                <View>
                  <Text style={[text.text16, text.bold]}>
                    {bookedUserData.firstname} {bookedUserData.lastname}
                  </Text>
                </View>
                <View style={style.row}>
                  <Text style={[text.text15, {color: colors.gray}]}>
                    {bookedUserData.email}
                  </Text>
                </View>
                <View style={[style.mv5]}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.starCount}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStarColor={'#F59E52'}
                    emptyStarColor={'#F59E52'}
                    starSize={18}
                    containerStyle={{width: 110, marginTop: 3}}
                  />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <Image style={[image.forward]} source={images.arrowLong}></Image>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      return (
        <View
          style={[
            style.mv20,
            style.aiCenter,
            {backgroundColor: colors.lightgray},
          ]}>
          <View style={[style.mv20]}>
            <Text style={[text.heading1purple]}>No Data Available</Text>
          </View>
        </View>
      );
    }
  };

  render() {
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
              <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                <Text style={[text.goodfishbd, text.text40, text.greyRegular]}>
                  Hi {this.state.data.firstname}
                </Text>
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
              <View style={[style.aiCenter, style.mv10]}>
                <View style={image.boxContainer}>
                  <Text style={[text.text30]}> 5$</Text>
                </View>
                <View style={style.mv10}>
                  <Text style={[text.text20, text.goodfishbd, text.darkBlue]}>
                    {' '}
                    Your Earning
                  </Text>
                </View>
              </View>

              <View style={[appStyle.rowJustify]}>
                <Text style={[text.heading4, text.semibold]}>
                  Top Mechanics
                </Text>
                <Text style={[text.heading4, text.semibold]}>
                  You need to Know
                </Text>
              </View>
              <View>{this.bookedUser()}</View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
