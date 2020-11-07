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
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
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
import Modal from 'react-native-modal';
import Login from '../registration/Login';

export default class AdminSetting extends Component {
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
  }
  onSignout = () => {
    const {navigation}=this.props;
  
    AsyncStorage.removeItem('atoken').then(() => {
      setTimeout(() => {
       navigation.navigate('LoginA sAdmin') 
      }, 1000);
    });
   
  };
  render() {
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
                      this.props.navigation.navigate('LoginAsAdmin');
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
          <View style={style.mh20} >
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
                source={{uri: this.state.photo}}
              />
              {/* <Text style={[text.text18,text.orange,text.semibold]}>Sam Adams</Text> */}
            </View>
            <View style={[style.asCenter, style.pt5]}>
              <Text style={[text.text18, text.orange, text.semibold]}>
                Admin
              </Text>
            </View>
            {/* header end */}

            {/* body */}
            <View style={[style.mt30]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UserManagement')}
                style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.userPurple}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                    Manage User 
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
                onPress={() => this.props.navigation.navigate('MechanicManagement')}
                style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.userPurple}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                    Manage Mechanic 
                    </Text>
                  </View>

                  <Image
                    style={image.drawerIconmedium}
                    source={images.arrowRightPurple}
                  />
                </View>

                <View style={style.borderBottomNav} />
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Complaints')}
                style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.terms}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                 Complaints
                    </Text>
                  </View>

                  <Image
                    style={image.drawerIconmedium}
                    source={images.arrowRightPurple}
                  />
                </View>

                <View style={style.borderBottomNav} />
              </TouchableOpacity> */}

              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Privacy')}
                style={[style.mb20]}>
                <View style={[style.rowBtw]}>
                  <View style={[style.row, style.aiCenter]}>
                    <Image
                      style={image.drawerIconmedium}
                      source={images.legalIcon}
                    />
                    <Text style={[text.text18, text.purple, style.pl15]}>
                      Edit Policies
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
