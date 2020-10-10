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
import axios from 'axios';
export default class Items extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    super(props);
    this.state = {
      items: [],
      isModalVisible: false,
      mechanicdata: [],
      quantity: 1,
      price: 0,
      mechanicrate: 0,
      userdata: [],
      amount: 0,
      bookbutton: 'none',
    };
  }
  getProduct = async () => {
    await AsyncStorage.getItem('itemdata').then(async (res) => {
      res = JSON.parse(res);
      this.setState({items: res, price: res.price});
      AsyncStorage.getItem('data').then(async (data) => {
        const mechanic = JSON.parse(data);
        this.setState({
          mechanicdata: mechanic,
          mechanicrate: mechanic.mechanicrate,
        });
      });
      AsyncStorage.getItem('userdata').then(async (users) => {
        const user = JSON.parse(users);
        this.setState({userdata: user});
      });
    });
  };
  addProduct = () => {
    if (this.state.items.quantity == 0 || this.state.quantity == 0) {
      alert('No Product Added');
    } else {
      if (this.state.items.quantity != 0 && this.state.items.quantity >= 0) {
        const amount =
          this.state.price * this.state.quantity ;

        axios
          .post(URL.Url + 'addbuyProduct', {
            userid: this.state.userdata._id,
            mechanicid: this.state.mechanicdata.mechanicid,
            productid: this.state.items._id,
            quantity: this.state.quantity,
            title: this.state.items.title,
            description: this.state.items.description,
            paymentMethod: this.state.items.paymentMethod,
            photo: this.state.items.photo,
            amount: amount,
            price: this.state.items.price,
          })
          .then((res) => {
            console.log(res.data);
            this.setState({bookbutton: 'flex'});
          });
      } else {
        alert('No Product Available');
      }
    }
  };

  componentDidMount() {
    this.getProduct();
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  addquantity = () => {
    this.setState({quantity: this.state.quantity + 1});
  };
  minusquantity = () => {
    this.setState({
      quantity:
        this.state.quantity == 0
          ? this.state.quantity + 1
          : this.state.quantity - 1,
    });
  };
  continueBooking = () => {
    this.props.navigation.navigate('HomeDetail');
  };

  render() {
    let {items, mechanicdata} = this.state;

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
                style={[appStyle.DashboardslotCard, style.w90, style.aiCenter]}
                onPress={this.toggleModal}>
                <View style={[style.mv10, style.aiCenter]}>
                  <Text style={[text.h1]}>Preview Image</Text>
                  <Text style={[text.heading2Gray]}>{items.title}</Text>
                </View>
                <Image
                  source={{uri: items.photo}}
                  style={[
                    {
                      height: '70%',
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      borderRadius: 10,
                    },
                    style.w100,
                  ]}></Image>
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
              source={{uri: items.photo}}>
              <View style={style.bgOverlay} />
              <View style={[style.rowBtw, style.ph20, style.mt30]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('BuyItems')}>
                  <Image
                    source={images.backarrowh}
                    style={[
                      image.backArrow2,
                      {tintColor: colors.white},
                    ]}></Image>
                </TouchableOpacity>

                <View>
                  <Text style={[text.heading1, text.bold]}>
                    Product Profile
                  </Text>
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
                <Text style={text.para}>{items.description}</Text>
              </View>
              <View style={[style.row, style.aiCenter, style.mv10]}>
                <Image
                  style={[image.drawerIconlarge, image.Orange]}
                  source={images.username}></Image>
                <Text style={[text.heading2Gray]}>
                  Delivered By: {mechanicdata.firstname} {mechanicdata.lastname}
                </Text>
              </View>
              <View style={[style.row, style.mv10, style.aiCenter]}>
                <Image
                  style={image.drawerIconlarge}
                  source={images.dollar}></Image>
                <Text style={[text.heading2Gray]}>
                  Payment Method: {items.paymentMethod}
                </Text>
              </View>

              <View style={[style.row, style.aiCenter, style.mv10]}>
                <Image
                  style={[
                    image.small,
                    image.Orange,
                    style.mr5,
                    {marginLeft: 2},
                  ]}
                  source={images.store}></Image>
                <Text style={[text.heading2Gray]}>
                  Total Quantity Remaining: {items.quantity}
                </Text>
              </View>

              <View style={[style.row, style.aiCenter, style.mv10]}>
                <Image
                  style={image.drawerIconlarge}
                  source={images.dollar}></Image>
                <Text style={[text.heading2Gray]}>
                  Product Price: {items.price} $
                </Text>
              </View>
              <View style={[style.row, style.aiCenter, style.mv10]}>
                <Image
                  style={[
                    image.small,
                    image.Orange,
                    style.mr5,
                    {marginLeft: 2},
                  ]}
                  source={images.cart}></Image>
                <Text style={[text.heading2Gray]}>Add Quantity</Text>
                <View style={[appStyle.smallbox]}>
                  <TouchableOpacity onPress={this.addquantity}>
                    <Image
                      style={[image.xsmall, image.Orange, style.mh10]}
                      source={images.plus}></Image>
                  </TouchableOpacity>
                  <Text style={text.heading2}>{this.state.quantity}</Text>
                  <TouchableOpacity onPress={this.minusquantity}>
                    <Image
                      style={[image.xsmall, image.Orange, style.mh10]}
                      source={images.subtract}></Image>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[style.row, style.mv10, style.aiCenter]}>
                <Image style={image.large} source={images.dollar}></Image>
                <Text style={[text.heading1purple]}>
                  Total Estimated Rate :{' '}
                  {this.state.price * this.state.quantity }
                  $
                </Text>
              </View>

              <View style={(style.mt20, style.aiCenter)}>
                {/* {this.props.children} */}

                <TouchableOpacity
                  onPress={this.addProduct}
                  style={[button.buttoncontainer, style.mt20]}>
                  <Text style={[text.heading1purple, text.text16, text.ac]}>
                    Add Product
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[style.rowBtw, style.mv30]}>
                <TouchableOpacity
                  style={[style.row, style.aiCenter]}
                  onPress={() => {
                    this.props.navigation.navigate('BuyItems');
                  }}>
                  <Image
                    source={images.leftarrow}
                    style={[image.small, style.mr5]}></Image>
                  <Text style={[text.heading3]}>See Items</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    style.row,
                    style.aiCenter,
                    {display: this.state.bookbutton},
                  ]}
                  onPress={this.continueBooking}>
                  <Text style={[style.m5, text.heading3]}>
                    Continue Booking
                  </Text>
                  <Image
                    source={images.rightarrow}
                    style={[image.small]}></Image>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
