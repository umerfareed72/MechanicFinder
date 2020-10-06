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
import Modal from 'react-native-modal';
export default class Items extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    super(props);
    this.state = {
      items:[],
      isModalVisible: false,
    };
  }
  getProduct=async()=>{
    await AsyncStorage.getItem('itemdata').then(async(res) => {
      res = JSON.parse(res);
   this.setState({items:res})
  })
   
  }
  componentDidMount() {
    this.getProduct()
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    let {items} = this.state;
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
        <View style={{}}>
            <Modal
              isVisible={this.state.isModalVisible}
              animationInTiming={500}
              animationOutTiming={500}>
              <View style={[style.flex1, appStyle.rowCenter]}>
                <TouchableOpacity
                  style={[appStyle.DashboardslotCard,style.w90,style.aiCenter]}
                  onPress={this.toggleModal}>
                  <View style={[style.mv10, style.aiCenter]}>
                    <Text style={[text.h1]}>Preview Image</Text>
                    <Text style={[text.heading2Gray]}>
                   {items.title}
                       </Text>
                  </View>
                  <Image
                    source={{uri:items.photo}}
                    style={[{
                      height:'70%' ,
                      alignSelf:'center',
                      resizeMode: 'contain',
                      borderRadius: 10,
                    },style.w100]}></Image>
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
            style={[{height: screenHeight.height20}]}
            source={{uri:items.photo}}>
            <View style={style.bgOverlay} />
            <View style={[style.rowBtw, style.ph20, style.mt30]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('BuyItems')}>
                <Image
                  source={images.backarrowh}
                  style={[image.backArrow2, {tintColor: colors.white}]}></Image>
              </TouchableOpacity>

              <View>
                <Text style={[text.heading1, text.bold]}>Product Profile</Text>
              </View>

              <Text style={[text.text16, text.orange]}></Text>
            </View>
          </ImageBackground>
          </TouchableOpacity>
         
          <View style={appStyle.curvedContainer}>
            <ScrollView style={style.ph20}>
              <View style={[style.mt10]}>
                <Text style={[text.h1Purple]}>{items.title}</Text>
              </View>
              <View style={[style.mv10]}>
                <Text style={[text.h1]}>Discription</Text>
                <Text style={text.para}>
                {items.description}
                 </Text>
              </View>
              <View style={[style.row, style.aiCenter,style.mv10]}>
                <Image
                  style={image.drawerIconlarge}
                  source={images.dollar}></Image>
                <Text style={[text.heading2Gray]}>
    Product Price: {items.price} $
                </Text>
              </View>

              <View style={[style.row, style.mv10, style.aiCenter]}>
                <Image
                  style={image.drawerIconlarge}
                  source={images.dollar}></Image>
                <Text style={[text.heading2Gray]}>
                  Mechanic Service Rate: 5 $
                </Text>
              </View>

              <View style={[style.row, style.mv10, style.aiCenter]}>
                <Image
                  style={image.drawerIconlarge}
                  source={images.dollar}></Image>
                <Text style={[text.heading2Gray]}>
                  Total Estimated Rate: {parseInt(items.price) +10}   $
                </Text>
              </View>

              <View style={(style.mt20, style.aiCenter)}>
                {/* {this.props.children} */}

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('HomeDetail')}
                  style={[button.buttoncontainer, style.mt20]}>
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
