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
import AsyncStorage from '@react-native-community/async-storage';
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

import Hamburger from '../../components/headerComponent/Hamburger';
import {DrawerNavigator} from 'react-navigation';
import * as geolib from 'geolib';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
      refreshing: false,
      userdata: [],
      dataSource: [],
      // token: '',
      // userid: '',
    };
  }

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
        //Get User Location
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            this.getClientData();
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

  getClientData = async () => {
    // AsyncStorage.getItem('usersignintoken').then((res) => {
    //   this.setState({token: res});
    //   console.log(this.state.token);
    //   axios
    //     .get(URL.Url + 'me', {
    //       headers: {
    //         'x-access-token': this.state.token,
    //       },
    //     })
    //     .then((response) => {
    //       this.setState({userid: response.data.userid});
    //       axios
    //         .get(URL.Url + 'user/' + this.state.userid)
    //         .then((response) => {
    // console.log(this.state.userid);
    axios
      .put(URL.Url + 'userlocation/' + this.props.auth.user.userid, {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      })
      .then((res) => {
        console.log('location updated', res.data);
      })

      // .then((response) => {
      //   this.setState({userdata: response.data});
      //   // console.log(this.state.userdata+'Data Updated')
      //   const senddata = JSON.stringify(this.state.userid);
      //   AsyncStorage.setItem('userId', senddata);
      //   axios
      //     .get(URL.Url + 'user/' + this.state.userid)
      //     .then((response) => {
      //       console.log(response.data);
      //       const send = JSON.stringify(response.data);
      //       AsyncStorage.setItem('userdata', send);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });

      // console.log(senddata);
      // })
      // .catch((error) => {
      //   console.log('Error agya', error);
      // });
      // })
      //     .catch((error) => {
      //       console.log('Not Found', error);
      //     });
      // })
      .catch((error) => {
        console.log(error);
      });
    // });
  };

  componentDidMount() {
    this.requestUserLocation();
  }

  render() {
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />

        {/*Body */}
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height20}}>
            <View style={style.bgOverlay}></View>

            <View style={{postion: 'absolute', top: 30, left: 10, width: 30}}>
              <Hamburger />
            </View>
            <StatusBar backgroundColor={'transparent'} />
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1]}>Dashboard</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={[appStyle.bodyBg, appStyle.safeContainer]}>
          <ScrollView>
            <View style={[style.mv20, style.mh10]}>
              <Text style={[text.goodfishbd, text.text18, text.center]}>
                Select Your Needed Mechanic Type
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.setItem('skilltype', 'Electric');
                  this.props.navigation.navigate('Mechaniclist');
                }}
                style={[style.pv10]}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.electric}>
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>
                      Electrician
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.pv10]}
                onPress={() => {
                  AsyncStorage.setItem('skilltype', 'Painter');
                  this.props.navigation.navigate('Mechaniclist');
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.carPaint}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Painter</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.pv10]}
                onPress={() => {
                  AsyncStorage.setItem('skilltype', 'Engine');
                  this.props.navigation.navigate('Mechaniclist');
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.engine}>
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Engine</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.pv10]}
                onPress={() => {
                  AsyncStorage.setItem('skilltype', 'Body');

                  this.props.navigation.navigate('Mechaniclist');
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.body}>
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Body</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Dashboard);
