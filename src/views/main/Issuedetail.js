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
  Alert,ToastAndroid
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
      BookNowView: 'none',
      CheckBox: images.checkBoxEmpty,
      suggestion: '',
      issuedata: [],
      suggestiondata: [],
      firstname:'',
      issueid: '',
      mid:'',
      placeholder:' Enter text here',
     
      userdata:''
    };
  }

  getData = async () => {
    console.log('in get data');
    try {
      await AsyncStorage.getItem('issuedata').then((res) => {
        res = JSON.parse(res);
        this.setState({issuedata: res});
        this.setState({issueid: res._id});
        console.log('issuedata',this.state.issuedata)
       // this.setState({videourl: res._id});
       
      });

      await AsyncStorage.getItem('userdata').then((res) => {
       this.setState({userdata: JSON.parse(res)});
       console.log('photoou',this.state.userdata.photo)
        
      })
     
        this.setState({firstname: 'Issue Holder'});
        
     
    } catch (error) {}
  };
  async componentDidMount() {
    const {navigation} = this.props;
    this.getData();
    this.getsuggestions();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
      this.getsuggestions();
    });
  }

  getsuggestions = () => {
    axios
      .get(URL.Url + 'issuessuggestion/' + this.state.issueid)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.setState({suggestiondata: response.data});
          console.log(this.state.suggestiondata);
        }
        if (this.state.suggestiondata == '') ToastAndroid.show(
          'No Suggestion available',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        
      })

      .catch((error) => {
        console.log(error);
      });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };


  movetomdetail = (id) => {
    const mid1 = JSON.stringify(this.state.suggestiondata[id].mid);
    console.log('mid',mid1)
    AsyncStorage.setItem('Mechanicidfromsuggestion', mid1);
    setTimeout(() => {
      this.props.navigation.navigate('mdetail');
    }, 2000);
  };

  submitsuggestion = () => {
    axios
      .post(URL.Url + 'postsuggestion', {
        suggestion: this.state.suggestion,
        issueid: this.state.issueid,
        firstname:this.state.firstname,
          mphoto:this.state.userdata.photo
      })
      .then((res) => {
        console.log(res.data);
        ToastAndroid.show(
          'Your Suggestion is posted successfully Thanks for your response <3',
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
    const {issuedata} = this.state;
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
             <View style={[style.row, style.jcSpaceBetween, style.ph20]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("IssueListC")}
                    style={[image.headerBackArrow]}>
                    <Image
                      style={[image.backArrow]}
                      source={images.backArrow}></Image>
                  </TouchableOpacity>
                  <View></View>  
                  <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate("EditIssue")}}
                    style={[
                      button.buttonThemeWhite,
                      style.w30,
                      style.mt35,
                      {display: this.state.cancelButton},
                    ]}>
                    <Text style={[text.heading4, text.goodfishbd]}>
                      Edit Issue
                    </Text>
                  </TouchableOpacity>
                </View>
            
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
                  You can contact mechanic or report this mechanic
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
                {backgroundColor: colors.lightgray,
                       borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,},
            ]}
         >
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
              <View style={[style.mt20]}>
                <Text style={[text.text16]}>Description about issue</Text>
              </View>
              <View style={[style.pv10]}>
                <Text style={[text.paraGray]}>{issuedata.description}</Text>
              </View>
              {/* <View
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
                    Issue Video
                  </Text>
                  <Text style={([text.text14], {color: colors.gray})}>
                    (Optional)
                  </Text>
                </View>
                <View style={[{display: this.state.tabOverview}, style.flex1]}>
                  <TouchableOpacity onPress={this.buyItems}>
                    <View
                      style={[
                        button.buttoncontainer,
                        {backgroundColor: colors.purple},
                      ]}>
                        <TouchableOpacity onPress={()=>{
                          if(this.state.issuedata.issuevideo=='')
                          {
                            ToastAndroid.show(
                              'Sorry Video not available',
                              ToastAndroid.BOTTOM,
                              ToastAndroid.LONG,
                            );
                            
                          }
                          else
                          {this.props.navigation.navigate('playvideo',{videourl:this.state.issuedata.issuevideo})
                        }
                      }
                    }><Text
                      
                       
                       style={[
                          {color: colors.white},
                          button.touchablebutton,
                          text.semibold,
                        ]}>
                        Play Video
                      </Text></TouchableOpacity>
                      
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}
            </View>
            
            {this.state.suggestiondata.map((data, index) => {
              console.log('YE LO',data.firstname)
              return (
                <TouchableOpacity
                  key={index}
                  onPress={()=>{this.movetomdetail(index)}}

                  style={[
                    appStyle.slotCard,
                    appStyle.rowJustify,
                    style.aiCenter,
                    {display: this.state.TabDataReview},
                  ]}>
                  <View style={[style.row, style.aiCenter]}>
                    <View style={style.mr10}>
                      <Image style={image.userImg} source={{uri:data.mphoto}} />
                    </View>

                    <View style={[style.rowBtw, style.aiCenter]}>
                      {/* <View style={[style.mr15]}>
                        <Image
                          source={images.imagep}
                          style={[image.image50]}></Image>
                      </View> */}
                      <View>
                        <View>
                          <Text style={[text.text16, text.bold,colors.gray]}>
                            {data.firstname}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <Text style={[text.text15, {color: colors.black,}] } >
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
                style={{height: 40, width: "95%", borderColor: 'gray', borderWidth: 2, borderRadius: 20,  marginBottom: 20, fontSize: 18 }}
                placeholder={this.state.placeholder}
                secureTextEntry={true}
                secureTextEntry={false}
                underlineColorAndroid={true}
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