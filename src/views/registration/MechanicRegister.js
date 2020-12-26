import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import RNPickerSelect from 'react-native-picker-select';
import {
  colors,
  URL,
  screenHeight,
  screenWidth,
  images,
} from '../../config/Constant';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
const axios = require('axios');
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';

export default class MechanicRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      starCount: 5,
      TabDataStep1: 'flex',
      TabDataStep2: 'none',
      TabDataStep3: 'none',
      TabDataStep4: 'none',
      ColorStep1: colors.darkBlue,
      ColorStep2: colors.inputBordercolor,
      ColorStep3: colors.inputBordercolor,
      ColorStep4: colors.inputBordercolor,
      BookNowView: 'flex',
      City: 'Select City',
      Country: 'Select Country',
      FirstName: '',
      LastName: '',
      
      Email: '',
      Password: '',
      CPassword: '',
      address: '',
      photo: '',
      Phone: 0,
      carcompany: '',
      skilltype: '',
      vehicletype: '',
      longitude: '',
      latitude: '',

      mechanicrate: 0,
      code: '',
      isLoading: false,
    };
  }
  check = () => {
    if (this.state.Password == this.state.CPassword) {
      this.submitData();
    } else {
      ToastAndroid.show('Password Not Matched');
    }
  };

  async componentDidMount() {
    const {navigation} = this.props;
    this.number();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.number();
    });
  }

  submitData = () => {
    if (this.validatefield()) {
      axios
        .post(URL.Url + 'mechanicregister', {
          firstname: this.state.FirstName,
          lastname: this.state.LastName,
          email: this.state.Email,
          password: this.state.Password,
          phone: this.state.Phone,
          address: this.state.address,
          photo: this.state.photo,
          carcompany: this.state.carcompany,
          city: this.state.City,
          country: this.state.Country,
          skilltype: this.state.skilltype,
          vehicletype: this.state.vehicletype,
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          mechanicrate: this.state.mechanicrate,
          rating: this.state.rating,
          code: this.state.code,
        })
        .then(async (res) => {
          console.log(res);
          console.log(res.data.token);

          try {
            this.props.navigation.navigate('LoginasMechanic');
            ToastAndroid.show('You are Registered', ToastAndroid.BOTTOM);
          } catch (e) {
            console.log('error hai', e);
          }
        })
        .catch((error) => {
          ToastAndroid.show('You are Not Registered', ToastAndroid.BOTTOM);
          console.log(error);
        });
    }
    this.sendemail();
  };

  number = () => {
    this.setState({code: Math.trunc(Math.random() * 100000).toString()});
    console.log('code', this.state.code);
  };

  sendemail = () => {
    try {
      axios
        .post(URL.Url + 'sendemail', {
          email: this.state.Email,
          code: this.state.code,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
      return (
        <View style={[style.aiCenter]}>
          <ActivityIndicator color="#bc2b78" size="large"></ActivityIndicator>
        </View>
      );
    }
  };

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
        this.setState({isLoading: true});
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
              this.setState({isLoading: false});
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

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  tabStep1 = () => {
    if (this.state.TabDataStep1 == 'flex') {
      this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep3: 'none'}),
        this.setState({TabDataStep4: 'none'});
      this.setState({BookNowView: 'flex'}),
        this.setState({ColorStep1: colors.darkBlue}),
        this.setState({ColorStep3: colors.inputBordercolor}),
        this.setState({ColorStep2: colors.inputBordercolor});
      this.setState({ColorStep4: colors.inputBordercolor});
    } else
      this.setState({TabDataStep1: 'flex'}),
        this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep3: 'none'});
    this.setState({TabDataStep4: 'none'});
    this.setState({BookNowView: 'flex'});
    this.setState({ColorStep1: colors.darkBlue});
    this.setState({ColorStep3: colors.inputBordercolor});
    this.setState({ColorStep2: colors.inputBordercolor});
    this.setState({ColorStep4: colors.inputBordercolor});
  };

  tabStep2 = () => {
    if (this.state.TabDataStep2 == 'flex') {
      this.setState({TabDataStep1: 'none'}),
        this.setState({TabDataStep3: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataStep4: 'none'});
      this.setState({color: 'none'});
      this.setState({ColorStep1: colors.inputBordercolor}),
        this.setState({ColorStep3: colors.inputBordercolor}),
        this.setState({ColorStep4: colors.inputBordercolor}),
        this.setState({ColorStep2: colors.darkBlue});
    } else
      this.setState({TabDataStep2: 'flex'}),
        this.setState({TabDataStep1: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataStep3: 'none'});
    this.setState({TabDataStep4: 'none'});
    this.setState({ColorStep1: colors.inputBordercolor});
    this.setState({ColorStep3: colors.inputBordercolor});
    this.setState({ColorStep2: colors.darkBlue});
    this.setState({ColorStep4: colors.inputBordercolor});
  };

  tabStep3 = () => {
    if (this.state.TabDataStep3 == 'flex') {
      this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep1: 'none'}),
        this.setState({TabDataStep4: 'none'});
      this.setState({BookNowView: 'none'}), this.setState({color: 'none'});
      this.setState({ColorStep1: colors.inputBordercolor}),
        this.setState({ColorStep3: colors.darkBlue}),
        this.setState({ColorStep2: colors.inputBordercolor});
      this.setState({ColorStep4: colors.inputBordercolor});
    } else
      this.setState({TabDataStep3: 'flex'}),
        this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep4: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataStep1: 'none'});
    this.setState({ColorStep1: colors.inputBordercolor});
    this.setState({ColorStep4: colors.inputBordercolor});
    this.setState({ColorStep3: colors.darkBlue});
    this.setState({ColorStep2: colors.inputBordercolor});
  };
  tabStep4 = () => {
    if (this.state.TabDataStep4 == 'flex') {
      this.setState({TabDataStep3: 'none'}),
        this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep1: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorStep1: colors.inputBordercolor}),
        this.setState({ColorStep4: colors.darkBlue}),
        this.setState({ColorStep3: colors.inputBordercolor});
      this.setState({ColorStep2: colors.inputBordercolor});
    } else
      this.setState({TabDataStep4: 'flex'}),
        this.setState({TabDataStep3: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataStep2: 'none'});
    this.setState({TabDataStep1: 'none'});
    this.setState({ColorStep1: colors.inputBordercolor});
    this.setState({ColorStep3: colors.inputBordercolor});
    this.setState({ColorStep4: colors.darkBlue});

    this.setState({ColorStep2: colors.inputBordercolor});
  };

  validatefield = () => {
    if (this.state.FirstName == '') {
      ToastAndroid.show(
        'First Name Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.LastName == '') {
      ToastAndroid.show(
        'Last Name Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.Email == '') {
      ToastAndroid.show(
        'Email Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.Password == '') {
      ToastAndroid.show(
        'Password Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.CPassword == '') {
      ToastAndroid.show(
        'Confirm Password Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    
     else if (this.state.Phone == 0) {
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
    } else if (this.state.City == '') {
      ToastAndroid.show(
        'City Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.Country == '') {
      ToastAndroid.show(
        'Country Is Required',
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
    } else if (this.state.carcompany == '') {
      ToastAndroid.show(
        'Car Company Is Required',
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
    } else if (this.state.mechanicrate == 0) {
      ToastAndroid.show(
        'Mechanic Rate Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    // else if(this.state.photo==""){
    //   ToastAndroid.show('Picture Is Required',ToastAndroid.BOTTOM,ToastAndroid.LONG)
    //   return false;
    // }
    return true;
  };

  render() {
    const {photo} = this.state;
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar />
        <KeyboardAvoidingView
          style={{backgroundColor: colors.white, flexGrow: 1}}>
          <ScrollView>
            {/*Body */}
            <View>
              <LinearGradient
                colors={colors.orablu}
                start={{x: -0.9, y: 1}}
                end={{x: 1, y: 0}}
                style={[style.headerHeight4]}>
                <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                  <Text style={[text.Eutemia, text.white, text.text30]}>
                    Smart Auto Mechanic Finder
                  </Text>
                  <Text
                    style={[
                      text.text18,
                      text.CinzelDecorativeBold,
                      text.white,
                    ]}>
                    (Mechanic Registration)
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <View style={[appStyle.bodyBg]}>
              <View
                style={[
                  appStyle.rowBtw,
                  appStyle.bodyLayout,
                  appStyle.bodyShadowTop,
                  {backgroundColor: '#fff'},
                ]}>
                <TouchableOpacity onPress={() => this.tabStep1()}>
                  <Text
                    style={[
                      text.tab,
                      text.semibold,
                      {color: this.state.ColorStep1},
                    ]}>
                    Step 1
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.tabStep2()}>
                  <Text
                    style={[
                      text.tab,
                      text.semibold,
                      {color: this.state.ColorStep2},
                    ]}>
                    Step 2
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.tabStep3()}>
                  <Text
                    style={[
                      text.tab,
                      text.semibold,
                      {color: this.state.ColorStep3},
                    ]}>
                    Step 3
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.tabStep4()}>
                  <Text
                    style={[
                      text.tab,
                      text.semibold,
                      {color: this.state.ColorStep4},
                    ]}>
                    Step 4
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View style={[appStyle.bottomBorder]}></View> */}

              {/* OverView Tab */}

              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.BookNowView,
                  },
                ]}>
                <View style={[appStyle.headingLayout]}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Personal Information
                  </Text>
                </View>
                <View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.username}
                      style={[image.username]}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="First Name"
                      onChangeText={(text) => {
                        this.setState({
                          FirstName: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.username}
                      style={image.username}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Last Name"
                      onChangeText={(text) => {
                        this.setState({
                          LastName: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.email}
                      style={image.InputImage}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Email"
                      onChangeText={(text) => {
                        this.setState({
                          Email: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image source={images.key} style={image.InputImage}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Password"
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        this.setState({
                          Password: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image source={images.key} style={image.InputImage}></Image>

                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Confirm Password"
                      secureTextEntry={true}
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        this.setState({
                          CPassword: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>
                </View>
                <TouchableOpacity onPress={this.tabStep2}>
                  <View
                    style={[
                      button.buttoncontainer,
                      style.mt20,
                      style.mh50,
                      {backgroundColor: colors.purple},
                    ]}>
                    <Text
                      style={[
                        {color: colors.white},
                        button.touchablebutton,
                        text.semibold,
                      ]}>
                      Next
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Gallery Tab View */}

              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.TabDataStep2,
                  },
                ]}>
                <View style={[appStyle.headingLayout]}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Personal Information(Continue){' '}
                  </Text>
                </View>
                <View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image source={images.phone} style={image.username}></Image>
                    <TextInput
                      keyboardType="numeric"
                      style={input.textinputstyle}
                      placeholder="Phone Number"
                      onChangeText={(text) => {
                        this.setState({
                          Phone: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.location}
                      style={image.InputImage}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Shop Address"
                      onChangeText={(text) => {
                        this.setState({
                          address: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.location}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.City}
                      style={[text.pickerstyle] }
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({City: itemValue})
                      }>
                      <Picker.Item label="Select City" value="java" />
                      <Picker.Item label="Lahore" value="Lahore" />
                      <Picker.Item label="Peshawer" value="Peshawer" />
                      <Picker.Item label="Islamabad" value="Islamabad" />
                      <Picker.Item label="Karachi" value="Karachi" />
                    </Picker>
                  </View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.location}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.Country}
                      style={[
                  text.pickerstyle    ]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({Country: itemValue})
                      }>
                      <Picker.Item label="Select Country" value="java" />
                      <Picker.Item label="Pakistan" value="Pakistan" />
                    </Picker>
                  </View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.dollar}
                      style={[image.InputImage]}></Image>
                    <Picker
                      selectedValue={this.state.mechanicrate}
                      style={[text.pickerstyle]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({mechanicrate: itemValue})
                      }>
                      <Picker.Item label="Select Service Rate" value="" />
                      <Picker.Item label="5" value="5" />
                      <Picker.Item label="10" value="10" />
                      <Picker.Item label="15" value="15" />
                      <Picker.Item label="20" value="20" />
                      <Picker.Item label="25" value="25" />
                      <Picker.Item label="30" value="30" />
                    </Picker>
                  </View>

                </View>
                <TouchableOpacity onPress={this.tabStep3}>
                  <View
                    style={[
                      button.buttoncontainer,
                      style.mt20,
                      style.mh50,
                      {backgroundColor: colors.purple},
                    ]}>
                    <Text
                      style={[
                        {color: colors.white},
                        button.touchablebutton,
                        text.semibold,
                      ]}>
                      Next
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Mechanic SKILLS Page */}

              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.TabDataStep3,
                  },
                ]}>
                <View style={[appStyle.headingLayout]}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Mechanic Skills{' '}
                  </Text>
                </View>
                <View>
                  <View style={style.mv10}>
                    <Text
                      style={[
                        text.textheader5,
                        style.asCenter,
                        {textAlign: 'center'},
                      ]}>
                      You Need to be Careful during entering your skills because
                      work will be assign you on the base of your skills.
                    </Text>
                  </View>
                
                  <View style={[input.textinputcontainer, style.mv10]}>
                    <Image
                      source={images.carservice}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.skilltype}
                      style={[text.pickerstyle]}
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

                  <View style={[input.textinputcontainer, style.mv10]}>
                    <Image
                      source={images.cartype}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.vehicletype}
                      style={[text.pickerstyle]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({vehicletype: itemValue})
                      }>
                      <Picker.Item label="Select Vehicle Type" value="" />
                      <Picker.Item label="Heavy Truck" value="Heavy Truck" />
                      <Picker.Item label="Cars" value="Cars" />
                      <Picker.Item label="Jeep" value="Jeep" />
                    </Picker>
                  </View>
                  <View style={[input.textinputcontainer, style.mv10]}>
                    <Image
                      source={images.Company}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.carcompany}
                      style={[text.pickerstyle]}
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
                </View>
                <TouchableOpacity onPress={this.tabStep4}>
                  <View
                    style={[
                      button.buttoncontainer,
                      style.mt20,
                      style.mh50,
                      {backgroundColor: colors.purple},
                    ]}>
                    <Text
                      style={[
                        {color: colors.white},
                        button.touchablebutton,
                        text.semibold,
                      ]}>
                      Next
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Gallery Tab View End */}

              {/* Reviews Tab Start  */}
              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.TabDataStep4,
                  },
                ]}>
                <View style={appStyle.headingLayout}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Upload Photo
                  </Text>
                </View>
                <View style={[style.flex1, style.jcCenter]}>
                  <View style={[style.aiCenter, style.mv20]}>
                    {this.state.isLoading ? (
                      <SafeAreaView style={[appStyle.safeContainer]}>
                        <StatusBar
                          barStyle={'dark-content'}
                          translucent={true}
                          backgroundColor="transparent"></StatusBar>
                        <View style={[style.flex1, style.jcCenter]}>
                          <View style={[style.aiCenter]}>
                            <ActivityIndicator
                              style={{padding: 50}}
                              color="#bc2b78"
                              size="large"></ActivityIndicator>
                          </View>
                        </View>
                      </SafeAreaView>
                    ) : (
                      <View style={[image.largeovalcontainer]}>
                        <Image
                          source={{uri: photo}}
                          style={[image.largeovalcontainerupload]}
                        />
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={this.handleChoosePhoto}>
                          <Image
                            style={[image.largeimagestyle]}
                            source={images.camerdark}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View style={style.mv10}>
                      <Text
                        style={[
                          text.textheader5,
                          style.asCenter,
                          {textAlign: 'center'},
                        ]}>
                        Face the camera straight on or with your shoulders at a
                        slight angle. Crop the image so you only include your
                        head and the top of your shoulders.
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={this.check}>
                  <View
                    style={[
                      button.buttoncontainer,
                      style.mt20,
                      style.mh50,
                      {backgroundColor: colors.purple},
                    ]}>
                    <Text
                      style={[
                        {color: colors.white},
                        button.touchablebutton,
                        text.semibold,
                      ]}>
                      Create Account
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* Reviews Tab End  */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
