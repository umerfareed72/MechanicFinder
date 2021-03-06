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
const axios = require('axios');
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
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
import Textarea from 'react-native-textarea';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      starCount: 5,
      TabDataOverview: 'flex',
      TabDataProduct: 'none',
      TabDataReview: 'none',
      ColorOverview: colors.darkBlue,
      ColorProduct: colors.inputBordercolor,
      ColorReview: colors.inputBordercolor,
      BookNowView: 'none',
      CheckBox: images.checkBoxEmpty,
      cancelButton: 'flex',
      isModalVisible: false,
      data: [],
      ratingModal: false,
      fullStar: colors.darkyellow,
      emptyStar: colors.black,
      userid: '',
      mechanicid: '',
      bookedMechanicId: '',
      description: '',
      Rating: [],
      products: [],
      firstname: '',
      lastname: '',
      photo: '',
      refreshing: null,
      Amount: 0,
      productprice: 0,
    };
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  ratingModal = () => {
    this.setState({ratingModal: !this.state.ratingModal});
  };
  onStarRatingPress(rating) {
    this.setState({
      rating: rating,
    });
  }
  getRating = async () => {
    await axios
      .get(URL.Url + 'getuser/' + this.state.mechanicid)
      .then((res) => {
        this.setState({Rating: res.data});
      });
  };
  getBuyProducts = async () => {
    await axios
      .get(
        URL.Url +
          'getbuyProduct/' +
          this.props.auth.user.userid +
          '/' +
          this.state.mechanicid,
      )
      .then((prod) => {
        this.setState({products: prod.data});
      });
  };
  getdata = () => {
    try {
      axios
        .get(URL.Url + 'getbookedMechanic/' + this.props.auth.user.userid)
        .then((res) => {
          res.data.map((item) => {
            this.setState({
              bookedMechanicId: item._id,
              mechanicid: item.mechanicid,
              Amount: item.totalamount,
            });
            axios
              .get(URL.Url + 'mechanic/' + item.mechanicid)
              .then((response) => {
                this.setState({refreshing: false});
                this.setState({data: response.data});
                response.data['userId'] = item.userid;
                response.data['bookMechanicid'] = item._id;
                const sendMechanicData = JSON.stringify(response.data);
                AsyncStorage.setItem('bookMechanicData', sendMechanicData);
                let Lat1 = this.props.auth.user.latitude / 57.29577951;
                let Lat2 = response.data.latitude / 57.29577951;
                let Long1 = this.props.auth.user.longitude / 57.29577951;
                let Long2 = response.data.longitude / 57.29577951;
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
                console.log(result, 'resisabhasv');
                if (result <= 10) {
                  this.setState({BookNowView: 'flex'});
                  // this.setState({cancelButton: 'none'});
                }
              });
          });
        })
        .catch((error) => {
          console.log('User data not Fetched', error);
        })
        .then((product) => {
          this.getBuyProducts();
        })
        .then(() => {
          this.getRating();
        });
    } catch (error) {
      console.log(error);
    }
  };
  async componentDidMount() {
    const {navigation} = this.props;
    this.getdata();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getdata();
    });
  }
  CancelBooking = async () => {
    axios
      .put(URL.Url + 'cancelbookeduser/' + this.state.bookedMechanicId)
      .then((res) => {
        AsyncStorage.removeItem('bookMechanicData');
        this.setState({refreshing: true});
        this.props.navigation.navigate('Dashboard');
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
              this.setState({refreshing: true});
              console.log(res.data, 'data updated');
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({TabDataProduct: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({ColorOverview: colors.darkBlue}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorProduct: colors.inputBordercolor});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({TabDataProduct: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({ColorOverview: colors.darkBlue});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorProduct: colors.inputBordercolor});
  };

  tabProduct = () => {
    if (this.state.TabDataProduct == 'flex') {
      this.setState({TabDataOverview: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorProduct: colors.darkBlue});
    } else
      this.setState({TabDataProduct: 'flex'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorProduct: colors.darkBlue});
  };

  tabReview = () => {
    if (this.state.TabDataReview == 'flex') {
      this.setState({TabDataProduct: 'none'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.darkBlue}),
        this.setState({ColorProduct: colors.inputBordercolor});
    } else
      this.setState({TabDataReview: 'flex'}),
        this.setState({TabDataProduct: 'none'}),
        this.setState({TabDataOverview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.darkBlue});
    this.setState({ColorProduct: colors.inputBordercolor});
  };
  validateReview = () => {
    if (this.state.rating == 0) {
      ToastAndroid.show(
        'Rating is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.description == '') {
      ToastAndroid.show(
        'Description is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  CompleteBooking = async () => {
    axios
      .put(
        URL.Url +
          'completebooking/' +
          this.state.bookedMechanicId +
          '/' +
          this.state.Amount +
          '/' +
          'Offline',
      )
      .then((res) => {
        AsyncStorage.removeItem('bookMechanicData');
        this.toggleModal();
        this.props.navigation.navigate('Dashboard');
        this.setState({refreshing: true});
        this.state.products.map((item) => {
          axios
            .put(
              URL.Url + 'bookedbuyProduct/' + item._id + '/' + item.productid,
            )
            .then((mod) => {
              this.setState({refreshing: true});
              console.log(res.data, 'data updated');
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  submitReview = () => {
    if (this.validateReview()) {
      const userId = this.props.auth.user.userid;
      const mechanicid = this.state.mechanicid;
      axios
        .post(URL.Url + 'add/' + userId + '/' + mechanicid, {
          firstname: this.props.auth.user.firstname,
          lastname: this.props.auth.user.lastname,
          photo: this.props.auth.user.photo,
          rating: this.state.rating,
          description: this.state.description,
        })
        .then(async (response) => {
          await axios
            .put(URL.Url + 'mechanicrating/' + mechanicid)
            .then((res) => {
              ToastAndroid.show(
                'Your Review Added Thanks & Good Bye',
                ToastAndroid.BOTTOM,
                ToastAndroid.LONG,
              );
              this.CompleteBooking();
              console.log(res.data);
              this.setState({refreshing: true});
            });
        })
        .catch((error) => {
          console.log(error, 'Review not added');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const {data, Rating, products, refreshing} = this.state;
    const {auth} = this.props;
    console.log(auth.user.userid, 'idada');

    if (data != null && refreshing === false) {
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

          <View style={{}}>
            <Modal
              isVisible={this.state.ratingModal}
              animationInTiming={500}
              animationOutTiming={500}>
              <View style={[style.h100, appStyle.rowEven]}>
                <View style={[appStyle.DashboardslotCard, style.w100]}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.aiFlexEnd}>
                      <TouchableOpacity onPress={this.ratingModal}>
                        <Image
                          style={[image.large, image.Orange]}
                          source={images.cancel}></Image>
                      </TouchableOpacity>
                    </View>
                    <View style={[style.aiCenter]}>
                      <Text style={[text.h1]}>Receipt</Text>
                      <Text style={[text.heading2Gray]}>
                        {data.firstname} {data.lastname}{' '}
                      </Text>
                    </View>
                    <View style={[style.mt5]}>
                      <Text style={[text.text16]}>Description:</Text>
                    </View>
                    <View style={[style.pv5]}>
                      <Text style={[text.paraGray]}>
                        Be Sincere Your Review decide the future of Mechanic
                      </Text>
                    </View>
                    <View style={[style.rowBtw, style.mh10, style.mt30]}>
                      <Text style={text.heading3}> Mechanic Service Rate:</Text>
                      <Text style={text.heading3}>{data.mechanicrate} $</Text>
                    </View>

                    {products.map((item) => {
                      return (
                        <View>
                          <View style={[style.rowBtw, style.mh10, style.mt10]}>
                            <Text style={text.heading2}> Product Name</Text>
                            <Text style={text.heading2}>Price </Text>
                          </View>
                          <View style={[style.rowBtw, style.mh10, style.mt10]}>
                            <Text style={text.heading3}> {item.title}</Text>
                            <Text style={text.heading3}>{item.amount} </Text>
                          </View>
                        </View>
                      );
                    })}

                    <View style={[style.rowBtw, style.mh10, style.mv10]}>
                      <Text style={text.heading2}> Your Total Bill:</Text>
                      <Text style={text.heading2}>{this.state.Amount} $</Text>
                    </View>

                    <View style={[style.aiCenter]}>
                      <View style={[appStyle.textareaBorder]}>
                        <Textarea
                          onChangeText={(text) => {
                            this.setState({description: text});
                          }}
                          placeholder={
                            'Please tell me something about your booked Mechanic'
                          }
                          placeholderTextColor={'#c7c7c7'}
                          underlineColorAndroid={'transparent'}
                        />
                      </View>
                      <TouchableOpacity style={[style.mv10, style.aiCenter]}>
                        <StarRating
                          disabled={false}
                          maxStars={5}
                          rating={this.state.rating}
                          selectedStar={(rating) =>
                            this.onStarRatingPress(rating)
                          }
                          fullStarColor={this.state.fullStar}
                          emptyStarColor={this.state.emptyStar}
                          starSize={40}
                          containerStyle={{marginTop: 3}}
                        />
                        <View style={[style.aiCenter, style.mv10]}>
                          <Text style={text.heading2Gray}>
                            Provide Star Rating
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[style.pv10, style.ph30]}
                        onPress={() => {
                          this.ratingModal();
                          this.props.navigation.navigate('breportmechanic', {
                            mdbid: data._id,
                            photo:data.photo
                          });
                        }}>
                        <View style={[style.row, style.aiCenter]}>
                          <Image
                            style={[
                              image.medium,
                              {tintColor: colors.red},
                              style.mr5,
                            ]}
                            source={images.complaints}></Image>
                          <Text
                            style={[
                              text.right,
                              text.text18,
                              {color: colors.link},
                            ]}>
                            Register a complaint
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={this.submitReview}
                        style={[button.Profilebutton, {marginTop: 20}]}>
                        <Text style={[button.bookbutton, text.center]}>
                          Submit Review
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
          {/*Body */}
          <View style={{}}>
            <TouchableOpacity onPress={this.toggleModal}>
              <ImageBackground
                source={{uri: data.photo}}
                style={{height: screenHeight.height30}}>
                <View style={style.bgOverlay} />
                {/* <View style={[{backgroundColor:colors.black},style.rowBtw]}>
                </View> */}

                <View style={[style.row, style.jcSpaceBetween, style.ph20]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Dashboard')}
                    style={[image.headerBackArrow]}>
                    <Image
                      style={[image.backArrow]}
                      source={images.backArrow}></Image>
                  </TouchableOpacity>
                  <View></View>
                  <TouchableOpacity
                    onPress={this.CancelBooking}
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
                  <View style={[style.mv5]}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={data.rating}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
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
                  {/* <View style={[style.mv5]}>
                    <Text style={[text.paraWhite, text.regular]}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod
                    </Text>
                  </View> */}
                </View>
              </ImageBackground>
            </TouchableOpacity>
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
                    source={images.email}></Image>
                  <Text style={[text.heading2, text.bold]}>Email</Text>
                </View>
                <View style={[style.borderbottom, style.mt10]}>
                  <Text style={[text.heading2Gray]}> {data.email}</Text>
                </View>
                <View style={[appStyle.rowAlignCenter, style.mt10]}>
                  <Image
                    style={[image.medium, style.mr5]}
                    source={images.location}></Image>
                  <Text style={[text.heading2, text.bold]}>Address</Text>
                </View>
                <View style={[style.borderbottom, style.mt10]}>
                  <Text style={[text.heading2Gray]}>
                    {' '}
                    {data.address} {data.city} {data.country}
                  </Text>
                </View>
                <View style={[appStyle.rowAlignCenter, style.mt10]}>
                  <Image
                    style={[image.medium, style.mr5, image.Orange]}
                    source={images.cartype}></Image>
                  <Text style={[text.heading2, text.bold]}>Vehicle Type</Text>
                </View>
                <View style={[style.borderbottom, style.mt10]}>
                  <Text style={[text.heading2Gray]}> {data.vehicletype}</Text>
                </View>
                <View style={[appStyle.rowAlignCenter, style.mt10]}>
                  <Image
                    style={[image.medium, style.mr5, image.Orange]}
                    source={images.Company}></Image>
                  <Text style={[text.heading2, text.bold]}>Car Brand</Text>
                </View>
                <View style={[style.borderbottom, style.mt10]}>
                  <Text style={[text.heading2Gray]}> {data.carcompany}</Text>
                </View>

                <View style={[appStyle.rowAlignCenter, style.mt10]}>
                  <Image
                    style={[image.medium, image.Orange, style.mr5]}
                    source={images.carservice}></Image>
                  <Text style={[text.heading2, text.bold]}>Skills Type</Text>
                </View>
                <View style={[style.borderbottom, style.mv10]}>
                  <Text style={[text.heading2Gray]}> {data.skilltype}</Text>
                </View>

                <View style={[appStyle.rowAlignCenter, style.mt10]}>
                  <Image
                    style={[image.medium, image.Orange, style.mr5]}
                    source={images.dollar}></Image>
                  <Text style={[text.heading2, text.bold]}>
                    Mechanic Service Rate
                  </Text>
                </View>
                <View style={[style.borderbottom, style.mv10]}>
                  <Text style={[text.heading2Gray]}>
                    {' '}
                    {data.mechanicrate}.0
                  </Text>
                </View>
                <View style={[style.mv10, style.rowBtw]}>
                  <View>
                    <Text
                      style={
                        ({color: colors.Black323}, [text.text22, text.bold])
                      }>
                      $ {this.state.Amount}
                    </Text>
                    <Text style={([text.text14], {color: colors.gray})}>
                      Estimated Amount
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[style.row, style.aiCenter]}
                    onPress={() => {
                      this.props.navigation.navigate('BookNow');
                    }}>
                    <Text style={[text.heading2]}>Continue</Text>
                    <Image
                      source={images.arrowLong}
                      style={[image.medium, style.mh5, style.mt5]}></Image>
                  </TouchableOpacity>
                </View>
                <View style={[{display: this.state.BookNowView}, style.flex1]}>
                  {/* <View style={[style.mt5]}>
                    <Text style={[text.text16]}>Alert !</Text>
                  </View>
                  <View style={[style.pv5]}>
                    <Text style={[text.paraGray]}>
                      Be Sincere Your Review decide the future of Mechanic
                        </Text>
                  </View> */}
                  <TouchableOpacity onPress={this.ratingModal}>
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
                        Print Your Receipt
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Product Tab */}
              <View style={[style.ph10, {display: this.state.TabDataProduct}]}>
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
              {/* Review Tab */}
              {Rating.map((item, key) => {
                return (
                  <View
                    style={[style.ph10, {display: this.state.TabDataReview}]}>
                    <View
                      key={key}
                      style={[
                        style.row,
                        style.mv5,
                        style.aiCenter,
                        appStyle.slotCard,
                      ]}>
                      <View style={[style.flex1, style.mr5]}>
                        <Image
                          style={appStyle.listImg}
                          source={{uri: item.photo}}></Image>
                      </View>
                      <View style={{flex: 4}}>
                        <View style={[style.row]}>
                          <Text style={[style.mr5]}>
                            {item.firstname} {item.lastname}
                          </Text>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={item.rating}
                            // selectedStar={(rating) =>
                            //   this.onStarRatingPress(rating)
                            // }
                            fullStarColor={'#F59E52'}
                            emptyStarColor={'#F59E52'}
                            starSize={15}
                            containerStyle={{width: 80, marginTop: 2}}
                          />
                        </View>
                        <View>
                          <Text style={[text.text12]}>{item.description}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}

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
    } else {
      return (
        <SafeAreaView style={[appStyle.safeContainer]}>
          <StatusBar barStyle={'dark-content'}></StatusBar>
          <View style={[style.flex1, style.jcCenter]}>
            <View style={[style.aiCenter]}>
              <ActivityIndicator
                color="#bc2b78"
                size="large"></ActivityIndicator>
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
export default connect(mapStateToProps, null)(ProfileDetail);
