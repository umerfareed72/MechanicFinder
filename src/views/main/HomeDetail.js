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

export default class HomeDetail extends Component {
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
      BookNowView: 'flex',
      CheckBox: images.checkBoxEmpty,
      mechanicdata: [],
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  getData = async () => {
    try {
      await AsyncStorage.getItem('data').then((res) => {
        res = JSON.parse(res);
        this.setState({mechanicdata: res});
      });
    } catch (error) {}
  };
 async componentDidMount() {
    const {navigation} = this.props;
    this.getData();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
    });
  }
  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'flex'}),
        this.setState({ColorOverview: colors.darkBlue}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorGallery: colors.inputBordercolor});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({BookNowView: 'flex'});
    this.setState({ColorOverview: colors.darkBlue});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorGallery: colors.inputBordercolor});
  };

  tabGallery = () => {
    if (this.state.TabDataGallery == 'flex') {
      this.setState({TabDataOverview: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorGallery: colors.darkBlue});
    } else
      this.setState({TabDataGallery: 'flex'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorGallery: colors.darkBlue});
  };

  tabReview = () => {
    if (this.state.TabDataReview == 'flex') {
      this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.darkBlue}),
        this.setState({ColorGallery: colors.inputBordercolor});
    } else
      this.setState({TabDataReview: 'flex'}),
        this.setState({TabDataGallery: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataOverview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.darkBlue});
    this.setState({ColorGallery: colors.inputBordercolor});
  };

  Checked = () => {
    if (this.state.CheckBox == images.checkBoxEmpty) {
      this.setState({CheckBox: images.checkBoxTick});
    } else {
      this.setState({CheckBox: images.checkBoxEmpty});
    }
  };
  buyItems = async () => {
    await AsyncStorage.getItem('userdata').then((response) => {
      const res = JSON.parse(response);
      const userid = res._id;
      const mechanicid = this.state.mechanicdata.mechanicid;
      axios
        .post(URL.Url + 'addbookedUser/' + mechanicid + '/' + userid)
        .then((res) => {
        console.log('Mechanic Booked Successfully')
        });
    });
    setTimeout(() => {
      if (this.state.CheckBox == images.checkBoxTick) {
        this.props.navigation.navigate('BuyItems');
      } else {
        this.setState({BookNowView: 'none'});

        this.props.navigation.navigate('BookNow');
      }
    }, 3000);
  };
  render() {
    const {mechanicdata} = this.state;
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar />

        {/*Body */}
        <View style={{}}>
          <ImageBackground
            source={images.userImg}
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
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  fullStarColor={'#fff'}
                  emptyStarColor={'#fff'}
                  starSize={20}
                  containerStyle={{width: 110, marginTop: 3}}
                />
              </View>

              <View style={[style.mv5]}>
                <Text style={[text.heading1, text.bold]}>
                  {mechanicdata.firstname} {mechanicdata.lastname}
                </Text>
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.paraWhite, text.regular]}>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={[appStyle.bodyBg, style.flex1]}>
          <View
            style={[
              appStyle.rowBtw,
              appStyle.bodyLayout,
              appStyle.bodyShadowTop,
              {backgroundColor: '#fff'},
            ]}>
            <TouchableOpacity onPress={() => this.tabOverview()}>
              <Text
                style={[
                  text.tab1,
                  text.semibold,
                  {color: this.state.ColorOverview},
                ]}>
                Overview
              </Text>
            </TouchableOpacity>
            {/* 
            <TouchableOpacity onPress={() => this.tabGallery()}>
              <Text
                style={[
                  text.tab1,
                  text.semibold,
                  {color: this.state.ColorGallery},
                ]}>
                Gallery
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => this.tabReview()}>
              <Text
                style={[
                  text.tab1,
                  text.semibold,
                  {color: this.state.ColorReview},
                ]}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={[appStyle.bottomBorder]}></View> */}

          <ScrollView style={style.mv5}>
            {/* OverView Tab */}
            <View
              style={[
                appStyle.bodyLayout,
                {display: this.state.TabDataOverview},
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
                  {mechanicdata.address} {mechanicdata.city}{' '}
                  {mechanicdata.country}
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
                  {mechanicdata.vehicletype}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.Company}></Image>
                <Text style={[text.heading2, text.bold]}>Car Brand</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  {mechanicdata.carcompany}
                </Text>
              </View>

              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, image.Orange, style.mr5]}
                  source={images.carservice}></Image>
                <Text style={[text.heading2, text.bold]}>Skills Type</Text>
              </View>
              <View style={[style.borderbottom, style.mv10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  {mechanicdata.skilltype}
                </Text>
              </View>
              <View style={[style.mt20]}>
                <Text style={[text.text16]}>Some Description</Text>
              </View>
              <View style={[style.pv10]}>
                <Text style={[text.paraGray]}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo.
                </Text>
              </View>
              <TouchableOpacity
                style={[style.row, style.mt10, style.aiCenter]}
                onPress={this.Checked}>
                <Image
                  style={image.InputImage}
                  source={this.state.CheckBox}></Image>
                <Text style={[text.text18, text.darkBlue]}>
                  Are You Want To Buy Items
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                style.mb50,
                appStyle.bodyLayout,
                appStyle.bodyShadowBottom,
                {
                  backgroundColor: colors.white,
                  display: this.state.BookNowView,
                },
              ]}>
              <View style={[appStyle.rowCenter]}>
                <View>
                  <Text
                    style={
                      ({color: colors.Black323}, [text.text22, text.bold])
                    }>
                    $5
                  </Text>
                  <Text style={([text.text14], {color: colors.gray})}>
                    Per Day
                  </Text>
                </View>
                <View style={[{display: this.state.BookNowView}, style.flex1]}>
                  <TouchableOpacity onPress={this.buyItems}>
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
                        Book Now
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={[
                appStyle.bodyLayout,
                {display: this.state.TabDataReview},
              ]}>
              <View style={[style.row, style.mv5, style.aiCenter]}>
                <View style={[style.flex1, style.mr5]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View style={{flex: 4}}>
                  <View style={[style.row]}>
                    <Text style={[style.mr5]}>Peter & Co</Text>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#F59E52'}
                      emptyStarColor={'#F59E52'}
                      starSize={15}
                      containerStyle={{width: 80, marginTop: 2}}
                    />
                  </View>
                  <View>
                    <Text style={[text.text12]}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[style.row, style.mv5, style.aiCenter]}>
                <View style={[style.flex1, style.mr5]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View style={{flex: 4}}>
                  <View style={[style.row]}>
                    <Text style={[style.mr5]}>Peter & Co</Text>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#F59E52'}
                      emptyStarColor={'#F59E52'}
                      starSize={15}
                      containerStyle={{width: 80, marginTop: 2}}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={[text.text12]}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[style.row, style.mv5, style.aiCenter]}>
                <View style={[style.flex1, style.mr5]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View style={{flex: 4}}>
                  <View style={[style.row]}>
                    <Text style={[style.mr5]}>Peter & Co</Text>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'#F59E52'}
                      emptyStarColor={'#F59E52'}
                      starSize={15}
                      containerStyle={{width: 80, marginTop: 2}}
                    />
                  </View>
                  <View style={{}}>
                    <Text style={[text.text12]}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut
                    </Text>
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
