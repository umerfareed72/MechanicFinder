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
import Modal from 'react-native-modal';

export default class UserProfileDetail extends Component {
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
      refreshing:false,
      isModalVisible:false,
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  
  componentDidMount() {
   setTimeout(() => {
    AsyncStorage.getItem('bookUserdata').then((res) => {
      const data = JSON.parse(res);
      this.setState({data: data});
   this.setState({refreshing:true})
      console.log(data);
      });
  
   }, 2000);
     }
  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({ColorOverview: colors.darkBlue});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({ColorOverview: colors.darkBlue});
  };

  render() {
    const {data,refreshing} = this.state;
   if(refreshing!=false){
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar />
        <View style={{}}>
          <Modal
            isVisible={this.state.isModalVisible}
            animationInTiming={500}
            animationOutTiming={500}>
            <View style={[style.flex1, appStyle.rowEven]}>
              <TouchableOpacity
                style={[appStyle.DashboardslotCard,style.w100]}
                onPress={this.toggleModal}>
                <View style={[style.mv10, style.aiCenter]}>
                  <Text style={[text.h1]}>Preview Image</Text>
                  <Text style={[text.heading2Gray]}>
                    {data.firstname} {data.lastname}{' '}
                  </Text>
                </View>
                <Image
                  source={{uri: data.photo}}
                  style={{
                    height: 470,
                    
                    resizeMode: 'stretch',
                    borderRadius: 10,
                  }}></Image>
                <TouchableOpacity
                  style={[button.buttonTheme, style.mt30, style.aiCenter]}
                  onPress={this.toggleModal}>
                  <Text style={[button.btntext1]}> Close Preview </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        {/*Body */}
        <View style={{}}>
      <TouchableOpacity onPress={this.toggleModal}>
          <ImageBackground
            source={{uri:data.photo}}
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
          </TouchableOpacity>
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
    )
  }else{
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />

        <View style={[style.flex1]}>
          <ImageBackground
            imageStyle={{borderRadius: 8}}
            style={[image.storeImg, style.w100]}
            source={images.userImg}>
            <View style={style.bgOverlay} />
            <View style={[style.rowBtw, style.ph20, style.pb10]}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Dashboard')}>
                <Image
                  source={images.backarrowh}
                  style={[
                    image.backArrow2,
                    {tintColor: colors.white},
                  ]}></Image>
              </TouchableOpacity>

              <View>
                <Text style={[text.heading1, text.bold]}>Profile</Text>
              </View>
              <Text style={[text.text16, text.orange]}></Text>
            </View>
          </ImageBackground>

          <View style={[appStyle.curvedContainer]}>
            <ScrollView style={style.ph20}>
              <View style={[style.mt40]}>
                <View style={[style.aiCenter]}>
                  <Text style={[text.h1Purple]}>No Data Available</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );

  }
  }
}
