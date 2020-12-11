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
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  ToastAndroid,
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
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {userlogin} from '../../actions/index';
import auth from '../../reducers/auth';
 class UserProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDataOverview: 'flex',
      ColorOverview: colors.white,
      TabDataProduct: 'none',
      ColorProduct: colors.inputBordercolor,
      CheckBox: images.checkBoxEmpty,
      data: [],
      cancelButton: 'flex',
      mechanicData: [],
      mechanicid: '',
      userid: '',
      products: [],
      bookedMechanicId: '',
      BookNowView: 'none',
      refreshing: false,
      isModalVisible: false,
      iscompleteModal: false,
      Amount: 0,
      extraAmount: 0,
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  completeModal = () => {
    this.setState({iscompleteModal: !this.state.iscompleteModal});
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  getMechanicLocation = async () => {
    try {
      // await AsyncStorage.getItem('mechanicid')
      //   .then((response) => {
      //     const res = JSON.parse(response);
          axios
            .get(URL.Url + 'getbookedUser/' + this.props.auth.user.mechanicid)
            .then((book) => {
              if (book.data == '') {
                console.log('No data ');
              } else {
                book.data.map((item) => {
                  this.setState({Amount: item.totalamount});
                  const bookedUserId = item._id;
                  this.setState({bookedMechanicId: bookedUserId});
                  this.setState({
                    userid: item.userid,
                    mechanicid: item.mechanicid,
                  });
                  // axios
                  //   .get(URL.Url + 'mechanic/' + item.mechanicid)
                  //   .then((mechanic) => {
                  //     this.setState({mechanicData: mechanic.data});

                      axios
                        .get(URL.Url + 'user/' + item.userid)
                        .then((response) => {
                          this.setState({data: response.data});
                          this.setState({refreshing: true});
                          // console.log(mechanic.data.mechanicrate);
                          response.data['mechanicrate'] =
                           this.props.auth.user.mechanicrate;
                          const sendMechanicData = JSON.stringify(
                            response.data,
                          );
                          AsyncStorage.setItem(
                            'bookUserData',
                            sendMechanicData,
                          );

                          const {auth} = this.props;

                          let Lat1 = response.data.latitude / 57.29577951;
                          let Lat2 = auth.user.latitude / 57.29577951;
                          let Long1 = response.data.longitude / 57.29577951;
                          let Long2 = auth.user.longitude / 57.29577951;
                          // Calaculate distance
                          let dlat = Lat2 - Lat1;
                          let dlong = Long2 - Long1;
                          //Apply Heversine Formula to calculate  Distance of Spherical Objects
                          let a =
                            Math.pow(Math.sin(dlat / 2), 2) +
                            Math.cos(Lat1) *
                              Math.cos(Lat2) *
                              Math.pow(Math.sin(dlong / 2), 2);
                          let c = 2 * Math.asin(Math.sqrt(a));
                          let r = 6371;
                          let result = c * r; //Get Result In KM
                          //Found In 10 KM
                          if (result <= 10) {
                            this.setState({BookNowView: 'flex',cancelButton:'none'});
                          }
                        })
                        .then((product) => {
                          axios
                            .get(
                              URL.Url +
                                'getbuyProduct/' +
                                this.state.userid +
                                '/' +
                                this.props.auth.user.mechanicid
                            )
                            .then((prod) => {
                              this.setState({products: prod.data});
                            });
                        });
                    });
                // });
              }
            // });
        })

        .catch((error) => {
          console.log('User data not Fetched', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  completeBooking = async () => {
    axios
      .put(URL.Url + 'cancelbookeduser/' + this.state.bookedMechanicId)
      .then((res) => {
        this.setState({refreshing: false});
        AsyncStorage.removeItem('bookMechanicData');
        this.props.navigation.navigate('MechanicDashboard');
        ToastAndroid.show(
          'Booking Cancelled',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        this.state.products.map((item) => {
          axios
            .put(
              URL.Url + 'bookedbuyProduct/' + item._id + '/' + item.productid,
            )
            .then((mod) => {
              this.setState({refreshing: false});
              AsyncStorage.removeItem('bookMechanicData');
              this.props.navigation.navigate('MechanicDashboard');
              ToastAndroid.show(
                'Booking Cancelled',
                ToastAndroid.BOTTOM,
                ToastAndroid.LONG,
              );
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  completework = () => {
    var finalamount =
      parseInt(this.state.Amount) + parseInt(this.state.extraAmount);
    axios
      .put(
        URL.Url +
          'completebooking/' +
          this.state.bookedMechanicId +
          '/' +
          finalamount +
          '/' +
          'Online',
      )
      .then((res) => {
        // AsyncStorage.removeItem('bookMechanicData');
        // console.log(res.data, 'data updated');
        // this.setState({refreshing: false});
        //   alert('Your Work is Completed:'
        //  +"\n"+' Collect Your Cash from User Please.')
        ToastAndroid.show(
          'Collect Your Cash from User Please.',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        this.props.navigation.navigate('MechanicDashboard');
        this.completeModal();
        // this.state.products.map((item) => {
        // axios.put(
        //   URL.Url + 'bookedbuyProduct/' + item._id + '/' + item.productid,
        //     )
        //     .then((mod) => {
        //       ToastAndroid.show(
        //         'All Services Done',
        //         ToastAndroid.BOTTOM,
        //         ToastAndroid.LONG,
        //       );
        //     });
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    setTimeout(() => {
      this.getMechanicLocation();
    }, 2000);
  }
  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({ColorOverview: colors.white});
      this.setState({TabDataProduct: 'none'}),
        this.setState({ColorProduct: colors.inputBordercolor});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({ColorOverview: colors.white});
    this.setState({TabDataProduct: 'none'}),
      this.setState({ColorProduct: colors.inputBordercolor});
  };

  tabProduct = () => {
    if (this.state.TabDataProduct == 'flex') {
      this.setState({TabDataOverview: 'none'}), this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorProduct: colors.white});
    } else
      this.setState({TabDataProduct: 'flex'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorProduct: colors.white});
  };

  render() {
    const {data, refreshing, products} = this.state;
    const {auth} = this.props;
  
    if (refreshing != false) {
      return (
        <SafeAreaView style={[appStyle.safeContainer]}>
          <StatusBar />
          <View style={{}}>
            <Modal 
              isVisible={this.state.iscompleteModal}
              animationInTiming={500}
              animationOutTiming={500}>
              <View style={[style.flex1, appStyle.rowCenter]}>
                <View style={[appStyle.modalBg]}>
                  <Text style={text.h1}>
                    {parseInt(this.state.Amount) +
                      parseInt(this.state.extraAmount)}
                  </Text>
                  <View
                    style={[
                      input.formInput,
                      style.mv5,
                      style.row,
                      style.aiCenter,
                    ]}>
                    <Image
                      source={images.dollar}
                      style={[image.InputImage, style.mr5]}></Image>
                    <TextInput
                      style={[input.input]}
                      placeholder="Enter extra Service Rate"
                      onChangeText={(text) => {
                        this.setState({
                          extraAmount: text,
                        });
                      }}
                      underlineColorAndroid="transparent"></TextInput>
                  </View>

                  <Text style={[]}>Are You Sure?</Text>

                  <View style={[style.row, style.mt10]}>
                    <TouchableOpacity
                      style={[style.mh10]}
                      onPress={this.completeModal}>
                      <View style={[button.modalButton]}>
                        <Text style={[text.heading3, text.white]}>Cancel</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[style.mh10]}
                      onPress={this.completework}>
                      <View style={[button.modalButton]}>
                        <Text style={[text.heading3, text.white]}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={[style.pv10, style.ph30]}>
                  <Text
                    onPress={() => {
                      this.props.navigation.navigate('reportcustomer',{userdbid:data._id});
                      this.completeModal(); }}
                    style={[text.right, text.text14, {color: colors.link}]}>
                    REPORT
                  </Text>
                </View>
                </View>
                
              </View>
            </Modal>
          </View>

          <View style={{}}>
            <Modal
              isVisible={this.state.isModalVisible}
              animationInTiming={500}
              animationOutTiming={500}>
              <View style={[style.flex1, appStyle.rowCenter]}>
                <TouchableOpacity
                  style={[
                    appStyle.DashboardslotCard,
                    style.w90,
                    style.aiCenter,
                  ]}
                  onPress={this.toggleModal}>
                  <View style={[style.mv10, style.aiCenter]}>
                    <Text style={[text.h1]}>Preview Image</Text>
                    <Text style={[text.heading2Gray]}>
                      {data.firstname} {data.lastname}
                    </Text>
                  </View>
                  <Image
                    source={{uri: data.photo}}
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

          {/*Body */}
          <View style={{}}>
            <TouchableOpacity onPress={this.toggleModal}>
              <ImageBackground
                source={{uri: data.photo}}
                style={{height: screenHeight.height25}}>
                <View style={style.bgOverlay} />

                <View style={[style.row, style.jcSpaceBetween, style.ph20]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={[image.headerBackArrow]}>
                    <Image
                      style={[image.backArrow]}
                      source={images.backArrow}></Image>
                  </TouchableOpacity>
                  <View></View>
                  <TouchableOpacity
                    onPress={this.completeBooking}
                    style={[
                      button.buttonThemeWhite,
                      style.w30,
                      style.mt35,
                      {display: this.state.cancelButton},
                    ]}>
                    <Text style={[text.heading4, text.goodfishbd]}>
                      Cancel Booking
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[appStyle.headInner, style.ph20]}>
                  {/* <View style={[style.mv5]}>
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
                  </View> */}

                  <View style={[style.mv5]}>
                    <Text style={[text.heading1, text.bold]}>
                      {data.firstname} {data.lastname}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
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
              <TouchableOpacity onPress={() => this.tabProduct()}>
                <Text
                  style={[
                    text.heading2,
                    text.semibold,
                    {color: this.state.ColorProduct},
                  ]}>
                  Product
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
                <View style={[style.aiCenter]}>
                  <Text
                    style={
                      ({color: colors.Black323}, [text.text22, text.bold])
                    }>
                    ${this.state.Amount}
                  </Text>
                  <Text style={([text.text14], {color: colors.gray})}>
                    Estimated Charges
                  </Text>
                </View>

                <View style={[appStyle.rowAlignCenter, style.mt10]}>
                  <Image
                    style={[image.medium, style.mr5, image.Orange]}
                    source={images.email}></Image>
                  <Text style={[text.heading2, text.bold]}>Email</Text>
                </View>
                <View style={[style.borderbottom, style.mt10]}>
                  <Text style={[text.heading2Gray]}> {data.email}</Text>
                </View>

                <View style={[appStyle.rowAlignCenter, style.mt10]}>
                  <Image
                    style={[image.medium, style.mr5, image.Orange]}
                    source={images.cartype}></Image>
                  <Text style={[text.heading2, text.bold]}>Vehicle Type</Text>
                </View>
                <View style={[style.borderbottom, style.mt10]}>
                  <Text style={[text.heading2Gray]}>
                    {auth.user.vehicletype}
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
                    {auth.user.carcompany}
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
                    {auth.user.skilltype}
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
                <View style={[style.mv10, style.rowBtw]}>
                  <View></View>
                  <View></View>

                  <TouchableOpacity
                    style={[style.row, style.aiCenter]}
                    onPress={() => {
                      this.props.navigation.navigate('UserProfile');
                    }}>
                    <Text style={[text.heading2]}>Continue</Text>
                    <Image
                      source={images.arrowLong}
                      style={[image.medium, style.mh5, style.mt5]}></Image>
                  </TouchableOpacity>
                </View>

                <View style={[{display: this.state.BookNowView}, style.flex1]}>
                  <View style={[style.mt20]}>
                    <Text style={[text.text16]}>Alert !</Text>
                  </View>
                  <View style={[style.pv10]}>
                    <Text style={[text.paraGray]}>
                      Avoid to click on below button before delivering complete
                      Services to User.Your Rating increase your demand so,avoid
                      to click on this button before providing complete
                      services.
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={this.completeModal}
                    style={style.mt30}>
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
                        Service Completed
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* {Product Tab} */}
              <View
                style={[
                  appStyle.bodyLayout,
                  {display: this.state.TabDataProduct},
                ]}>
                <ScrollView style={{}}>
                  {products.map((item, index) => {
                    return (
                      <TouchableOpacity key={index}>
                        <View
                          style={[
                            appStyle.slotCard,
                            appStyle.rowJustify,
                            style.aiCenter,
                          ]}>
                          <View style={[style.row, style.aiCenter]}>
                            <View style={style.mr15}>
                              <Image
                                style={image.userImg}
                                source={{uri: item.photo}}
                              />
                            </View>

                            <View>
                              <Text style={[text.text18, text.bold]}>
                                {item.title}
                              </Text>

                              <View style={[style.pt5, style.row]}>
                                <Text style={[text.text12, text.greyVLight]}>
                                  Price :{' '}
                                </Text>

                                <Text style={[text.text12, text.darkYellow]}>
                                  {item.amount} $
                                </Text>
                              </View>
                              <View style={style.row}>
                                <Text style={[text.text11]}>Quantity : </Text>
                                <Text style={[text.text11]}>
                                  {item.quantity}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
              {/* Product Tab End */}
              {/* Reviews Tab End  */}
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    } else if (data.length == 0) {
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
                  onPress={() =>
                    this.props.navigation.navigate('MechanicDashboard')
                  }>
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
    } else {
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
                  onPress={() =>
                    this.props.navigation.navigate('MechanicDashboard')
                  }>
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
                    <ActivityIndicator
                      color="#bc2b78"
                      size="large"></ActivityIndicator>
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
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {userlogin})(UserProfileDetail);
