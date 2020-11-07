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
  Alert
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

export default class RMechanicprofile extends Component {
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
     
      suggestiondata:[],
      mechanicdata: [],
      firstname:'',
      issueid: '',
      mdbid:this.props.navigation.getParam('mid','nothing sent'),
warning:''
    };
  }

  
  async componentDidMount() {
   
    this.getmechanicdata();
    this.focusListener = navigation.addListener('didFocus', () => {
        this.getmechanicdata();
    });
  }

  getmechanicdata = () => {
    axios
      .get(URL.Url + 'mechanic/' + this.state.mdbid)
      .then((response) => {
        if (response.data) {
          console.log('mechanic ye rha',response.data);
          this.setState({mechanicdata: response.data});
          console.log('mechanicdata',this.state.mechanicdata)
        }
        
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
          Alert.alert('Account deleted successfully!')
          this.props.navigation.navigate('Reportedmechanics')
        }
      })
      .catch((error) => {
        console.log('ye lo 2', error);
        Alert.alert('something is wrong')
      });
  }

sendwarning = () => {
    axios.post(URL.Url + "sendwarning",{
        warning:this.state.warning,
        mdbid:this.state.mdbid,
    })
    .then(async (res) => {
        console.log(res.data);
        //console.log(this.state.mdbid);
        Alert.alert('Posted warning Successfully  !');
       
      })
      .catch((error) => {
        Alert.alert('Warning not posted try again!!');

        console.log(error);
      });
}
  
  
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
  render() {
    const {mechanicdata} = this.state;
console.log(this.state.firstname)
    console.log(this.state.issueid);
console.log('ye ai id profile pa',this.state.mdbid)
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar />
        <View style={{}}>
          <ImageBackground
            source={images.carPaint}
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
Mechanic Detail{' '}
                 
                </Text>
              </View>
              <View style={[style.mv5]}>
                <Text style={[text.paraWhite, text.regular]}>
                  You can delete mechanic account or generate warning message for mechanic(According to issue)
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

           
          </View>
          <ScrollView style={style.mv5}>
            {/* OverView Tab */}
            <View
              style={[
                appStyle.bodyLayout,
                {display: this.state.TabDataOverview},
              ]}>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                {/* <Image
                  style={[image.medium, style.mr5]}
                  source={images.location}></Image> */}
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
                  source={images.cartype}></Image>
                <Text style={[text.heading2, text.bold]}>Contact Number</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}>
                  {' '}
                  {mechanicdata.phone}
                </Text>
              </View>
              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, style.mr5, image.Orange]}
                  source={images.Company}></Image>
                <Text style={[text.heading2, text.bold]}>Mechanic Type</Text>
              </View>
              <View style={[style.borderbottom, style.mt10]}>
                <Text style={[text.heading2Gray]}> {mechanicdata.vehicletype}</Text>
              </View>

              <View style={[appStyle.rowAlignCenter, style.mt10]}>
                <Image
                  style={[image.medium, image.Orange, style.mr5]}
                  source={images.carservice}></Image>
                <Text style={[text.heading2, text.bold]}>Specialist in </Text>
              </View>
              <View style={[style.borderbottom, style.mv10]}>
                <Text style={[text.heading2Gray]}> {mechanicdata.skilltype}</Text>
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
              ],{marginTop:20}}>
             
          
            {/* </TouchableOpacity> */}
            <View style={[appStyle.rowCenter] }>
                <View>
                    
                  <TextInput
                    style={
                      ({color: colors.Black323}, [text.text18, text.bold])
                    }
                    underlineColorAndroid="transparent"
                        placeholder="Type warning here"
                        onChangeText={(text) => {
                            this.setState({
                              warning: text,
                            });}}
                   
                  />
                  <TouchableOpacity onPress={this.sendwarning}>
                  <Text style={[text.heading2, text.bold]}>Send Warning </Text>
                  </TouchableOpacity>
                 
                </View>
                <View style={[{display: this.state.tabOverview}, style.flex1]}>
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
              <View
              style={[
                style.mb50,
                appStyle.bodyLayout,
                appStyle.bodyShadowBottom,
                {
                  backgroundColor: colors.white,
                  
                },
              ],{marginTop:20}}>
             
          
            {/* </TouchableOpacity> */}
            <View style={[appStyle.rowCenter] }>
                <View>
                
                  <TouchableOpacity onPress={this.deletemechanic} >
                 <Text style={
                      ({color: colors.Black323}, [text.text18, text.bold])
                    }>
                        Delete Mechanic Account
                    </Text>
                  </TouchableOpacity>
                 
                </View>
                <View style={[{display: this.state.tabOverview}, style.flex1]}>
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