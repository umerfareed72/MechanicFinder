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
  AsyncStorage,
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

export default class Items extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    super(props);
    this.state = {
      rating: 2,
   longitude:'',
   latitude:'',
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
      phoneNumber = 'tel:${03044228402}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };
getMechanicLocation=()=>{
  fetch(URL.Url+"location")
  .then(response => response.json())
  .then((responseJson)=> {
    // this.setState({
    // })
console.log(responseJson)
  })
  .catch(error=>console.log(error,"error")

  ) //to catch the errors if any
 
}

  componentDidMount() {
    Animated.loop(
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 2000, // 2000ms
          useNativeDriver: true,
        },
      ),
      {iterations: 1000},
    ).start();

    // Starts the animation
 this.getMechanicLocation()
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
    let {fadeAnim} = this.state;
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />

        <View style={style.flex1}>
          <ImageBackground
            imageStyle={{borderRadius: 8}}
            style={[{height:screenHeight.height30}]}
            source={images.userImg}>
            <View style={style.bgOverlay} />
            <View style={[style.rowBtw, style.ph20,style.mt30]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BuyItems')}>
                <Image
                  source={images.backarrowh}
                  style={[image.backArrow2, {tintColor: colors.white}]}></Image>
              </TouchableOpacity>

              <View>
                <Text style={[text.heading1, text.bold]}>Product</Text>
              </View>

              <Text style={[text.text16, text.orange]}></Text>
            </View>
          </ImageBackground>

          <View style={appStyle.curvedContainer}>
            <ScrollView style={style.ph20}>
              <View style={[style.mt10]}>
                <Text style={[text.h1Purple]}>Gas Kit</Text>
              </View>
              <View style={[style.mv10]}>
                <Text style={[text.h1]}>Discription</Text>
                <Text style={text.para}>
                  it is a long established fact that a reader will be distracted
                  by the readable content page when looking at its layout.it is
                  a long established fact that a reader will be distracted by
                  the readable content of a page when looking at its layout.
                </Text>
              
              </View>
              <View style={[style.row, style.aiCenter]}>
                  <Image
                    style={image.drawerIconlarge}
                    source={images.dollar}></Image>
                  <Text style={[text.heading2Gray]}>
                    Product Estimated Rate: 5$
                  </Text>
                </View>
              
                <View style={[style.row,style.mv10,style.aiCenter ]}>
                  <Image
                    style={image.drawerIconlarge}
                    source={images.dollar}></Image>
                  <Text style={[text.heading2Gray]}>
                Total Estimated Rate: 5$
                  </Text>
                </View>

              <View style={style.mt20,style.aiCenter}>
        
          
                  {/* {this.props.children} */}
                  
                  <TouchableOpacity
                    onPress={() =>
                   this.props.navigation.navigate('BookNow')
                    }
                    style={[button.buttoncontainer,style.mt20]}>
                    <Text style={[text.heading1purple, text.text16, text.ac]}>
       Add Product
                    </Text>
                  </TouchableOpacity>
               
                  </View>
                  
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
