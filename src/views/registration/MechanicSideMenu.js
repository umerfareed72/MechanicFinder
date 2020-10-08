import React from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import {SafeAreaView} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

navigateToScreen = (route) => () => {
  const navigateAction = NavigationActions.navigate({
    routeName: route,
  });
  this.props.navigation.dispatch(navigateAction);
};
export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      photo: images.lgoSmalluri,
      email: '',
      data: [],
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    this.LoginUserData();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.LoginUserData();
    });
  }

  _Signout = async () => {
    const {navigation} = this.props;
      AsyncStorage.removeItem('token').then(() => {
        AsyncStorage.removeItem('Mechanicdata')
        navigation.navigate('LoginasMechanic');
      });
     
    };
  LoginUserData = async () => {
    try {
      await AsyncStorage.getItem('Mechanicdata').then((res) => {
        res = JSON.parse(res);
        console.log(this.state.data, 'Agya Oy Data');
        this.setState({data: res});
        this.setState({
          firstname: this.state.data.firstname,
        });
        this.setState({
          lastname: this.state.data.lastname,
        });
        this.setState({
          email: this.state.data.email,
        });
        this.setState({
          photo: this.state.data.photo,
        });
      });
    } catch (error) {
      console.log('error');
    }
  };

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#ccc', flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          backgroundColor={'transparent'}
        />
        {/* <View style={{ backgroundColor: 'red', flex: 1 }}> */}
        <LinearGradient
          colors={colors.orablu}
          start={{x: -0.9, y: 1}}
          end={{x: 1, y: 0}}
          style={[style.flex1, style.shadow]}>
          <ScrollView style={{}}>
            <View style={appStyle.borderContainer}>
              <TouchableOpacity>
                <View style={[style.row, style.mt40, style.mh20]}>
                  <View style={[style.mr15]}>
                    <Image
                      style={image.mediumovalcontainerupload}
                      source={{uri: this.state.photo}}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={style.mr5}>
                      <Text style={[text.text16, text.white, text.semibold]}>
                        {this.state.firstname} {this.state.lastname}
                      </Text>
                      <Text style={[text.text12, text.white, text.semibold]}>
                        {this.state.email}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('UserProfileDetail');
              }}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.saved}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.white}]}>
                    Saved
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            //   onPress={() => {
            //     this.props.navigation.navigate('MyBooking');
            //   }}
            >
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.calendar}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.white}]}>
                    My Booking
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            //   onPress={() => {
            //     this.props.navigation.navigate('Setting');
            //   }}
            >
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.setting}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.white}]}>
                    Settings
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            //   onPress={() => {
            //     this.props.navigation.navigate('InviteFriend');
            //   }}
            >
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.percent}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.white}]}>
                    Invite a Friend
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._Signout}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.logout}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.white}]}>
                    Logout
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
