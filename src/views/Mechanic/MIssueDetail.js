import React, { Component } from 'react';
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
  Linking,
  Alert, ToastAndroid
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
import Modal from 'react-native-modal';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
class HomeDetail extends Component {
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
      suggestion: '',
      issuedata: {},
      suggestiondata: [],
      firstname: '',
      issueid: '',
      mid: '',
      mphoto: '',
      phone: '',
      isModalVisible: false,

    };
  }

  getData = async () => {
    try {
      await AsyncStorage.getItem('issuedata').then((res) => {
        res = JSON.parse(res);
        this.setState({ issuedata: res });
        this.setState({ issueid: res._id });
        this.setState({ phone: res.phone })
      });

      this.setState({ firstname: this.props.auth.user.firstname });
      this.setState({ mphoto: this.props.auth.user.photo });
      this.setState({ mid: this.props.auth.user.mechanicid })
      console.log('mid new', this.state.mid);
      console.log('mphoto', this.state.mphoto);

    } catch (error) { }
  };
  async componentDidMount() {
    const { navigation } = this.props;
    console.log('in mechanic data', this.props.auth.user.mechanicid)
    this.getData();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
    });
  }

  getsuggestions = () => {
    axios
      .get(URL.Url + 'issuessuggestion/' + this.state.issueid)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.setState({ suggestiondata: response.data });
          console.log(this.state.suggestiondata);


        }
        if (this.state.suggestiondata == '') ToastAndroid.show(
          'No Suggestion available',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        // if (this.state.suggestiondata == '') Alert.alert('Sorry no issue available!');
      })
      .catch((error) => {
        console.log(error);
      });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      console.log(this.state.phone);
      phoneNumber = 'tel:' + this.state.phone;
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  submitsuggestion = () => {
    console.log("in sugestion posting")
    axios
      .post(URL.Url + 'postsuggestion', {
        suggestion: this.state.suggestion,
        issueid: this.state.issueid,
        firstname: this.state.firstname,
        mid: this.state.mid,
        mphoto: this.state.mphoto
      })
      .then((res) => {
        console.log(res.data);
        ToastAndroid.show(
          'Suggestion posted!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        this.getsuggestions();
      })
      .catch((error) => {
        Alert.alert('something went Wrong!!');

        console.log(error);
      });
  };

  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({ TabDataGallery: 'none' }),
        this.setState({ TabDataReview: 'none' }),
        this.setState({ BookNowView: 'none' }),
        this.setState({ ColorOverview: colors.darkBlue }),
        this.setState({ ColorReview: colors.inputBordercolor }),
        this.setState({ ColorGallery: colors.inputBordercolor });
    } else
      this.setState({ TabDataOverview: 'flex' }),
        this.setState({ TabDataGallery: 'none' }),
        this.setState({ TabDataReview: 'none' });
    this.setState({ BookNowView: 'none' });
    this.setState({ ColorOverview: colors.darkBlue });
    this.setState({ ColorReview: colors.inputBordercolor });
    this.setState({ ColorGallery: colors.inputBordercolor });
  };
  tabReview = () => {
    if (this.state.TabDataReview == 'flex') {
      this.setState({ TabDataGallery: 'none' }),
        this.setState({ TabDataOverview: 'none' }),
        this.setState({ BookNowView: 'none' }),
        this.setState({ color: 'none' });
      this.setState({ ColorOverview: colors.inputBordercolor }),
        this.setState({ ColorReview: colors.darkBlue }),
        this.setState({ ColorGallery: colors.inputBordercolor });
    } else
      this.setState({ TabDataReview: 'flex' }),
        this.setState({ TabDataGallery: 'none' }),
        this.setState({ BookNowView: 'none' }),
        this.setState({ TabDataOverview: 'none' });
    this.setState({ ColorOverview: colors.inputBordercolor });
    this.setState({ ColorReview: colors.darkBlue });
    this.setState({ ColorGallery: colors.inputBordercolor });
    this.getsuggestions();
  };
  render() {
    const { issuedata } = this.state;
    console.log(this.state.firstname)
    console.log(this.state.issueid);

    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar />
        <View style={{}}>
          <Modal
            isVisible={this.state.isModalVisible}
            animationInTiming={500}
            animationOutTiming={500}>
            <View style={[style.flex1, appStyle.rowCenter]}>
              <TouchableOpacity
                style={[appStyle.DashboardslotCard, style.w90, style.aiCenter]}
                onPress={this.toggleModal}>
                <View style={[style.mv10, style.aiCenter]}>
                  <Text style={[text.h1]}>Preview Image</Text>
                  <Text style={[text.heading2Gray]}>{this.state.title}</Text>
                </View>
                <Image
                  source={{ uri: issuedata.issuevideo }}
                  style={[
                    {
                      height: '70%',
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      borderRadius: 10,
                    },
                    style.w100,
                  ]}></Image>
                <TouchableOpacity
                  style={[button.buttonTheme, style.mt30, style.w50]}
                  onPress={this.toggleModal}>
                  <Text style={[button.btntext1]}> Close Preview </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress={this.toggleModal}>
          <ImageBackground
            source={{ uri: issuedata.issuevideo }}
            style={{ height: screenHeight.height25 }}>
            <View style={style.bgOverlay} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("IssueList")}
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
                  {issuedata.carcompany} {issuedata.vehicaltype} Issue in{' '}
                  {issuedata.city}
                </Text>
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.paraWhite, text.regular]}>
                  Give your point of View about this issue share your
                  suggestions.....
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={[appStyle.bodyBg, style.flex1]}>
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
            ]}
          >
            <TouchableOpacity onPress={() => this.tabOverview()}>
              <Text
                style={[
                  text.heading2,
                  text.semibold,
                  { color: this.state.ColorOverview },
                ]}>
                Overview
              </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.tabReview()}>
              <Text
                style={[
                  text.heading2,
                  text.semibold,
                  { color: this.state.ColorReview },
                ]}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={style.mv5}>
            {/* OverView Tab */}
            <View
              style={[
                appStyle.bodyLayout,
                { display: this.state.TabDataOverview },
              ]}>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5]}
                  source={images.location}></Image>
                <Text style={[text.heading2, text.bold]}>Address</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  {issuedata.address} {issuedata.city} {issuedata.country}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.cartype}></Image>
                <Text style={[text.heading2, text.bold]}>Vehicle Type</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  {issuedata.vehicaltype}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.Company}></Image>
                <Text style={[text.heading2, text.bold]}>Car Brand</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}> {issuedata.carcompany}</Text>
              </View>

              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, image.Orange, style.mr5]}
                  source={images.carservice}></Image>
                <Text style={[text.heading2, text.bold]}>Issue Type</Text>
              </View>
              <View style={[style.borderbottom, style.mv10]}>
                <Text style={[text.heading2Gray]}> {issuedata.issuetype}</Text>
              </View>

              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, image.Orange, style.mr5]}
                  source={images.phone}></Image>
                <Text style={[text.heading2, text.bold]}>Contact (Press to call)</Text>
              </View>
              <View style={[style.borderbottom, style.mv10]}>
                <Text onPress={this.makeCall}
                  style={[text.heading2Gray]}> {issuedata.phone}</Text>
              </View>

              <View style={[style.mt20]}>
                <Text style={[text.text16]}>Description about issue</Text>
              </View>
              <View style={[style.pv10]}>
                <Text style={[text.paraGray]}>{issuedata.description}</Text>
              </View>
            </View>

            {this.state.suggestiondata.map((data, index) => {
              console.log('YE LO', data.firstname)
              console.log('YE LO pp', data)

              return (
                <TouchableOpacity
                  key={index}
                  // onPress={()=>{this.props.navigation.navigate("HomeDetail")}}

                  style={[
                    appStyle.slotCard,
                    appStyle.rowJustify,
                    style.aiCenter,
                    { display: this.state.TabDataReview },
                  ]}>
                  <View style={[style.row, style.aiCenter]}>
                    <View style={style.mr10}>
                      <Image style={image.userImg} source={{ uri: data.mphoto }} />
                    </View>

                    <View style={[style.rowBtw, style.aiCenter]}>
                      <View style={[style.mr15]}>
                        <Image
                          source={images.imagep}
                          style={[image.image50]}></Image>
                      </View>
                      <View>
                        <View>
                          <Text style={[text.text16, text.bold]}>
                            {data.firstname}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <Text style={[text.text15, { color: colors.gray }]}>
                            {data.suggestion}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}


            <View
              style={[
                appStyle.bodyLayout,
                { display: this.state.TabDataReview },
              ]}>
              <TextInput
                style={{ height: 40, width: "95%", borderColor: 'gray', borderWidth: 2, borderRadius: 20, marginBottom: 20, fontSize: 18 }}
                placeholder=" Type Suggestion about issue"
                secureTextEntry={true}
                multiline={true}
                secureTextEntry={false}
                onChangeText={(text) => {
                  this.setState({
                    suggestion: text,
                  });

                }}
                underlineColorAndroid="transparent"></TextInput>

              <TouchableOpacity onPress={this.submitsuggestion}>
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
                    Add Suggestion
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Reviews Tab End  */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(HomeDetail);