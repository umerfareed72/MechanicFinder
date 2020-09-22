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
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AccessToken,
  LoginManager,
  LoginButton,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {
  colors,
  screenHeight,
  screenWidth,
  images,
  height,
  URL,
} from '../../config/Constant';
const axios = require('axios');
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appStyle from '../../assets/styles/appStyle';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import EditProfile from '../main/EditProfile';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Dashboard from '../main/Dashboard';

export default class Login extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      Uregister: colors.white,
      Mregister: colors.white,
      textUser: colors.black,
      textMechanic: colors.black,
      adminLogin: colors.white,
      mechanicLogin: colors.white,
      textAdmin: colors.black,
      textMechanicLogin: colors.black,
      userInfo: null,
      Email: '',
      Password: '',
      error: '',

      gettingLoginStatus: true,
      user_name: '',
      // Bussinessid: '',
      token: '',
      // FacebookPageId: '',
      profile_pic: '',
    };
  }
  onLogout = () => {
    //Clear the state after logout
    this.setState({user_name: null, token: null, profile_pic: null});
  };

  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
      //response alert
      console.log(JSON.stringify(result));
      this.props.navigation.navigate('GoogleUserSignUp');

      // this.setState({ Bussinessid:  result.id });

      // this.setState({ FacebookPageId:  result.instagram_business_account.id });
      // this.setState({ token: 'User Id: ' + ' ' + result.id });
      // this.setState({ profile_pic: result.picture.data.url });
    }
  };

  UserRegister = () => {
    this.setState({textUser: colors.white, Uregister: colors.orange});
    this.props.navigation.navigate('SignUp');
  };
  MechanicRegister = () => {
    this.setState({textMechanic: colors.white, Mregister: colors.orange});
    this.props.navigation.navigate('MechanicRegister');
  };

  adminLogin = () => {
    this.setState({textAdmin: colors.white, adminLogin: colors.orange});
    this.props.navigation.navigate('');
  };
  mechanicLogin = () => {
    this.setState({
      textMechanicLogin: colors.white,
      mechanicLogin: colors.orange,
    });
    this.props.navigation.navigate('LoginasMechanic');
  };

  handleFacebookLogin = () => {
    const _this = this;
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );

          AccessToken.getCurrentAccessToken().then((data) => {
            console.log(data.accessToken.toString());
            _this.setState({token: data.accessToken.toString()});
            const token = data.accessToken.toString();
            const processRequest = new GraphRequest(
              '/me?fields=name,picture.type(large)',
              null,
              _this.get_Response_Info,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(processRequest).start();
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  componentDidMount() {
    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId:
        '302956113171-1igfhdisoeu68stugkk2b1qa3lled9tt.apps.googleusercontent.com',
    });
    //Check if user is already signed in
    this._isSignedIn();
  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      console.log('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    this.setState({gettingLoginStatus: false});
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({userInfo: userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({userInfo: userInfo});
      const sendData = JSON.stringify(userInfo);
      AsyncStorage.setItem('googleData', sendData);
      this.props.navigation.navigate('GoogleUserSignUp');
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userInfo: null}); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  submitData = () => {
    axios
      .post(URL.Url + 'usersignin', {
        email: this.state.Email,
        password: this.state.Password,
      })
      .then(async (res) => {
        // console.log(res.data);

        try {
          await AsyncStorage.setItem('usersignintoken', res.data.token);
          console.log(res.data.token);
          this.props.navigation.navigate('userStack');
        } catch (e) {
          console.log('error hai', e);
          Alert.alert('Invalid email password');
        }
      });
  };

  render() {
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

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
                  <Text style={[text.Eutemia, text.white, text.text30]}>
                    Smart Auto Mechanic Finder
                  </Text>
                  <Text
                    style={[
                      text.text18,
                      text.CinzelDecorativeBold,
                      text.white,
                    ]}>
                    (User)
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <View style={[appStyle.bodyBg]}>
              <View style={[appStyle.headingLayout]}>
                <Text style={[style.headerStyle, text.OpenSans]}>Welcome</Text>
              </View>
              <View>
                <View style={[input.textinputcontainer]}>
                  <Image source={images.email} style={image.InputImage}></Image>
                  <TextInput
                    onFocus={this.changeheight}
                    style={input.textinputstyle}
                    placeholder="Email"
                    onChangeText={(text) => {
                      this.setState({
                        Email: text,
                      });
                    }}
                    underlineColorAndroid="transparent"></TextInput>
                </View>

                <View style={[input.textinputcontainer, style.mt20]}>
                  <Image source={images.key} style={image.InputImage}></Image>
                  <TextInput
                    onFocus={this.changeheight}
                    style={input.textinputstyle}
                    placeholder="Password"
                    onChangeText={(text) => {
                      this.setState({
                        Password: text,
                      });
                    }}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"></TextInput>
                </View>
                <View style={[style.pv10, style.ph30]}>
                  <Text
                    onPress={() => {
                      this.props.navigation.navigate('Forgot');
                    }}
                    style={[text.right, text.text14, {color: colors.link}]}>
                    Forgot Password
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={this.submitData}
                  // onPress={() => {
                  //   this.props.navigation.navigate('Dashboard');
                  // }}
                >
                  <View style={[button.buttoncontainer, style.mt20]}>
                    <Text
                      style={[
                        button.touchablebutton,
                        {color: colors.darkBlue},
                      ]}>
                      Login
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={[style.mv10, style.row, style.asCenter]}>
                  <GoogleSigninButton
                    style={[style.asCenter]}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this._signIn}
                    disabled={this.state.isSigninInProgress}
                  />

                  <TouchableOpacity onPress={this.handleFacebookLogin}>
                    <View style={[style.jcCenter, style.flex1, style.mh20]}>
                      <Image
                        style={[image.icon40]}
                        source={images.facebookdark}></Image>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[style.mv20, style.mh10]}>
                <Text style={[text.goodfishbd, text.text18, text.center]}>
                  Login As
                </Text>
              </View>
              <View
                style={[
                  appStyle.rowBtw,
                  style.mh15,
                  style.mv10,
                  appStyle.bodyShadowTop,
                ]}>
                <TouchableOpacity
                  onPress={this.adminLogin}
                  style={[
                    {backgroundColor: this.state.adminLogin},
                    appStyle.colLeft,
                  ]}>
                  <Text
                    style={[
                      style.asCenter,
                      text.heading3,
                      text.semibold,
                      {color: this.state.textAdmin},
                    ]}>
                    Admin
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.mechanicLogin}
                  style={[
                    appStyle.colRight,
                    {backgroundColor: this.state.mechanicLogin},
                  ]}>
                  <Text
                    style={[
                      style.asCenter,
                      text.heading3,
                      text.semibold,
                      {color: this.state.textMechanicLogin},
                    ]}>
                    Mechanic
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[style.mv20, style.mh10]}>
                <Text style={[text.goodfishbd, text.text18, text.center]}>
                  Do You have an Account?
                </Text>
              </View>
              <View
                style={[
                  appStyle.rowBtw,
                  style.mh15,
                  style.mv10,
                  appStyle.bodyShadowTop,
                ]}>
                <TouchableOpacity
                  onPress={this.UserRegister}
                  style={[
                    {backgroundColor: this.state.Uregister},
                    appStyle.colLeft,
                  ]}>
                  <Text
                    style={[
                      style.asCenter,
                      text.heading3,
                      text.semibold,
                      {color: this.state.textUser},
                    ]}>
                    User
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.MechanicRegister}
                  style={[
                    appStyle.colRight,
                    {backgroundColor: this.state.Mregister},
                  ]}>
                  <Text
                    style={[
                      style.asCenter,
                      text.heading3,
                      text.semibold,
                      {color: this.state.textMechanic},
                    ]}>
                    Mechanic
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
