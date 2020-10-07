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
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
export default class HomeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDataOverview: 'flex',
      TabDataProduct: 'none',
      TabDataReview: 'none',
      ColorOverview: colors.darkBlue,
      ColorProduct: colors.inputBordercolor,
      ColorReview: colors.inputBordercolor,
      BookNowView: 'flex',
      CheckBox: images.checkBoxEmpty,
      mechanicdata: [],
      isModalVisible: false,
      isdelModalVisible: false,
      Rating: [],
      userdata: [],
      products: [],
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  getData = async () => {
    try {
      //Get Mechanic Data
      await AsyncStorage.getItem('data').then(async (res) => {
        res = JSON.parse(res);
        this.setState({mechanicdata: res});
        //Get User Rating
        await axios
          .get(URL.Url + 'getuser/' + res.mechanicid)
          .then((res) => {
            this.setState({Rating: res.data});
          })
          //Get User Data

          .then(async (product) => {
            await AsyncStorage.getItem('userdata').then((response) => {
              const res = JSON.parse(response);
              this.setState({userdata: res});
              //Get added Product of User
              axios
                .get(
                  URL.Url +
                    'getbuyProduct/' +
                    res._id +
                    '/' +
                    this.state.mechanicdata.mechanicid,
                )
                .then((prod) => {
                  this.setState({products: prod.data});
                  console.log(prod.data);
                });
            });
          })
          .catch((error) => {
            console.log(error, 'Review not fetch');
          });
      });
    } catch (error) {
      console.log(error, 'Mechanic data not fetched');
    }
  };
  async componentDidMount() {
    const {navigation} = this.props;
    this.getData();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
    });
  }
  Checked = () => {
    if (this.state.CheckBox == images.checkBoxEmpty) {
      this.setState({CheckBox: images.checkBoxTick});
    } else {
      this.setState({CheckBox: images.checkBoxEmpty});
    }
  };
  buyItems = async () => {
    if (this.state.CheckBox == images.checkBoxTick) {
      this.props.navigation.navigate('BuyItems');
    } else {
      setTimeout(async () => {
        const userid = this.state.userdata._id;
        const mechanicid = this.state.mechanicdata.mechanicid;
        console.log(userid);
        //Add Booked Mechanic In database
        axios
          .post(URL.Url + 'addbookedUser/' + mechanicid + '/' + userid)
          .then((res) => {
            this.setState({BookNowView: 'none'});
            this.props.navigation.navigate('BookNow');
            console.log('Mechanic Booked Successfully');
          });
      }, 3000);
    }
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  delToggleModel = () => {
    this.setState({isdelModalVisible: !this.state.isdelModalVisible});
  };

  deleteProduct = (id) => {
    axios
      .delete(URL.Url + 'deletebuyProduct/' + this.state.products[id]._id)
      .then((del) => {
        console.log(del.data);
        this.delToggleModel();
      });
  };

  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({TabDataProduct: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'flex'}),
        this.setState({ColorOverview: colors.darkBlue}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorProduct: colors.inputBordercolor});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({TabDataProduct: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({BookNowView: 'flex'});
    this.setState({ColorOverview: colors.darkBlue});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorProduct: colors.inputBordercolor});
  };

  tabProduct = () => {
    if (this.state.TabDataProduct == 'flex') {
      this.setState({TabDataOverview: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorProduct: colors.darkBlue});
    } else
      this.setState({TabDataProduct: 'flex'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorProduct: colors.darkBlue});
  };

  tabReview = () => {
    if (this.state.TabDataReview == 'flex') {
      this.setState({TabDataProduct: 'none'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.darkBlue}),
        this.setState({ColorProduct: colors.inputBordercolor});
    } else
      this.setState({TabDataReview: 'flex'}),
        this.setState({TabDataProduct: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataOverview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.darkBlue});
    this.setState({ColorProduct: colors.inputBordercolor});
  };

  render() {
    const {mechanicdata, Rating, products} = this.state;

    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={'light-content'}
        />
        <View style={{}}>
          <Modal
            isVisible={this.state.isModalVisible}
            animationInTiming={500}
            animationOutTiming={500}>
            <View style={[style.flex1, appStyle.rowCenter]}>
              <TouchableOpacity
                style={[appStyle.DashboardslotCard, style.w90, style.aiCenter]}
                onPress={this.toggleModal}>
                <View style={[style.mv10, style.aiCenter]}>
                  <Text style={[text.h1]}>Preview Image</Text>
                  <Text style={[text.heading2Gray]}>
                    {mechanicdata.firstname} {mechanicdata.lastname}
                  </Text>
                </View>
                <Image
                  source={{uri: mechanicdata.photo}}
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
              source={{uri: mechanicdata.photo}}
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
            <View style={[style.ph10, {display: this.state.TabDataProduct}]}>
              <ScrollView style={{}}>
                {products.map((item, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <View style={{}}>
                        <Modal
                          isVisible={this.state.isdelModalVisible}
                          animationInTiming={500}
                          animationOutTiming={500}>
                          <View style={[style.flex1, appStyle.rowCenter]}>
                            <View style={[appStyle.modalBg]}>
                              <Text style={[]}>Are You Sure?</Text>
                              <View style={[style.row, style.mt10]}>
                                <TouchableOpacity
                                  style={[style.mh10]}
                                  onPress={this.delToggleModel}>
                                  <View style={[button.modalButton]}>
                                    <Text style={[text.heading3, text.white]}>
                                      No
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[style.mh10]}
                                  onPress={() => this.deleteProduct(index)}>
                                  <View style={[button.modalButton]}>
                                    <Text style={[text.heading3, text.white]}>
                                      Yes
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      </View>

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
                              <Text style={[text.text11]}>{item.quantity}</Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity onPress={this.delToggleModel}>
                          <Image
                            style={[image.forward]}
                            source={images.delete}></Image>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            {Rating.map((item, key) => {
              return (
                <View style={[style.ph10, {display: this.state.TabDataReview}]}>
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
  }
}
