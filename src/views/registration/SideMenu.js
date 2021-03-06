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
import Login from '../registration/Login';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {ListItem, Separator} from 'native-base';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import {SafeAreaView} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {logout} from "../../actions/index";
navigateToScreen = (route) => () => {
  const navigateAction = NavigationActions.navigate({
    routeName: route,
  });
  this.props.navigation.dispatch(navigateAction);
};
class SideMenu extends React.Component {
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

  // async componentDidMount() {
  //   const {navigation} = this.props;
  //   this.LoginUserData();
  //   this.focusListener = navigation.addListener('didFocus', () => {
  //     this.LoginUserData();
  //   });
  // }
  onSignout = () => {
    const {navigation} = this.props;
    // const login = new Login();
    // login._signOut();
    navigation.navigate('Login');
    this.props.logout()
  };
  
  // LoginUserData = async () => {
  //   try {
  //     await AsyncStorage.getItem('userdata').then((res) => {
  //       res = JSON.parse(res);
  //       console.log(this.state.data, 'Agya Oy Data');
  //       this.setState({data: res});
  //       this.setState({
  //         firstname: this.state.data.firstname,
  //       });
  //       this.setState({
  //         lastname: this.state.data.lastname,
  //       });
  //       this.setState({
  //         email: this.state.data.email,
  //       });
  //       this.setState({
  //         photo: this.state.data.photo,
  //       });
  //     });
  //   } catch (error) {
  //     console.log('error');
  //   }
  // };

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const {auth} = this.props;
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
                      source={{uri: auth.user.photo}}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={style.w90}>
                      <Text style={[text.text16, text.white, text.semibold]}>
                        {auth.user.firstname} {auth.user.lastname}
                      </Text>
                      <Text style={[text.text12, text.white, text.semibold]}>
                        {auth.user.email}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ProfileDetail');
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
              onPress={() => {
                this.props.navigation.navigate('MyBooking');
              }}>
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
              onPress={() => {
                this.props.navigation.navigate('Setting');
              }}>
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
              onPress={() => {
                this.props.navigation.navigate('IssueListC');
              }}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.percent}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.white}]}>
                    Posted Issues
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Rates');
              }}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.dollar}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.white}]}>
                    Service Rates
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onSignout}>
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
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
