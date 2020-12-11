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
  Button,
  Platform,

} from 'react-native';
import {connect} from 'react-redux';
import {logout} from "../../actions/index";

import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import Hamburger from '../../components/headerComponent/Hamburger';

import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Login from '../registration/Login';

 class MechanicSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      photo: null,
      firstname: 'Username',
      lastname: '',
      isModalVisible: false,
      isLogin: null,
    };
    // this.state = {
    //     loading: false,
    //     items: [],
    //     refreshing: false,
    // };
  }
  // onSignout = () => {
  //   const {navigation}=this.props;
  
  //   AsyncStorage.removeItem('token').then(() => {
  // AsyncStorage.removeItem('Mechanicdata')
  //     setTimeout(() => {
  //       navigation.navigate('LoginasMechanic') 
  //     }, 2000);
  //   });
   
  // };
  onSignout = () => {
    const {navigation} = this.props;
    // const login = new Login();
    // login._signOut();
    navigation.navigate('LoginasMechanic');
    this.props.logout()
  };
  // LoginUserData = () => {
  //   try {
  //     AsyncStorage.getItem('Mechanicdata').then((res) => {
  //       res = JSON.parse(res);
  //       console.log(this.state.data, 'User data');
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

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  // componentDidMount() {
  //   const {navigation} = this.props;
  //   this.LoginUserData();
  //   this.focusListener = navigation.addListener('didFocus', () => {
  //     this.LoginUserData();
  //   });
  // }
  render() {
    const {auth}=this.props
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />

        <View style={{}}>
          <Modal
            isVisible={this.state.isModalVisible}
            animationInTiming={500}
            animationOutTiming={500}>
            <View style={[style.flex1, appStyle.rowCenter]}>
              <View style={[appStyle.modalBg]}>
                <Text style={[]}>Are You Sure?</Text>
                <View style={[style.row, style.mt10]}>
                  <TouchableOpacity
                    style={[style.mh10]}
                    onPress={this.toggleModal}>
                    <View style={[button.modalButton]}>
                      <Text style={[text.heading5white]}>No</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[style.mh10]}
                    onPress={() => {
                      this.props.navigation.navigate('LoginasMechanic');
                    }}>
                    <View style={[button.modalButton]}>
                      <Text style={[text.heading5white]}>Yes</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/*Body */}
        <View style={{marginTop: 40}} />

        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <View style={{postion: 'absolute', top: 0, left: -5}}>
            <Hamburger tintColor={colors.purple} />
          </View>
          <View>
            <Text style={[text.heading1purple, text.bold]}>Settings</Text>
          </View>
          <View style={{height: 20, width: 40}}></View>
        </View>

        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout, style.mt20]}>
            {/* header */}
            <View style={style.asCenter}>
              <Image
                style={[image.ovalcontainerupload, style.shadow]}
                source={{uri: auth.user.photo}}
              />
              {/* <Text style={[text.text18,text.orange,text.semibold]}>Sam Adams</Text> */}
            </View>
            <View style={[style.asCenter, style.pt5]}>
              <Text style={[text.text18, text.orange, text.semibold]}>
                {auth.user.firstname} {auth.user.lastname}
              </Text>
            </View>
            {/* header end */}

            {/* body */}
            <View style={[style.mt30]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditMechanicProfile')}
                style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.userPurple}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                      Edit Profile
                    </Text>
                  </View>

                  <Image
                    style={image.drawerIconmedium}
                    source={images.arrowRightPurple}
                  />
                </View>

                <View style={style.borderBottomNav} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MechanicHelp')}
                style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.help}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                      Help
                    </Text>
                  </View>

                  <Image
                    style={image.drawerIconmedium}
                    source={images.arrowRightPurple}
                  />
                </View>

                <View style={style.borderBottomNav} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MechanicTerms')}
                style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.terms}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                      Terms of Service
                    </Text>
                  </View>

                  <Image
                    style={image.drawerIconmedium}
                    source={images.arrowRightPurple}
                  />
                </View>

                <View style={style.borderBottomNav} />
              </TouchableOpacity>

              

              <TouchableOpacity onPress={this.onSignout} style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.logoutPurple}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                      Logout
                    </Text>
                  </View>

                  <Image
                    style={image.drawerIconmedium}
                    source={images.arrowRightPurple}
                  />
                </View>

                <View style={style.borderBottomNav} />
              </TouchableOpacity>
            </View>
            {/* body end */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MechanicSetting);
