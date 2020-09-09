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
import {DrawerNavigator} from 'react-navigation';
import * as geolib from 'geolib';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      longitude: '',
      latitude: '',
      loading: false,
      items: [],
      locations: [],
      refreshing: false,
      dataSource: [],
      slot: '',
    };
  }
  // requestUserLocation = async () => {
  //   try {
  //     const grantedLocation = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',

  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  //       {
  //         title: 'Cool Location Permission',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (
  //       grantedLocation === PermissionsAndroid.RESULTS.GRANTED &&
  //       granted === PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       Geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position);
  //           axios
  //             .get(URL.Url + 'getmechaniclocation')
  //             .then((response) => {
  //               this.setState({locations: response.data});
  //               this.state.locations.map((item) => {
  //                 // const areaMechanics=geolib.isPointWithinRadius(item.latitude,item.longitude,5000)
  //                 // console.log(areaMechanics)
  //                 // alert(areaMechanics)

  //                 const near = geolib.findNearest(
  //                   {
  //                     latitude: position.coords.latitude,
  //                     longitude: position.coords.longitude,
  //                   },
  //                   [{latitude: item.latitude, longitude: item.longitude}],
  //                 );
  //                 console.log(near);
  //               });
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });

  //           this.setState({
  //             longitude: position.coords.longitude,
  //             latitude: position.coords.latitude,
  //           });
  //           axios
  //             .post(URL.Url + 'adduserlocation', {
  //               longitude: this.state.longitude,
  //               latitude: this.state.latitude,
  //             })
  //             .then((response) => {
  //               console.log(response);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             });
  //         },
  //         (error) => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // changebuttoncolor = (id) => {
  //   this.setState({
  //     slot: id,
  //   });
  //   if (this.state.slot == id) {
  //     // console.log(this.state.dataSource[id])
  //     this.props.navigation.navigate('HomeDetail');
  //     const senddata = JSON.stringify(this.state.dataSource[id]);
  //     AsyncStorage.setItem('data', senddata);
  //   }
  // };
  // onStarRatingPress(rating) {
  //   this.setState({
  //     starCount: rating,
  //   });
  // }
  // componentDidMount() {
  //   fetch(URL.Url + 'mechanics')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         dataSource: responseJson,
  //       });
  //       console.log('Ok List');
  //     })
  //     .catch((error) => console.log(error, 'error')); //to catch the errors if any
  //   this.requestUserLocation();
  // }

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
        <View style={[appStyle.bodyHeight35, appStyle.bodyBg]}>
          <ScrollView>
            <View style={[style.mv20, style.mh10]}>
              <Text style={[text.h1, text.center, text.darkBlue]}>
                Select Your Needed Mechanics
              </Text>
            </View>

            <View>

            <TouchableOpacity 
            onPress={()=>{this.props.navigation.navigate('Mechaniclist')}}
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
              <TouchableOpacity style={[style.pv10]}   
                onPress={()=>{this.props.navigation.navigate('Mechaniclist')}}
        >
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

              <TouchableOpacity style={[style.pv10]} 
                        onPress={()=>{this.props.navigation.navigate('Mechaniclist')}}
              >
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.engine}>
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Engine</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={[style.pv10]}
              onPress={()=>{this.props.navigation.navigate('Mechaniclist')}}
              >
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
