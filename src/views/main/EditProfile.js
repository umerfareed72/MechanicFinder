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

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      loading: false,
      product: [],
      isModalVisible: false,
      refreshing: false,
      user: '',
      firstname: '',
      lastname: '',
      phone: 0,
      address: '',
      city: '',
      email: '',
      country: '',
      photo: '',
      // password:'',

      edit: false,
      edit1: false,
      edit2: false,
      edit3: false,
      edit4: false,
      edit5: false,
      edit6: false,
      edit7: false,
      edit8: false,
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
    AsyncStorage.getItem('userdata').then((res) => {
      const data = JSON.parse(res);
      axios
        .put(URL.Url + 'updateuser/' + this.state.user._id, {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          photo: this.state.photo,
          //  password:this.state.password,
          phone: this.state.phone,
          address: this.state.address,
          city: this.state.city,
          country: this.state.country,
          email: this.state.email,
        })
        .then((response) => {
          console.log(response.data);
          alert('Data Updated');
        });
    });
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  async componentDidMount() {
    AsyncStorage.getItem('userdata').then((res) => {
      const data = JSON.parse(res);
      console.log(data);
      this.setState({user: data});
      this.setState({firstname: data.firstname});
      this.setState({lastname: data.lastname});
      this.setState({email: data.email});
      this.setState({photo: data.photo});
      this.setState({phone: JSON.stringify(data.phone)});
      this.setState({address: data.address});
      this.setState({city: data.city});
      this.setState({country: data.country});
      this.setState({password: data.password});
    });
  }

  render() {
    const {photo, user} = this.state;
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
                  source={{uri: user.photo}}
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
              source={{uri: user.photo}}
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
                  <Text style={[text.heading1, text.bold]}>Update Profile</Text>
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
                <Text>First Name</Text>
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
                  placeholder={'First Name'}
                  value={this.state.firstname}
                  onChangeText={(text) => {
                    this.setState({
                      firstname: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Last Name</Text>
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
                  placeholder={'Last Name'}
                  value={this.state.lastname}
                  onChangeText={(text) => {
                    this.setState({
                      lastname: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Email</Text>
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
                  placeholder={'Email'}
                  value={this.state.email}
                  onChangeText={(text) => {
                    this.setState({
                      email: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>
{/* 
              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Password</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit3: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit3}
                  placeholder={'Password'}
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View> */}

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Phone Number</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit4: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit4}
                  placeholder={'PHONE NUMBER'}
                  value={this.state.phone}
                  onChangeText={(text) => {
                    this.setState({
                      phone: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Address</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit5: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit5}
                  placeholder={'Address'}
                  value={this.state.address}
                  onChangeText={(text) => {
                    this.setState({
                      address: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>City</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit6: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit6}
                  placeholder={'City'}
                  value={this.state.city}
                  onChangeText={(text) => {
                    this.setState({
                      city: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Country</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit7: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <TextInput
                  onFocus={this.changeheight}
                  style={input.textinputstyle}
                  editable={this.state.edit7}
                  placeholder={'Country'}
                  value={this.state.country}
                  onChangeText={(text) => {
                    this.setState({
                      country: text,
                    });
                  }}
                  underlineColorAndroid="transparent"></TextInput>
              </View>

              <TouchableOpacity
                onPress={this.submitdata}
                style={[button.button1, style.mt30, style.aiCenter]}>
                <Text style={button.btntext1}>Update</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
