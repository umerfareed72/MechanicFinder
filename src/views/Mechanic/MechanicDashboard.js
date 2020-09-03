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

import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
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
import {DrawerNavigator} from 'react-navigation';

import {withSafeAreaInsets} from 'react-native-safe-area-context';

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
    };
  }
  getId = () => {
    axios
      .get('http://192.168.0.110:3000/me', {
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
              .patch('http://192.168.0.110:3000/mechanicregister', {
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
            <View
              style={{
                postion: 'absolute',
                top: 30,
                left: 10,
                width: 30,
              }}></View>
            <StatusBar backgroundColor={'transparent'} />
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1]}>Discover</Text>
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
        <View style={[appStyle.bodyHeight35, appStyle.bodyBg]}>
          <ScrollView>
            <View style={[style.pv20]}>
              <View style={[appStyle.rowJustify, style.ph20]}>
                <Text style={[text.heading4, text.semibold]}>Popular</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Mechaniclist');
                  }}>
                  <Text style={[text.link]}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={[appStyle.bodyContainerLayout]}></View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
