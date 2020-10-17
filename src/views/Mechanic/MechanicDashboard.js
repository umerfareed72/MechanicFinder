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
      Amount:0,
      earning:0
    
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
          this.Rate();
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
                  const send = JSON.stringify(mechanic.data);
                  AsyncStorage.setItem('Mechanicdata', send);
                })
                .then((res) => {
                  axios
                    .get(URL.Url + 'getbookedUser/' + this.state.mechanicid)
                    .then((response) => {
                      console.log(response.data);

                      response.data.map((item) => {
                        this.setState({Amount:item.totalamount})
                    
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

                            const ids = {};
                            ids['mechanicid'] = item.mechanicid;
                            const sendids = JSON.stringify(ids);
                            AsyncStorage.setItem('mechanicid', sendids);
                            console.log(ids);
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
    const {navigation} = this.props;
    this.requestMechanicLocation();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.requestMechanicLocation();
 
    });
    // this.removeBooking();
  }

  Rate = () => {
    console.log(this.state.mechanicid)
    axios.get(URL.Url+'bookedmid/'+this.state.mechanicid).then((data)=>{
      console.log(data.data)
    var r = [];
    data.data.map((item, index) => {
      r.push(item.totalamount);
    });
    // Getting sum of numbers
    var sum = r.reduce(function (a, b) {
      return a + b;
    }, 0);
    console.log(sum); // Prints: 15

    this.setState({earning:sum})


    })
  };


  bookedUser = () => {
    const {bookedUserData, refreshing} = this.state;
    if (refreshing != false) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('UserProfileDetail');
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
                    Price: {this.state.Amount}
                  </Text>
                  <Image source={images.dollar} style={image.medium}></Image>
                </View>
                <View >
                  <Text>
                  {bookedUserData.address}{bookedUserData.city}{' '}{bookedUserData.country}
                  </Text>
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
    console.log(this.state.data)
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
                    rating={this.state.data.rating}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStarColor={'#000'}
                    emptyStarColor={'#000'}
                    starSize={20}
                    containerStyle={{width: 110, marginTop: 3}}
                  />
                  <Text style={[text.center, style.mv5]}> Reviews({this.state.data.rating}/5.0)</Text>
                </View>
              </View>
              <View style={[style.aiCenter, style.mv10]}>
                <View style={image.boxContainer}>
                  <Text style={[text.text30]}> {this.state.earning} $</Text>
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
                  Available Customers
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
