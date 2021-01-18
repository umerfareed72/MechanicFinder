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
  Alert,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
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
import Textarea from 'react-native-textarea';

export default class RMechanicprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDataOverview: 'flex',
      TabDataReview: 'none',
      ColorOverview: colors.white,
      ColorReview: colors.gray,
      BookNowView: 'none',
      CheckBox: images.checkBoxEmpty,
      suggestion: '',
      suggestiondata: [],
      mechanicdata: [],
      warnings: [],
      firstname: '',
      issueid: '',
      mdbid: this.props.navigation.getParam('mdbid', 'nothing sent'),
      warning: '',
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  async componentDidMount() {
    this.getmechanicdata();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getmechanicdata();
    });
  }

  getwarning = () => {
    axios
      .get(URL.Url + 'getMwarning/' + this.state.mechanicdata._id)
      .then((response) => {
        this.setState({warnings: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getmechanicdata = () => {
    axios
      .get(URL.Url + 'mechanic/' + this.state.mdbid)
      .then((response) => {
        if (response.data) {
          this.setState({mechanicdata: response.data});
          console.log('mechanicdata', this.state.mechanicdata);
        }
      })
      .then(() => {
        this.getwarning();
      })
      .catch((error) => {
        console.log(error);
      });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  deletemechanic = () => {
    axios
      .delete(URL.Url + 'deletemechanic/' + this.state.mdbid)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          ToastAndroid.show(
            'Mechanic Account Deleted Successfully',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
          this.props.navigation.navigate('Reportedmechanics');
        }
      })
      .catch((error) => {
        console.log('ye lo 2', error);
        Alert.alert('something is wrong');
      });
  };

  deletewarning = (id) => {
    const reportdata = this.state.warnings[id];
    console.log(reportdata);
    axios
      .delete(URL.Url + 'Mdeletewarning/' + reportdata._id)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          ToastAndroid.show(
            'Warning Deleted Successfully!',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
          this.getwarning();
        }
      })
      .catch((error) => {
        console.log('ye lo 2', error);
        Alert.alert('something is wrong');
      });
  };

  sendwarning = () => {
    axios
      .post(URL.Url + 'sendwarning', {
        warning: this.state.warning,
        mdbid: this.state.mdbid,
      })
      .then(async (res) => {
        console.log(res.data);
        //console.log(this.state.mdbid);
        ToastAndroid.show(
          'Warning Send Successfully',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        this.toggleModal();
      })
      .catch((error) => {
        ToastAndroid.show(
          'Warning not posted try again!!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );

        console.log(error);
      });
  };

  blockmechanic = () => {
    axios
      .put(URL.Url + 'blockmechanic/' + this.state.mdbid, {
        warning: this.state.warning,
        mdbid: this.state.mdbid,
      })
      .then(async (res) => {
        console.log(res.data);
        //console.log(this.state.mdbid);
        ToastAndroid.show(
          'Blocked Successfully',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        this.toggleModal();
      })
      .catch((error) => {
        ToastAndroid.show(
          'Warning not posted try again!!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );

        console.log(error);
      });
  };

  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({ColorOverview: colors.white}),
        this.setState({ColorReview: colors.gray});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({TabDataReview: 'none'});
    this.setState({BookNowView: 'none'});
    this.setState({ColorOverview: colors.white});
    this.setState({ColorReview: colors.gray});
  };
  tabReview = () => {
    if (this.state.TabDataReview == 'flex') {
      this.setState({TabDataOverview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.gray}),
        this.setState({ColorReview: colors.white});
    } else
      this.setState({TabDataReview: 'flex'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataOverview: 'none'});
    this.setState({ColorOverview: colors.gray});
    this.setState({ColorReview: colors.white});
    this.getwarning();
  };
  render() {
    const {mechanicdata, warnings} = this.state;
    console.log(this.state.firstname);
    console.log(this.state.issueid);
    console.log('ye ai id profile pa', this.state.mdbid);
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
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
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={style.aiFlexEnd}>
                    <TouchableOpacity onPress={this.toggleModal}>
                      <Image
                        style={[image.large, image.Orange]}
                        source={images.cancel}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={[style.aiCenter, style.mb10]}>
                    <Text style={[text.h1]}>Manage Mechanic</Text>
                  </View>
                  <View style={[style.mb5, style.aiCenter]}>
                    <Text style={[text.heading3]}>Add Warning</Text>
                  </View>

                  <View style={[style.aiCenter]}>
                    <View style={[appStyle.textareaBorder, style.w100]}>
                      <Textarea
                        onChangeText={(text) => {
                          this.setState({warning: text});
                        }}
                        placeholder={'Type Warning message here'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                      />
                    </View>
                  </View>
                  <View style={[style.rowBtw, style.mt40]}>
                    <TouchableOpacity
                      onPress={this.sendwarning}
                      style={[button.Profilebutton, {marginTop: 20}]}>
                      <Text style={[button.bookbutton, text.center]}>
                        Send Warning
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.blockmechanic}
                      style={[button.Profilebutton, {marginTop: 20}]}>
                      <Text style={[button.bookbutton, text.center]}>
                        Block Account
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>

        <View style={{}}>
          <ImageBackground
            source={{uri: mechanicdata.photo}}
            style={{height: screenHeight.height25}}>
            <View style={style.bgOverlay} />
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>
            <View style={[appStyle.headInner, style.ph20]}>
              <View style={[style.mv5]}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={mechanicdata.rating}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  fullStarColor={'#fff'}
                  emptyStarColor={'#fff'}
                  starSize={20}
                  containerStyle={{width: 110, marginTop: 3}}
                />
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.heading1, text.bold]}>Mechanic Detail </Text>
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.paraWhite, text.regular]}>
                  You can delete mechanic account or generate warning message
                  for mechanic(According to issue)
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[appStyle.bodyBg, style.flex1]}>
          <View
            style={[
              appStyle.rowBtw,
              style.aiCenter,
              appStyle.bodyLayout,
              appStyle.bodyShadowTop,
              style.mh40,
              {
                backgroundColor: colors.lightblue,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
            ]}>
            <TouchableOpacity onPress={() => this.tabOverview()}>
              <Text
                style={[
                  text.heading2,
                  text.semibold,
                  {color: this.state.ColorOverview},
                ]}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.tabReview()}>
              <Text
                style={[
                  text.heading2,
                  text.semibold,
                  {color: this.state.ColorReview},
                ]}>
                Warnings
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={style.mv5}>
            {/* OverView Tab */}
            <View
              style={[
                appStyle.bodyLayout,
                {display: this.state.TabDataOverview},
              ]}>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, {tintColor: colors.orange}]}
                  source={images.username}></Image>
                <Text style={[text.heading2, text.bold]}>Mechanic Name</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]} selectable>
                  {' '}
                  {this.state.mechanicdata.firstname}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.phone}></Image>
                <Text style={[text.heading2, text.bold]}>Contact Number</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}> {mechanicdata.phone}</Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.cartype}></Image>
                <Text style={[text.heading2, text.bold]}>Mechanic Type</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  {mechanicdata.vehicletype}
                </Text>
              </View>

              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, image.Orange, style.mr5]}
                  source={images.carservice}></Image>
                <Text style={[text.heading2, text.bold]}>Specialist in </Text>
              </View>
              <View style={[style.borderbottom, style.mv10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  {mechanicdata.skilltype}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, image.Orange, style.mr5]}
                  source={images.location}></Image>
                <Text style={[text.heading2, text.bold]}>Mechanic City</Text>
              </View>
              <View style={[style.borderbottom, style.mv10]}>
                <Text style={[text.heading2Gray]}> {mechanicdata.city}</Text>
              </View>
              <TouchableOpacity
                style={[button.buttonTheme]}
                onPress={this.toggleModal}>
                <Text style={[text.btntext]}>Manage Mechanic</Text>
              </TouchableOpacity>
            </View>

            {/* Reviews Tab End  */}
            <View style={[{display: this.state.TabDataReview}, style.mh10]}>
              {warnings.map((warn, index) => {
                return (
                  <TouchableOpacity
                    style={[appStyle.slotCard, style.w100, style.row]}>
                    <View style={[style.w10, style.aiCenter]}>
                      <Image
                        style={[image.Image30, style.mh10]}
                        source={{uri: mechanicdata.photo}}
                      />
                    </View>
                    <View style={[style.mh10]}>
                      <Text style={[text.text16, text.bold]}>
                        {mechanicdata.firstname} {mechanicdata.lastname}
                      </Text>
                      <View style={[style.row]}>
                        <Text style={[text.paraGray, text.text10]}>
                          Last Updated
                        </Text>
                        <Text style={[style.mh5, text.text10]}>
                          {moment(warn.date).format('DD-MM-YYYY')}
                        </Text>
                      </View>

                      <View style={[style.w80]}>
                        <Text style={[text.heading3, style.mv5]}>
                          {warn.warning}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.deletewarning(index);
                      }}>
                      <Image
                        style={[image.forward]}
                        source={images.delete}></Image>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
