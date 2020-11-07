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

export default class Mdetail extends Component {
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
      mid:''
    };
  }

  
  async componentDidMount() {
    const {navigation} = this.props;
    this.getData();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
    });
  }

  getmechanicdata = () => {
    axios
      .get(URL.Url + 'mechanic/' + this.state.mid)
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


  getData = async () => {
    console.log('in get data');
    try {
      await AsyncStorage.getItem('Mechanicidfromsuggestion').then((res) => {
        res = JSON.parse(res);
        this.setState({mid: res});
       this.getmechanicdata();
       
      });
      console.log('in usersignin');
      // await AsyncStorage.getItem('usersignintoken').then((res) => {
      //   // res = JSON.parse(res);
      //   console.log('response firstname',res)
        // this.setState({firstname: 'Issue Holder'});
        
      // });
    } catch (error) {}
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
                  You can view detail of mechanic who commented on your post 
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
                <Text style={[text.heading2, text.bold]}>Mechanic id (Copy this id if you want to report this Mechanic)</Text>
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
              ]}>
             
          
            {/* </TouchableOpacity> */}
            <View style={[appStyle.rowCenter]}>
                <View><TouchableOpacity onPress={
                  ()=>
                {this.props.navigation.navigate("reportmechanic",
                {mdbid:this.state.mid})}}>
                  <Text
                    style={
                      ({color: colors.Black323}, [text.text22, text.bold])
                    }>
                    Report This Mechanic
                  </Text>
                  <Text style={([text.text14], {color: colors.gray})}>
                    (This will take 1 hour to proceed)
                  </Text></TouchableOpacity>
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
            
            {
            this.state.suggestiondata.map((data, index) => 
            {
              console.log('YE LO',data.firstname)
              return (
                <TouchableOpacity
                  key={index}
                  // onPress={()=>{this.props.navigation.navigate("HomeDetail")}}

                  style={[
                    appStyle.slotCard,
                    appStyle.rowJustify,
                    style.aiCenter,
                    {display: this.state.TabDataReview},
                  ]}>
                  <View style={[style.row, style.aiCenter]}>
                    <View style={style.mr10}>
                      <Image style={image.userImg} source={images.dummy1} />
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
                          <Text style={[text.text15, {color: colors.gray}]}>
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
                {display: this.state.TabDataReview},
              ]}>
              <TextInput
                style={input.textinputstyle}
                placeholder="Type Suggestion about issue"
                secureTextEntry={true}
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
                    {backgroundColor: colors.purple},
                  ]}>
                  <Text
                    style={[
                      {color: colors.white},
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