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
  PermissionsAndroid,
  Permission,
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
import DatePicker from 'react-native-datepicker';
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
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

export default class MechanicRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDataStep1: 'flex',
      TabDataStep2: 'none',
      TabDataStep3: 'none',
      ColorStep1: colors.darkBlue,
      ColorStep2: colors.inputBordercolor,
      ColorStep3: colors.inputBordercolor,

      City: 'Select City',
      Country: 'Select Country',
      FirstName: 'First Name',
      LastName: 'Last Name',
      Email: 'Your Email',
      Password: '',
      CPassword: '',
      address: '',
      photo: null,
      Phone: '',
      googleData: [],
      date: 'Date Of Birth',
      longitude: '',
      latitude: '',
      filePath: {},
      editable: false,
      code: '',
    };
  }

  check = () => {
    if (this.state.Password == this.state.CPassword) {
      this.submitData();
    } else {
      alert('Confirm Password Not Matched');
    }
  };

  submitData = () => {
    axios
      .post(URL.Url + 'userregister', {
        firstname: this.state.FirstName,
        lastname: this.state.LastName,
        email: this.state.Email,
        password: this.state.Password,
        phone: this.state.Phone,
        address: this.state.address,
        photo: this.state.photo,
        city: this.state.City,
        country: this.state.Country,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        code: this.state.code,
      })
      .then(async (res) => {
        console.log(res);
        console.log(res.data.token);
        try {
          this.sendemail();
          this.props.navigation.navigate('Login');
        } catch (e) {
          console.log('error hai', e);
        }
      })
      .catch((error) => {
        Alert.alert('something went Wrong!!');

        console.log(error);
      });
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
      if (response) {
        console.log(response);
        this.setState({photo: response.uri});
        // const uri = response.uri;
        // const type = response.type;
        // const name = response.fileName;
        // const source = {
        //   uri,
        //   type,
        //   name,
        // }
        // this.cloudinaryUpload(source)
      } else if (response.didCancel) {
        console.log('User Cancelled Image Picker');
      } else if (response.error) {
        console.log('Image Picker Error', response.error);
      }
    });
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

  number = () => {
    this.setState({code: Math.trunc(Math.random() * 100000).toString()});
    console.log('code', this.state.code);
  };
  componentDidMount() {
    this.googleUserdata();
    const {navigation} = this.props;
    this.number();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.number();
    });
  }

  googleUserdata = () => {
    try {
      AsyncStorage.getItem('googleData').then((res) => {
        res = JSON.parse(res);
        this.setState({googleData: res});
        this.setState({
          FirstName: this.state.googleData.user.givenName,
        });
        this.setState({
          LastName: this.state.googleData.user.familyName,
        });
        this.setState({
          Email: this.state.googleData.user.email,
        });

        this.setState({
          photo: this.state.googleData.user.photo,
        });

        console.log(this.state.googleData, 'Agya Oy Data');
      });
    } catch (error) {
      console.log('error');
    }
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
        this.setState({ColorStep1: colors.darkBlue}),
        this.setState({ColorStep3: colors.inputBordercolor}),
        this.setState({ColorStep2: colors.inputBordercolor});
    } else
      this.setState({TabDataStep1: 'flex'}),
        this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep3: 'none'});
    this.setState({ColorStep1: colors.darkBlue});
    this.setState({ColorStep3: colors.inputBordercolor});
    this.setState({ColorStep2: colors.inputBordercolor});
  };

  tabStep2 = () => {
    if (this.state.TabDataStep2 == 'flex') {
      this.setState({TabDataStep1: 'none'}),
        this.setState({TabDataStep3: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorStep1: colors.inputBordercolor}),
        this.setState({ColorStep3: colors.inputBordercolor}),
        this.setState({ColorStep2: colors.darkBlue});
    } else
      this.setState({TabDataStep2: 'flex'}),
        this.setState({TabDataStep1: 'none'}),
        this.setState({TabDataStep3: 'none'});
    this.setState({ColorStep1: colors.inputBordercolor});
    this.setState({ColorStep3: colors.inputBordercolor});
    this.setState({ColorStep2: colors.darkBlue});
  };

  tabStep3 = () => {
    if (this.state.TabDataStep3 == 'flex') {
      this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep1: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorStep1: colors.inputBordercolor}),
        this.setState({ColorStep3: colors.darkBlue}),
        this.setState({ColorStep2: colors.inputBordercolor});
    } else
      this.setState({TabDataStep3: 'flex'}),
        this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep1: 'none'});
    this.setState({ColorStep1: colors.inputBordercolor});
    this.setState({ColorStep3: colors.darkBlue});
    this.setState({ColorStep2: colors.inputBordercolor});
  };

  render() {
    const {photo} = this.state;
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
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
                    (Complete User Registration)
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
              </View>
              {/* <View style={[appStyle.bottomBorder]}></View> */}

              {/* OverView Tab */}

              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.TabDataStep1,
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
                      placeholder={this.state.FirstName}
                      onChangeText={(text) => {
                        this.setState({
                          FirstName: text,
                        });
                      }}
                      editable={this.state.editable}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.username}
                      style={image.username}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder={this.state.LastName}
                      onChangeText={(text) => {
                        this.setState({
                          LastName: text,
                        });
                      }}
                      editable={this.state.editable}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.email}
                      style={image.InputImage}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder={this.state.Email}
                      onChangeText={(text) => {
                        this.setState({
                          Email: text,
                        });
                      }}
                      editable={this.state.editable}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image source={images.key} style={image.InputImage}></Image>
                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Enter Your Password"
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
                      placeholder="Enter Your Password"
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
                      placeholder="Home Address"
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
                      style={[
                        {height: 50, width: 180, left: -8, color: colors.gray},
                      ]}
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
                        {height: 50, width: 180, left: -8, color: colors.gray},
                      ]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({Country: itemValue})
                      }>
                      <Picker.Item label="Select Country" value="java" />
                      <Picker.Item label="Pakistan" value="Pakistan" />
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

              {/* Gallery Tab View End */}

              {/* Reviews Tab Start  */}
              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.TabDataStep3,
                  },
                ]}>
                <View style={appStyle.headingLayout}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Upload Photo
                  </Text>
                </View>
                <View style={[style.flex1, style.jcCenter]}>
                  <View style={[style.aiCenter, style.mv20]}>
                    <View style={[image.largeovalcontainer]}>
                      {
                        <Image
                          source={{uri: photo}}
                          style={[image.largeovalcontainerupload]}
                        />
                      }
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
