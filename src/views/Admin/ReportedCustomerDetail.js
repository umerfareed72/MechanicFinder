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
} from 'react-native';
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

export default class ReportedCustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDataOverview: 'flex',
      TabDataGallery: 'none',
      TabDataReview: 'none',
      ColorOverview: colors.darkBlue,
      ColorGallery: colors.inputBordercolor,
      ColorReview: colors.inputBordercolor,
      BookNowView: 'none',
      CheckBox: images.checkBoxEmpty,

      reportdata: [],
      mdbid: '',
      userid: '',

      reportid: '',
      mid: '',
    };
  }

  getData = async () => {
    console.log('in get data');
    try {
      await AsyncStorage.getItem('mreportdata').then((res) => {
        res = JSON.parse(res);
        this.setState({reportdata: res});
        this.setState({reportid: res._id});
        this.setState({mdbid: res.mdbid});
        this.setState({userid: res.userdbid});
      });
      // await AsyncStorage.getItem('usersignintoken').then((res) => {
      //   // res = JSON.parse(res);
      //   console.log('response firstname',res)

      // });
    } catch (error) {}
  };
  async componentDidMount() {
    this.getData();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
    });
  }

  gettingdatamechanicuser = () => {
    axios
      .get(URL.Url + 'user/' + this.state.userid)
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({cphone: response.data.phone});
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(URL.Url + 'mechanic/' + this.state.mdbid)
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({mphone: response.data.phone});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({ColorOverview: colors.darkBlue}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorGallery: colors.inputBordercolor});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({BookNowView: 'none'});
    this.setState({ColorOverview: colors.darkBlue});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorGallery: colors.inputBordercolor});
  };

  render() {
    const {reportdata} = this.state;
    console.log(this.state.firstname);
    console.log(this.state.reportid);
    console.log('mdbidddd', this.state.mdbid);
    console.log('udbidddd', this.state.userid);

    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar />
        <View style={{}}>
          <ImageBackground
            source={{uri: this.state.reportdata.userphoto}}
            style={{height: screenHeight.height35}}>
            <View style={style.bgOverlay} />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Reportedmechanics')
              }
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>
            <View style={[appStyle.headInner, style.ph20]}>
              <View style={[style.mv5]}>
                {/* <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  fullStarColor={'#fff'}
                  emptyStarColor={'#fff'}
                  starSize={20}
                  containerStyle={{width: 110, marginTop: 3}}
                /> */}
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.heading1, text.bold]}>
                  {reportdata.reporttype} Issue in {reportdata.date}
                </Text>
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.paraWhite, text.regular]}>
                  You can view mechanic details and user details...
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[appStyle.bodyBg, style.flex1]}>
          <ScrollView style={style.mv5}>
            <View
              style={[
                appStyle.bodyLayout,
                {display: this.state.TabDataOverview},
              ]}>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5]}
                  source={images.help}></Image>
                <Text style={[text.heading2, text.bold]}>
                  Report Description{' '}
                </Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {reportdata.reportdescription}
                </Text>
              </View>

              <View style={[style.pv10]}>
                <Text style={[text.paraGray]}>{reportdata.description}</Text>
              </View>
              <View
                style={[
                  style.mb50,
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
                      Customer
                    </Text>
                    <Text style={([text.text14], {color: colors.gray})}>
                      (Report this Issue)
                    </Text>
                  </View>
                  <View
                    style={[{display: this.state.tabOverview}, style.flex1]}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('CustomerDetail', {
                          userid: this.state.userid,
                        })
                      }>
                      <View
                        style={[
                          button.buttoncontainer,
                          {backgroundColor: colors.purple},
                        ]}>
                        <Text
                          style={[
                            {color: colors.white},
                            button.touchablebutton,
                            text.semibold,
                          ]}>
                          View Profile
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={[
                  style.mb50,
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
                        ({color: colors.orangeGradient},
                        [text.text22, text.bold])
                      }>
                      Mechanic
                    </Text>
                    <Text style={([text.text14], {color: colors.orange})}>
                      (Reported)
                    </Text>
                  </View>
                  <View
                    style={[{display: this.state.tabOverview}, style.flex1]}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('RMechanicprofile', {
                          mdbid: this.state.mdbid,
                        })
                      }>
                      <View
                        style={[
                          button.buttoncontainer,
                          {backgroundColor: colors.purple},
                        ]}>
                        <Text
                          style={[
                            {color: colors.white},
                            button.touchablebutton,
                            text.semibold,
                          ]}>
                          View Profile
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Reviews Tab End  */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
