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
  ToastAndroid,
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

export default class EditMechanicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      loading: false,
      mechanic: [],
      isModalVisible: false,
      refreshing: false,
      firstname: '',
      lastname: '',
      phone: 0,
      address: '',
      city: '',
      email: '',
      country: '',
      photo: '',
      password: '',
      vehicletype: '',
      skilltype: '',
      carcompany: '',
      mechanicrate: 0,

      edit: false,
      edit1: false,
      edit2: false,
      edit3: false,
      edit4: false,
      edit5: false,
      edit6: false,
      edit7: false,
      edit8: false,
      edit9: false,
      edit10: false,
      edit11: false,
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

  validatefield = () => {
    if (this.state.firstname == '') {
      ToastAndroid.show(
        'First Name Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.lastname == '') {
      ToastAndroid.show(
        'Last Name Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.email == '') {
      ToastAndroid.show(
        'Email Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.phone == 0) {
      ToastAndroid.show(
        'Phone Number Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    } else if (this.state.address == '') {
      ToastAndroid.show(
        'Address Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.city == '') {
      ToastAndroid.show(
        'City Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.country == '') {
      ToastAndroid.show(
        'Country Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.photo == '') {
      ToastAndroid.show(
        'Picture Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.skilltype == '') {
      ToastAndroid.show(
        'Skill Type Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.vehicletype == '') {
      ToastAndroid.show(
        'Vehicle Type Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.carcompany == '') {
      ToastAndroid.show(
        'Vehicle Name Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.mechanicrate == 0) {
      ToastAndroid.show(
        'Mechanic Rate Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  submitdata = () => {
    if (this.validatefield()) {
      AsyncStorage.getItem('Mechanicdata').then((res) => {
        const data = JSON.parse(res);
        axios
          .put(URL.Url + 'updatemechanic/' + this.state.mechanic._id, {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            photo: this.state.photo,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            email: this.state.email,
            vehicaltype: this.state.vehicaltype,
            skilltype: this.state.skilltype,
            carcompany: this.state.carcompany,
            mechanicrate: this.state.mechanicrate,
          })
          .then((response) => {
            console.log(response.data);
            ToastAndroid.show(
              'Data Updated',
              ToastAndroid.BOTTOM,
              ToastAndroid.LONG,
            );
          });
      });
    }
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  async componentDidMount() {
    AsyncStorage.getItem('Mechanicdata').then((res) => {
      const data = JSON.parse(res);
      console.log(data);
      this.setState({mechanic: data});
      this.setState({firstname: data.firstname});
      this.setState({lastname: data.lastname});
      this.setState({email: data.email});
      this.setState({photo: data.photo});
      this.setState({phone: JSON.stringify(data.phone)});
      this.setState({address: data.address});
      this.setState({city: data.city});
      this.setState({country: data.country});
      this.setState({password: data.password});
      this.setState({skilltype: data.skilltype});
      this.setState({vehicletype: data.vehicletype});
      this.setState({carcompany: data.carcompany});
      this.setState({mechanicrate: JSON.stringify(data.mechanicrate)});
      console.log(this.state.mechanicrate);
    });
  }

  render() {
    const {photo, mechanic} = this.state;
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
                  source={{uri: mechanic.photo}}
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
              source={{uri: mechanic.photo}}
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
              </View>
 */}

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

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Skill Type</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit8: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <Picker
                  selectedValue={this.state.skilltype}
                  style={[text.pickerstyle, {left: 0}, style.w100]}
                  enabled={this.state.edit8}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({skilltype: itemValue})
                  }>
                  <Picker.Item label="Select Mechanic Type" value="" />
                  <Picker.Item label="Engine" value="Engine" />
                  <Picker.Item label="Body" value="Body" />
                  <Picker.Item label="Painter" value="Painter" />
                  <Picker.Item label="Electric" value="Electric" />
                </Picker>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Vehicle Type</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit9: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <Picker
                  enabled={this.state.edit9}
                  selectedValue={this.state.vehicletype}
                  style={[text.pickerstyle, style.w100, {left: 0}]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({vehicletype: itemValue})
                  }>
                  <Picker.Item label="Select Vehicle Type" value="" />
                  <Picker.Item label="Heavy Truck" value="Heavy Truck" />
                  <Picker.Item label="Cars" value="Cars" />
                  <Picker.Item label="Jeep" value="Jeep" />
                </Picker>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Vehicle Name</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit10: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <Picker
                  selectedValue={this.state.carcompany}
                  style={[text.pickerstyle, {left: 0}, style.w100]}
                  enabled={this.state.edit10}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({carcompany: itemValue})
                  }>
                  <Picker.Item label="Select Vehicle Name" value="" />
                  <Picker.Item label="Honda" value="Honda" />
                  <Picker.Item label="Toyota" value="Toyota" />
                  <Picker.Item label="Suzuki" value="Suzuki" />
                  <Picker.Item label="Audi" value="Audi" />
                  <Picker.Item label="KIA" value="KIA" />
                  <Picker.Item label="Mercedes" value="Merecedes" />
                </Picker>
              </View>

              <View
                style={[style.mh30, style.rowBtw, style.aiCenter, style.mt20]}>
                <Text>Mechanic Rate</Text>
                <TouchableOpacity
                  style={[style.p5]}
                  onPress={() => this.setState({edit11: true})}>
                  <Image
                    source={images.editEmpty}
                    style={image.InputImage}></Image>
                </TouchableOpacity>
              </View>

              <View style={[input.textinputcontainer]}>
                <Picker
                  selectedValue={this.state.mechanicrate}
                  enabled={this.state.edit11}
                  style={[text.pickerstyle, {left: 0}, style.w100]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({mechanicrate: itemValue})
                  }>
                  <Picker.Item label="Select Service Rate" value="" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="20" value="20" />
                </Picker>
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
