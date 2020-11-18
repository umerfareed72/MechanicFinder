import {Text, View} from 'native-base';
import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  CheckBox,
  Image,
  PermissionsAndroid,
  Permission,
  ImageBackground,
  Dimensions,
  Keyboard,
  Platform,
  ActivityIndicator,
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
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import button from '../../assets/styles/button';
import Hamburger from '../../components/headerComponent/Hamburger';
import StarRating from 'react-native-star-rating';
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      painter: '',
      engine: '',
      body: '',
      electric: '',
      electricissue: '',
      engineissue: '',
      bodyissue: '',
      registereduser: '',
      topmechanics: [],
    };
  }

  gettopMechanics = () => {
    try {
      axios.get(URL.Url + 'topmechanics').then((res) => {
        this.setState({topmechanics: res.data});
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
      return (
        <View style={[style.aiCenter]}>
          <ActivityIndicator color="#bc2b78" size="large"></ActivityIndicator>
        </View>
      );
    }
  };
  async componentDidMount() {
    const {navigation} = this.props;
    this.getmechanicdata();
    this.gettopMechanics();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getmechanicdata();
      this.getissuedata();
      this.gettopMechanics();
    });
  }
  getmechanicdata = () => {
    console.log('IN ADMINDASH PAINTERCOUNT');
    axios
      .get(URL.Url + 'paintercount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({painter: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(URL.Url + 'enginecount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({engine: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(URL.Url + 'bodycount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({body: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(URL.Url + 'electriccount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({electric: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(URL.Url + 'usercount')
      .then((response) => {
        if (response) {
          console.log('regsteru', response.data);
          this.setState({registereduser: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getissuedata = () => {
    console.log('in admin issue data');
    axios
      .get(URL.Url + 'electricissuecount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({electricissue: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(URL.Url + 'engineissuecount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({engineissue: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(URL.Url + 'bodyissuecount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({bodyissue: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(URL.Url + 'bookedmcount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({bookedmcount: response.data});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {topmechanics} = this.state;

    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height20}}>
            <View style={style.bgOverlay}></View>

            <StatusBar backgroundColor={'transparent'} />
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1]}>Admin Dashboard</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView style={[appStyle.bodyBg, style.mb20]}>
          <View>
            <View style={[appStyle.rowJustify, appStyle.headingLayout]}>
              <Text style={[text.heading2, text.semibold]}></Text>
              <Text style={[text.heading3, text.semibold]}>Complaints</Text>
            </View>

            <View style={[style.row, style.jcSpaceBetween, style.mh10]}>
              <View style={[image.dashboardCard2]}>
                <LinearGradient
                  style={[image.dashboardImg]}
                  colors={colors.boxColor}
                  start={{x: 0.9, y: 0}}
                  end={{x: 1, y: 0.9}}>
                  <TouchableOpacity
                    style={[style.jcCenter]}
                    onPress={() => {
                      this.props.navigation.navigate('Reportedcustomers');
                    }}>
                    <View style={[style.asCenter]}>
                      <Image
                        style={[
                          {
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            tintColor: colors.white,
                          },
                        ]}
                        source={images.username}
                      />
                    </View>
                    <Text
                      style={[
                        text.heading5white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      Complaints
                    </Text>
                    <Text
                      style={[
                        text.text14white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      (Users)
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View style={[image.dashboardCard2]}>
                <LinearGradient
                  style={[image.dashboardImg]}
                  colors={colors.boxColor}
                  start={{x: 0.9, y: 0}}
                  end={{x: 1, y: 0.9}}>
                  <TouchableOpacity
                    style={[style.jcCenter]}
                    onPress={() => {
                      this.props.navigation.navigate('Reportedmechanics');
                    }}>
                    <View style={[style.asCenter]}>
                      <Image
                        style={[
                          {
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            tintColor: colors.white,
                          },
                        ]}
                        source={images.username}
                      />
                    </View>
                    <Text
                      style={[
                        text.heading5white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      Complaints
                    </Text>
                    <Text
                      style={[
                        text.text14white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      (Mechanics)
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
            <View style={[appStyle.rowJustify, appStyle.headingLayout]}>
              <Text style={[text.heading2, text.semibold]}></Text>
              <Text style={[text.heading3, text.semibold]}>Helps</Text>
            </View>

            <View style={[style.row, style.jcSpaceBetween, style.mh10]}>
              <View style={[image.dashboardCard2]}>
                <LinearGradient
                  style={[image.dashboardImg]}
                  colors={colors.boxColor}
                  start={{x: 0.9, y: 0}}
                  end={{x: 1, y: 0.9}}>
                  <TouchableOpacity
                    style={[style.jcCenter]}
                    onPress={() => {
                      this.props.navigation.navigate('Chelp');
                    }}>
                    <View style={[style.asCenter]}>
                      <Image
                        style={[
                          {
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            tintColor: colors.white,
                          },
                        ]}
                        source={images.username}
                      />
                    </View>
                    <Text
                      style={[
                        text.heading5white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      Help
                    </Text>
                    <Text
                      style={[
                        text.text14white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      (Users)
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View style={[image.dashboardCard2]}>
                <LinearGradient
                  style={[image.dashboardImg]}
                  colors={colors.boxColor}
                  start={{x: 0.9, y: 0}}
                  end={{x: 1, y: 0.9}}>
                  <TouchableOpacity
                    style={[style.jcCenter]}
                    onPress={() => {
                      this.props.navigation.navigate('Mhelp');
                    }}>
                    <View style={[style.asCenter]}>
                      <Image
                        style={[
                          {
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            tintColor: colors.white,
                          },
                        ]}
                        source={images.username}
                      />
                    </View>
                    <Text
                      style={[
                        text.heading5white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      Help
                    </Text>
                    <Text
                      style={[
                        text.text14white,
                        style.tc,
                        style.mt2,
                        text.center,
                      ]}>
                      (Mechanics)
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
            <View style={[appStyle.rowJustify, appStyle.headingLayout]}>
              <Text style={[text.heading2, text.semibold]}>
                Top Rated Mechanics
              </Text>
              <TouchableOpacity>
                <Text style={[text.heading3, text.semibold]}>View All</Text>
              </TouchableOpacity>
            </View>
            {topmechanics.map((data, index) => {
              if (index < 5) {
                return (
                  <View
                    style={[
                      appStyle.DashboardslotCard,
                      appStyle.rowJustify,
                      style.aiCenter,
                      style.mv10,
                    ]}>
                    <View style={[style.rowBtw, style.aiCenter]}>
                      <View style={[style.mr10]}>
                        <Image
                          source={images.dummy1}
                          style={[image.image35]}></Image>
                      </View>
                      <View style={style.p10}>
                        <View>
                          <Text style={[text.text16, text.bold]}>
                            {data.firstname} {data.lastname}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={data.rating}
                            fullStarColor={'#F59E52'}
                            emptyStarColor={'#F59E52'}
                            starSize={15}
                            containerStyle={{width: 110, marginTop: 3}}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>

        {/* <ScrollView>
          <View>
            <View style={[style.mv20, style.mh10]}>
              <Text style={[text.goodfishbd, text.text18, text.center]}>
                Registered Mechanic Graph
              </Text>
            </View>
            <VictoryChart
              domainPadding={40}
              width={350}
              theme={VictoryTheme.material}>
              <VictoryGroup offset={10}>
                <VictoryBar data={data.electric} />
                <VictoryBar data={data.body} />
                <VictoryBar data={data.Painter} />
                <VictoryBar data={data.engine} />
              </VictoryGroup>
            </VictoryChart>
            <View style={[style.mv20, style.mh10]}>
              <Text style={[text.goodfishbd, text.text18, text.center]}>
                Registered Issues Graph
              </Text>
            </View>
            <VictoryChart domainPadding={40}>
              <VictoryGroup offset={25}>
                <VictoryBar data={data1.electricissue} />
                <VictoryBar data={data1.bodyissue} />
                <VictoryBar data={data1.engineissue} />
              </VictoryGroup>
            </VictoryChart>
            <VictoryPie
              labelComponent={<VictoryLabel angle={45} />}
              colorScale={['#008f68', '#6DB65B', '#4AAE9B', '#EFBB35']}
              data={[
                {x: 'Electric issue', y: this.state.electricissue},
                {x: 'Engine issue', y: this.state.engineissue},
                {x: 'Body issue', y: this.state.bodyissue},
              ]}
            />
          </View>
          <View
            style={[
              style.mb50,
              appStyle.bodyLayout,
              appStyle.bodyShadowBottom,
              {
                backgroundColor: colors.white,
                marginVertical: 20,
              },
            ]}>
            <View style={[appStyle.rowCenter]}>
              <View>
                <Text
                  style={({color: colors.Black323}, [text.text22, text.bold])}>
                  Booked Mechanics
                </Text>
                <Text style={([text.text14], {color: colors.gray})}>
                  (Today)
                </Text>
              </View>
              <View style={[{display: this.state.tabOverview}, style.flex1]}>
                <TouchableOpacity onPress={this.buyItems}>
                  <View
                    style={[
                      button.buttoncontainer,
                      {backgroundColor: colors.shadowColor},
                    ]}>
                    <Text
                      style={[
                        {color: colors.white},
                        button.touchablebutton,
                        text.semibold,
                      ]}>
                      {this.state.bookedmcount}
                    </Text>
                  </View>
                </TouchableOpacity>
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
            ]}>
            <View style={[appStyle.rowCenter]}>
              <View>
                <Text
                  style={({color: colors.Black323}, [text.text22, text.bold])}>
                  Registered Users
                </Text>
                <Text style={([text.text14], {color: colors.gray})}>
                  (Customers)
                </Text>
              </View>
              <View style={[{display: this.state.tabOverview}, style.flex1]}>
                <TouchableOpacity onPress={this.buyItems}>
                  <View
                    style={[
                      button.buttoncontainer,
                      {backgroundColor: colors.white},
                    ]}>
                    <Text
                      style={[
                        {color: colors.black},
                        button.touchablebutton,
                        text.semibold,
                      ]}>
                      {this.state.registereduser}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView> */}
      </SafeAreaView>
    );
  }
}

export default AdminDashboard;
