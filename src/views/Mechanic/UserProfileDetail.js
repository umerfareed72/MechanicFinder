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

export default class HomeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDataOverview: 'flex',
      ColorOverview: colors.darkBlue,
      BookNowView: 'flex',
      CheckBox: images.checkBoxEmpty,
      data: [],
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount() {
    AsyncStorage.getItem('data').then((res) => {
      res = JSON.parse(res);
      console.log(res);
      this.setState({data: res});
    });
  }
  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({ColorOverview: colors.darkBlue});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({ColorOverview: colors.darkBlue});
  };

  render() {
    const {data} = this.state;
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
                  {data.firstname} {data.lastname}
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
            //   appStyle.rowBtw,
            style.aiCenter,
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
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.cart}></Image>
                <Text style={[text.heading2, text.bold]}>Included Items</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  Gaskit
                  {/* {data.address} {data.city} {data.country} */}
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
                  Car
                  {/* {data.vehicletype} */}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.Company}></Image>
                <Text style={[text.heading2, text.bold]}>Vehicle Brand</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {/* {data.carcompany} */}
                  Honda
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
                  Engine
                  {/* {data.skilltype} */}
                </Text>
              </View>

              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, image.Orange, style.mr5]}
                  source={images.carservice}></Image>
                <Text style={[text.heading2, text.bold]}>Vehicle Model</Text>
              </View>
              <View style={[style.borderbottom, style.mv10]}>
                <Text style={[text.heading2Gray]}>
                  2012
                  {/* {data.skilltype} */}
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
            </View>
            {/* Reviews Tab End  */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
