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

export default class HomeDetail extends Component {
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

  getdata = () => {
    AsyncStorage.getItem('bookMechanicData').then(async (res) => {
      res = JSON.parse(res);

      this.setState({data: res});
      this.setState({
        mechanicid: res._id,
        userid: res.userId,
        bookedMechanicId: res.bookMechanicid,
      });
      await axios.get(URL.Url + 'user/' + res.userId).then((res) => {
        const {data} = this.state;
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          photo: res.data.photo,
        });
        let Lat1 = data.latitude / 57.29577951;
        let Lat2 = res.data.latitude / 57.29577951;
        let Long1 = data.longitude / 57.29577951;
        let Long2 = res.data.longitude / 57.29577951;
        // Calaculate distance
        let dlat = Lat2 - Lat1;
        let dlong = Long2 - Long1;
        //Apply Heversine Formula to calculate  Distance of Spherical Objects
        let a =
          Math.pow(Math.sin(dlat / 2), 2) +
          Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(dlong / 2), 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 6371;
        let result = c * r; //Get Result In KM
        //Found In 10 KM
        if (result <= 10) {
          this.setState({BookNowView: 'flex'});
        }
      });
      await axios
        .get(URL.Url + 'getuser/' + res._id)
        .then((res) => {
          this.setState({Rating: res.data});
        })
        .then((product) => {
          axios
            .get(
              URL.Url +
                'getbuyProduct/' +
                this.state.userid +
                '/' +
                this.state.mechanicid,
            )
            .then((prod) => {
              this.setState({products: prod.data});
            });
        })
        .catch((error) => {
          console.log(error, 'Review not fetch');
        });
    });
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
        this.setState({refreshing: false});
        AsyncStorage.removeItem('bookMechanicData');
        this.props.navigation.navigate('Dashboard');
        console.log(res.data, 'data updated');
      })
      .then(async (product) => {
        await axios
          .get(
            URL.Url +
              'getbuyProduct/' +
              this.state.userid +
              '/' +
              this.state.mechanicid,
          )
          .then(async (prod) => {
            prod.data.map(async (item) => {
              await axios
                .put(URL.Url + 'bookedbuyProduct/' + item._id)
                .then((del) => {
                  console.log(del.data);
                });
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
  submitReview = () => {
    const userId = this.state.userid;
    const mechanicid = this.state.mechanicid;
    axios
      .post(URL.Url + 'add/' + userId + '/' + mechanicid, {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        photo: this.state.photo,
        rating: this.state.rating,
        description: this.state.description,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error, 'Review not added');
      })
      .catch((error) => {
        console.log(error);
      });
    this.CancelBooking();
  };

  render() {
    const {data, Rating, products} = this.state;
    if (data != null) {
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
              <View style={[appStyle.bodyHeight50, appStyle.rowEven]}>
                <View style={[appStyle.DashboardslotCard, style.w100]}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.aiFlexEnd}>
                      <TouchableOpacity onPress={this.ratingModal}>
                        <Image
                          style={[image.medium, image.Orange]}
                          source={images.cancel}></Image>
                      </TouchableOpacity>
                    </View>
                    <View style={[style.aiCenter]}>
                      <Text style={[text.h1]}>Feedback</Text>
                      <Text style={[text.heading2Gray]}>
                        {data.firstname} {data.lastname}{' '}
                      </Text>
                    </View>
                    <TouchableOpacity style={[style.mb10, style.aiCenter]}>
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
                    </TouchableOpacity>
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
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod
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
                <View style={[style.mt20]}>
                  <Text style={[text.text16]}>Alert !</Text>
                </View>
                <View style={[style.pv10]}>
                  <Text style={[text.paraGray]}>
                    Avoid to click on below button before delivering of Mechanic
                    Services.Its mandatory to provide Feedback of Mechanic
                    Services because without providing Mechanic Feedback,You
                    will be unable to book new Mechnaic.
                  </Text>
                </View>
                <View style={[{display: this.state.BookNowView}, style.flex1]}>
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
                        Service Completed
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
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
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
