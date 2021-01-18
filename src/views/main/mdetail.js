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
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default class Mdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      BookNowView: 'none',
      CheckBox: images.checkBoxEmpty,
      suggestion: '',
      suggestiondata: [],
      mechanicdata: [],
      firstname: '',
      issueid: '',
      mid: '',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.getData();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
    });
  }

  getmechanicdata = (id) => {
    console.log("mechanic id", id)
    axios
      .get(URL.Url + 'mechanic/' + id)
      .then((response) => {
        this.setState({ mechanicdata: response.data });
        console.log('mechanicdata', this.state.mechanicdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getData = async () => {
    try {
      AsyncStorage.getItem('Mechanicidfromsuggestion').then((res) => {
        const id = JSON.parse(res);
        this.setState({ mid: id });
        this.getmechanicdata(id);
      });
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    const { mechanicdata } = this.state;
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar />
        <View style={{}}>
          <ImageBackground
            source={{ uri: mechanicdata.userphoto }}
            style={{ height: screenHeight.height25 }}>
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
                  containerStyle={{ width: 110, marginTop: 3 }}
                />
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.heading1, text.bold]}>Mechanic Detail </Text>
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.paraWhite, text.regular]}>
                  You can view detail of mechanic who commented on your post
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[appStyle.bodyBg, style.flex1]}>
          <ScrollView style={style.mv5}>
            {/* OverView Tab */}
            <View
              style={[
                appStyle.bodyLayout,
                { display: this.state.TabDataOverview },
              ]}>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                {/* <Image
                  style={[image.medium, style.mr5]}
                  source={images.location}></Image> */}
                <Text style={[text.heading2, text.bold]}>
                  Mechanic id (Copy this id if you want to report this Mechanic)
                </Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]} selectable>
                  {' '}
                  {this.state.mid}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.cartype}></Image>
                <Text style={[text.heading2, text.bold]}>Contact Number</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}> {mechanicdata.phone}</Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.Company}></Image>
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
              {/* <TouchableOpacity > */}
              <View
                style={[
                  style.mb50,
                  appStyle.bodyLayout,
                  appStyle.bodyShadowBottom,
                  {
                    backgroundColor: colors.white,
                  },
                ]}>
                {/* </TouchableOpacity> */}
                <View style={[appStyle.rowCenter]}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('reportmechanic', {
                          mdbid: this.state.mid,
                        });
                      }}>
                      <Text
                        style={
                          ({ color: colors.Black323 }, [text.text22, text.bold])
                        }>
                        Report This Mechanic
                      </Text>
                      <Text style={([text.text14], { color: colors.gray })}>
                        (This will take 1 hour to proceed)
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[{ display: this.state.tabOverview }, style.flex1]}>
                    {/* <TouchableOpacity onPress={this.buyItems}>
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
                        Play Video
                      </Text>
                    </View>
                  </TouchableOpacity> */}
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
