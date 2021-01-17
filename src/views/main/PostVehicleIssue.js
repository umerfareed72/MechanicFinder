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
  ToastAndroid,
  Image,
  ImageBackground,
  Dimensions,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  COLORS,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import RNPickerSelect from 'react-native-picker-select';
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../../config/Constant';
import Modal from 'react-native-modal';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
const axios = require('axios');
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
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
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import Textarea from 'react-native-textarea';

class Postvehicalissue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TabDataStep1: 'flex',
      TabDataStep2: 'none',
      TabDataStep3: 'none',
      TabDataStep4: 'none',
      ColorStep1: colors.darkBlue,
      ColorStep2: colors.inputBordercolor,
      ColorStep3: colors.inputBordercolor,
      ColorStep4: colors.inputBordercolor,
      issuetype: '',
      photo: '',
      issuephoto: '',
      Phone: '',
      carcompany: '',
      vehicaltype: '',
      userdbid: '',
      city: '',
      status: '',
      description: '',
      token: '',
      userdata: {},
      userphoto: '',
      issuevideo: '',
      issuevideo1: '',
      latitude: '',
      longitude: '',
      status: 'Issue Location',
      isModalVisible: false,
      current: {},
      tlo: 'current',
      isLoading: false,
    };
  }

  componentDidMount = () => {
    console.log(
      'authhh111111111111111111122222222222',
      this.props.auth.user.userid,
    );
    this.getid();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getid();
      this.requestUserLocation();
    });
  };

  getdata = () => {
    this.setState({userphoto: this.props.auth.user.photo});
    console.log('userphoto', this.state.userphoto);
  };

  getid = () => {
    this.setState({userdbid: this.props.auth.user.userid});
    this.getdata();
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  validatefield = () => {
    if (this.state.vehicaltype == '') {
      ToastAndroid.show(
        'Vehicle Type Is Required',
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
    } else if (this.state.latitude == '') {
      ToastAndroid.show(
        'Location is Required',
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
    } else if (this.state.Phone == '') {
      ToastAndroid.show(
        'Phone Number Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.issuetype == '') {
      ToastAndroid.show(
        'Issue Type Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.description == '') {
      ToastAndroid.show(
        'Description Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  submitData = () => {
    if (this.validatefield()) {
      axios
        .post(URL.Url + 'issueregister', {
          issuetype: this.state.issuetype,
          phone: this.state.Phone,
          userphoto: this.state.userphoto,
          carcompany: this.state.carcompany,
          city: this.state.city,
          status: this.state.status,
          description: this.state.description,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          vehicaltype: this.state.vehicaltype,
          userdbid: this.state.userdbid,
          date: new Date().getDate(),
          issuevideo: this.state.issuephoto,
        })
        .then(async (res) => {
          console.log(res.data);
          console.log(this.state.userdbid);
          ToastAndroid.show(
            'Posted issue Successfully!',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );

          try {
            this.props.navigation.navigate('IssueListC');
          } catch (e) {
            console.log('error hai', e);
          }
        })
        .catch((error) => {
          Alert.alert('something went Wrong try again!!');

          console.log(error);
        });
    }
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Take Video From',
      StorageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const options2 = {
      title: 'Select video',
      StorageOptions: {
        skipBackup: true,
        path: 'video',
      },
      mediaType: 'video',
      path: 'video',
      quality: 1,
    };

    ImagePicker.showImagePicker(options, (response) => {
      this.setState({isLoading: true});
      if (response.uri) {
        this.setState({isLoading: true});
        console.log(response);
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
            this.setState({issuephoto: data.secure_url});
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

  requestUserLocation = async () => {
    console.log('in request user location');
    try {
      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',

          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Cool Location Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        grantedLocation === PermissionsAndroid.RESULTS.GRANTED &&
        granted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        //Get User Location
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            // this.setState({
            //   latitude: position.coords.latitude,
            //   longitude: position.coords.longitude,
            // })
            this.setState({
              current: {
                description: 'Current',
                geometry: {
                  location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  },
                },
              },
            });
            console.log(this.state.current);
            if (this.state.latitude != '' && this.state.latitude != '') {
              ToastAndroid.show(
                'Get current location Successfully!',
                ToastAndroid.BOTTOM,
                ToastAndroid.LONG,
              );
              console.log('latiiiii', this.state.latitude);
              console.log('latiiiii', this.state.longitude);
              //this.setState({ status: "Current Location Saved" })
            }
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
      console.log(this.state.latitude);
    } catch (err) {
      console.warn(err);
    }
  };

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
  render() {
    const {auth} = this.props;
    const {issuevideo1} = this.state;
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar />

        <View style={{}}>
          <Modal
            isVisible={this.state.isModalVisible}
            animationInTiming={500}
            animationOutTiming={500}>
            <View style={[style.h100, appStyle.rowEven]}>
              <View
                style={[
                  appStyle.DashboardslotCard,
                  {height: screenHeight.height60},
                  style.w100,
                ]}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always">
                  <View style={style.aiFlexEnd}>
                    <TouchableOpacity onPress={this.toggleModal}>
                      <Image
                        style={[image.large, image.Orange]}
                        source={images.cancel}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={[style.aiCenter, style.mb10]}>
                    <Text style={[text.h1]}>Issue Location</Text>
                  </View>
                  <View style={[style.mb5, style.aiCenter]}>
                    <Text style={[text.heading3]}></Text>
                  </View>

                  <View>
                    <View>
                      <TouchableOpacity>
                        <GooglePlacesAutocomplete
                          styles={{
                            loader: {
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              height: 20,
                            },
                            textInput: {
                              height: 38,
                              fontSize: 16,

                              marginHorizontal: 30,
                              borderWidth: 2,
                              borderColor: '#1FCD6C',
                            },
                            textInputContainer: {},
                            listView: {
                              marginHorizontal: 30,
                            },
                          }}
                          placeholder="Enter Location"
                          // autoFocus={true}
                          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                          listViewDisplayed={false} // true/false/undefined
                          fetchDetails={true}
                          renderDescription={(row) => row.description} // custom description render
                          onPress={(data, details) => {
                            console.log('auto lat', details.geometry);
                            this.setState({
                              latitude: details.geometry.location.lat,
                            });
                            this.setState({
                              longitude: details.geometry.location.lng,
                            });
                            // setDestLng(details.geometry.location.lng);
                            this.setState({tlo: details.formatted_address});
                            this.setState({status: 'Location Saved'});
                          }}
                          onKeyPress={(e) => {
                            if (e.nativeEvent.key == 'done') {
                            }
                          }}
                          query={{
                            key: 'AIzaSyAn4Q1cbuGVM8M6fyElhVgVGLFCLNl6Hf4',
                            language: 'en', // language of the results
                          }}
                          predefinedPlaces={[this.state.current]}
                          // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                          // currentLocationLabel="Current location"
                          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                          GoogleReverseGeocodingQuery={
                            {
                              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }
                          }
                          GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'cafe',
                          }}
                          GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: ['formatted_address'],
                          }}
                          filterReverseGeocodingByTypes={[
                            'locality',
                            'administrative_area_level_3',
                          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                          enablePoweredByContainer={false}
                          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[style.rowBtw, style.mt40]}>
                    <TouchableOpacity
                      onPress={this.toggleModal}
                      style={[
                        button.Profilebutton,
                        {marginTop: 20, marginLeft: 75},
                      ]}>
                      <Text style={[button.bookbutton, text.center]}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
        <KeyboardAvoidingView
          style={{backgroundColor: colors.white, flexGrow: 1}}>
          <ScrollView>
            <View>
              <LinearGradient
                colors={colors.orablu}
                start={{x: -0.9, y: 1}}
                end={{x: 1, y: 0}}
                style={[style.headerHeight4]}>
                <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                  <Text style={[text.text35, {color: colors.white}]}>
                    Post Issue
                  </Text>
                  <Text style={[text.text20, {color: colors.white},text.goodfishbd]}>
                    (Share your Vehical issue with us)
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View style={[appStyle.bodyBg]}>
              <View
                style={[
                  appStyle.rowBtw,
                  style.aiCenter,
                  appStyle.bodyLayout,
                  appStyle.bodyShadowTop,
                  style.mh40,
                  {
                    backgroundColor: colors.lightgray,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => this.tabStep1()}
                  style={style.mh20}>
                  <Text
                    style={[
                      text.heading2,
                      text.semibold,

                      {color: this.state.ColorStep1},
                    ]}>
                    Step 1
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.tabStep2()}
                  style={style.mh20}>
                  <Text
                    style={[
                      text.heading2,
                      text.semibold,
                      {color: this.state.ColorStep2},
                    ]}>
                    Step 2
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.BookNowView,
                  },
                ]}>
                <View style={[appStyle.headingLayout]}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Please fill this form
                  </Text>
                </View>
                <View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.cartype}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.vehicaltype}
                      style={[style.w90]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({vehicaltype: itemValue})
                      }>
                      <Picker.Item label="Select Vehicle Type" value="" />
                      {/* <Picker.Item label="Heavy Truck" value="Heavy Truck" /> */}
                      <Picker.Item label="Car" value="Car" />
                      <Picker.Item label="Jeep" value="Jeep" />
                      <Picker.Item label="Bus" value="Bus" />
                    </Picker>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.location}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.city}
                      style={[style.w90]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({city: itemValue})
                      }>
                      <Picker.Item label="Select Your City" value="" />
                      <Picker.Item label="Lahore" value="Lahore" />
                      <Picker.Item label="Islamabad" value="Islamabad" />
                      <Picker.Item label="Karachi" value="Karachi" />
                      <Picker.Item label="Multan" value="Multan" />
                    </Picker>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.Company}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.carcompany}
                      style={[style.w90]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({carcompany: itemValue})
                      }>
                      <Picker.Item
                        label="Select Vehicle Company"
                        value="Vehicle"
                      />
                      <Picker.Item label="Honda" value="Honda" />
                      <Picker.Item label="Toyota" value="Toyota" />
                      <Picker.Item label="Suzuki" value="Suzuki" />
                      <Picker.Item label="KIA" value="KIA" />
                      <Picker.Item label="Hundai" value="Hundai" />
                      <Picker.Item label="AUDI" value="AUDI" />
                      <Picker.Item label="Mercedese" value="Mercedese" />
                      <Picker.Item label="Range Rover" value="Range Rover" />
                    </Picker>
                  </View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.cartype}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.issuetype}
                      style={[style.w90]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({issuetype: itemValue})
                      }>
                      <Picker.Item label="Issue Type" value="" />
                      <Picker.Item label="Electric" value="Electric" />
                      <Picker.Item label="Engine" value="Engine" />
                      <Picker.Item label="Body" value="Body" />
                    </Picker>
                  </View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.phone}
                      style={image.InputImage}></Image>

                    <TextInput
                      style={input.textinputstyle}
                      placeholder="Phone"
                      secureTextEntry={true}
                      secureTextEntry={false}
                      keyboardType={'numeric'}
                      onChangeText={(text) => {
                        this.setState({
                          Phone: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <View
                    style={[
                      style.mb20,
                      appStyle.bodyLayout,
                      appStyle.bodyShadowBottom,

                      {
                        backgroundColor: colors.white,
                      },
                    ]}>
                    <View style={[appStyle.rowCenter]}>
                      <View>
                        <Text
                          style={
                            ({color: colors.Black323}, [text.text22, text.bold])
                          }>
                          {this.state.status}
                        </Text>
                        <TouchableOpacity
                          onPress={this.toggleModal}
                          style={
                            ([
                              button.buttonThemeWhite,
                              style.w30,
                              style.mt35,
                              {display: this.state.cancelButton},
                            ],
                            {marginStart: 270})
                          }>
                          <Text style={[text.heading4, text.goodfishbd]}>
                            Change
                          </Text>
                        </TouchableOpacity>
                        <Text style={([text.text14], {color: colors.gray})}>
                          {this.state.tlo}
                        </Text>
                      </View>
                      <View
                        style={[
                          {display: this.state.tabOverview},
                          style.flex1,
                        ]}>
                        {/* {/* <TouchableOpacity onPress={() => {
                          this.requestUserLocation();
                        }
                        }>
                          <View
                            style={[
                              button.buttoncontainer,
                              { backgroundColor: colors.purple },
                            ]}>
                            <Text
                              style={[
                                { color: colors.white },
                                button.touchablebutton,
                                text.semibold,
                              ]}>
                              Save current location
                      </Text>
                          </View></TouchableOpacity> */}
                        {/* <TouchableOpacity
                          onPress={this.toggleModal}
                          style={[
                            button.buttonThemeWhite,
                            style.w30,
                            style.mt35,
                            { display: this.state.cancelButton },
                          ], { marginStart: 20 }}>
                          <Text style={[text.heading4, text.goodfishbd]}>
                            Change
                    </Text>
                        </TouchableOpacity> */}
                      </View>
                    </View>
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

              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.TabDataStep2,
                  },
                ]}>
                <View style={[appStyle.headingLayout]}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Provide information about issue{' '}
                  </Text>
                </View>

                <View>
                  <View style={[style.aiCenter]}>
                    <View style={[appStyle.textareaBorder, style.w90]}>
                      <Textarea
                        onChangeText={(text) => {
                          this.setState({description: text});
                        }}
                        placeholder={'Type issue description message here'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                      />
                    </View>
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
                        {
                          <Image
                            source={{uri: this.state.issuephoto}}
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
                    )}
                    <View style={style.mv10}>
                      <Text
                        style={[
                          text.textheader5,
                          style.asCenter,
                          {textAlign: 'center'},
                        ]}>
                        Wait for issue picture on camera picture
                      </Text>
                    </View>
                  </View>
                </View>
                  <TouchableOpacity onPress={this.submitData}>
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
                        Post Issue !
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderWidth: 0.5,
    padding: 1,
  },
  textArea: {
    height: 200,
    width: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Postvehicalissue);
