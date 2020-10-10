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
import {colors, screenHeight,URL, screenWidth, images} from '../../config/Constant';
import AsyncStorage from "@react-native-community/async-storage"
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
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
   bookedMechanics:[],
   isModalVisible: false, 
   refreshing:false
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

  MyBooking=()=>{
AsyncStorage.getItem('userId').then((res)=>{
  const userid=JSON.parse(res)
  axios.get(URL.Url+'mechanics/'+userid).then((data)=>{
this.setState({bookedMechanics:data.data})
console.log(data.data) 
})
})
    
  }

componentDidMount(){
  const {navigation} = this.props;
  this.MyBooking()
  this.focusListener = navigation.addListener('didFocus', () => {
    this.MyBooking()
  });
}

  render() {
   const {bookedMechanics,refreshing}=this.state
  
  // if (bookedMechanics != null && refreshing != false) {
  
   return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />

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
                      <Text style={[text.heading5white]}>No</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[style.mh10]}
                    onPress={this.toggleModal}>
                    <View style={[button.modalButton]}>
                      <Text style={[text.heading5white]}>Yes</Text>
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

        <View style={[appStyle.bodyBg,appStyle.safeContainer]}>
          <View style={[appStyle.headingLayout]}>
            <Text style={[text.heading2, text.semibold]}>My Bookings</Text>
          </View>
          <ScrollView >
            <View style={[style.mv10]}>
            {
  bookedMechanics.map((item)=>{
return(

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
                    <Image
                      style={[image.locationIconSmall]}
                      source={images.cross}
                    />
                  </TouchableOpacity>
                  <View style={{marginRight: 5, width: screenWidth.width25}}>
                    <ImageBackground
                      imageStyle={{borderRadius: 4}}
                      style={[style.mv5, {height: 80, width: '100%'}]}
                      source={{uri:item.photo}}>
                      <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading5white, text.bold]}>
                       {item.firstname}
                        </Text>

                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={item.rating}
                          // selectedStar={(rating) =>
                          //   this.onStarRatingPress(rating)
                          // }
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
                        {item.firstname}
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, text.semibold]}>
                        {bookedMechanics.mechanicrate}
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
              )
})
}
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
