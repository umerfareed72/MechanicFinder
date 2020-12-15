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
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import {
  colors,
  screenHeight,
  URL,
  screenWidth,
  images,
} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
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
import axios from 'axios';
import {connect} from "react-redux";
class MyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      bookedMechanics: [],
      isModalVisible: false,
      refreshing: false,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

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

  MyBooking = () => {
      axios.get(URL.Url + 'mechanics/' +this.props.auth.user.userid).then((data) => {
        this.setState({bookedMechanics: data.data});
      });
     };

  componentDidMount() {
    const {navigation} = this.props;
    this.MyBooking();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.MyBooking();
    });
  }

  render() {
    const {bookedMechanics, refreshing} = this.state;

    // if (bookedMechanics != null && refreshing != false) {

    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />

        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height20}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1, text.bold]}>My Booking</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={[appStyle.bodyBg, appStyle.safeContainer]}>
          <View style={[appStyle.headingLayout]}>
            <Text style={[text.heading2, text.semibold]}>My Bookings</Text>
          </View>
          <ScrollView>
            <View style={[style.mv10]}>
              {bookedMechanics.map((item, index) => {
                return (
                  <View
                    style={[
                      appStyle.slotCard,
                      style.mh5,
                      {backgroundColor: '#fff'},
                    ]}>
                
                    <View style={[style.row, style.jcCenter]}>
                      <View style={[style.w20, style.mr5]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={[style.mv5, {height: 80, width: '100%'}]}
                          source={{uri: item.mechanicphoto}}>
                          <View style={[appStyle.popularInnerContent]}>
                            <Text
                              style={[
                                text.heading5white,
                                text.bold,
                                text.center,
                              ]}>
                              {item.mechanicname}
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>

                      <View style={[style.jcCenter, style.w80]}>
                        <View style={[style.rowBtw]}>
                          <Text style={[text.heading2, text.semibold]}>
                            {item.mechanicname} 
                          </Text>
                          <Text style={[text.heading3, text.semibold]}>
                            {item.totalamount} $
                                                      </Text>
                       
                        </View>
                       <View style={[style.mv5]}>
                            <Text>Contact Me: {item.mechanicemail}</Text>
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
                            <Text style={[text.text9]}>
                              {item.city} {item.country}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
    //                     }
    // else {
    //   return (
    //     <SafeAreaView style={[appStyle.safeContainer]}>
    //       <StatusBar barStyle={'dark-content'}></StatusBar>
    //       <View style={[style.flex1, style.jcCenter]}>
    //         <View style={[style.aiCenter]}>
    //           <ActivityIndicator
    //             color="#bc2b78"
    //             size="large"></ActivityIndicator>
    //         </View>
    //       </View>
    //     </SafeAreaView>
    //   );
    // }
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(MyBooking);
