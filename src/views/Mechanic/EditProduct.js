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
  Keyboard,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import {
  colors,
  URL,
  screenHeight,
  screenWidth,
  images,
} from '../../config/Constant';
var FloatingLabel = require('react-native-floating-labels');
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import ImagePicker from 'react-native-image-picker';
import Textarea from 'react-native-textarea';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      loading: false,
      product: [],
      isModalVisible: false,
      refreshing: false,
      title: '',
      price: '',
      quantity: '',
      paymentMethod: '',
      description: '',
      photo: '',
      edit: false,
      edit1: false,
      edit2: false,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      title: 'Take Image From',
      StorageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        var data = new FormData();
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        data.append('file', source);
        data.append('upload_preset', 'rjrthtdu');
        data.append('cloud_name', 'dbkmbaxmk');
        fetch('https://api.cloudinary.com/v1_1/dbkmbaxmk/image/upload', {
          method: 'post',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.secure_url);
            this.setState({photo: data.secure_url});
          })
          .catch((err) => {
            Alert.alert('An Error Occured While Uploading');
            console.log(err);
          });
      } else if (response.didCancel) {
        console.log('User Cancelled Image Picker');
      } else if (response.error) {
        console.log('Image Picker Error', response.error);
      }
    });
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  submitdata = () => {
    AsyncStorage.getItem('Mechanicdata').then((res) => {
      const data = JSON.parse(res);
      axios
        .put(URL.Url + 'updateProduct/' + this.state.product._id, {
          title: this.state.title,
          price: this.state.price,
          quantity: this.state.quantity,
          paymentMethod: this.state.paymentMethod,
          photo: this.state.photo,
          description: this.state.description,
        })
        .then((response) => {
          console.log(response.data);
        });
    });
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  async componentDidMount() {
    AsyncStorage.getItem('productdata').then((res) => {
      const data = JSON.parse(res);
      console.log(data);
      this.setState({product: data});
      this.setState({title: data.title});
      this.setState({price: JSON.stringify(data.price)});
      this.setState({quantity: JSON.stringify(data.quantity)});
      this.setState({photo: data.photo});
      this.setState({paymentMethod: data.paymentMethod});
      this.setState({description: data.description});
    });
  }

  render() {
    const {photo, product} = this.state;
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar barStyle={'light-content'} translucent={true} />
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
                  <Text style={[text.heading2Gray]}>{this.state.title}</Text>
                </View>
                <Image
                  source={{uri: product.photo}}
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

        {/*Body */}
        <View>
          <TouchableOpacity onPress={this.toggleModal}>
            <ImageBackground
              source={{uri: product.photo}}
              style={[style.HeaderHeight3, style.jcCenter]}>
              <View style={style.bgOverlay} />
              <View style={[appStyle.Headre1]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Image
                    source={images.backarrowh}
                    style={[image.backArrow2, {tintColor: '#fff'}]}></Image>
                </TouchableOpacity>

                <View>
                  <Text style={[text.heading1, text.bold]}>Update Product</Text>
                </View>

                <View>
                  {/* <Text
                      style={[text.text16, {color: colors.white}, style.mr20]}>
                      Save
                    </Text> */}
                </View>
              </View>
              <View style={[style.asFlexEnd, style.mh20]}>
                <TouchableOpacity onPress={this.handleChoosePhoto}>
                  <Image
                    style={[{height: 15, width: 20}]}
                    source={images.Lightcamera}></Image>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={[appStyle.bodyBg, style.flex1]}>
          <ScrollView>
            <View style={[style.pv20]}>
              <View style={[style.mh30, style.rowBtw, style.aiCenter]}>
                <Text>Title</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>
              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit}
                  placeholder={'Title'}
                  value={this.state.title}
                  onChangeText={(text) => {
                    this.setState({
                      title: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Per Product Price</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => {
                    this.setState({edit1: true});
                  }}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit1}
                  placeholder={'Price Per Product'}
                  value={this.state.price}
                  onChangeText={(text) => {
                    this.setState({
                      price: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Quantity</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit2: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit2}
                  placeholder={'Quantity'}
                  value={this.state.quantity}
                  onChangeText={(text) => {
                    this.setState({
                      quantity: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View style={[input.floatInput]}>
                <Picker
                  selectedValue={this.state.paymentMethod}
                  style={[{color: colors.gray}]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({paymentMethod: itemValue})
                  }>
                  <Picker.Item
                    label="Select Payment Method"
                    value="SelectRole"
                  />
                  <Picker.Item
                    label="Cash on Delivery"
                    value="Cash on Delivery"
                  />
                </Picker>
              </View>

              <View style={[appStyle.headingLayout]}>
                <Text style={[text.heading3]}> Add Description</Text>
              </View>
              <View style={[appStyle.textareaBorder, style.mh20, style.mv5]}>
                <Textarea
                  onChangeText={(text) => {
                    this.setState({description: text});
                  }}
                  value={this.state.description}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
              </View>

              <TouchableOpacity
                onPress={this.submitdata}
                style={[button.button1, style.mt30, style.aiCenter]}>
                <Text style={button.btntext1}>Update Product</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
