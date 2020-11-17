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
  AsyncStorage,
} from 'react-native';

import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../../config/Constant';
// import {BarChart} from 'react-native-chart-kit';
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
import axios from 'axios';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryGroup,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';

export default class Analytic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDaily: 'flex',
      TabWeekly: 'none',
      ColorDaily: colors.white,
      ColorWeekly: colors.inputBordercolor,
      tabDailybackgroundColor: colors.orange,
      tabWeeklybackgroundColor: colors.white,

      painter: '',
      engine: '',
      body: '',
      electric: '',
      electricissue: '',
      engineissue: '',
      bodyissue: '',
      registereduser: '',
      painterissuecount: '',
      topmechanics: [],
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    this.getmechanicdata();
    this.getissuedata();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getmechanicdata();
      this.getissuedata();
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
      .get(URL.Url + 'painterissuecount')
      .then((response) => {
        if (response) {
          console.log(response.data);
          this.setState({painterissuecount: response.data});
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

  tabDaily = () => {
    if (this.state.TabDaily == 'flex') {
      this.setState({ColorDaily: colors.white}),
        this.setState({ColorWeekly: colors.inputBordercolor});
      this.setState({TabWeekly: 'none'});
      this.setState({tabDailybackgroundColor: colors.orange});
      this.setState({tabWeeklybackgroundColor: colors.white});
    } else {
      this.setState({TabDaily: 'flex'}), this.setState({TabWeekly: 'none'});
      this.setState({ColorDaily: colors.white});
      this.setState({ColorWeekly: colors.inputBordercolor});
      this.setState({tabDailybackgroundColor: colors.orange});
      this.setState({tabWeeklybackgroundColor: colors.white});
    }
  };

  tabWeekly = () => {
    if (this.state.TabWeekly == 'flex') {
      this.setState({TabDaily: 'none'});

      this.setState({ColorDaily: colors.inputBordercolor}),
        this.setState({ColorWeekly: colors.white});
      this.setState({tabDailybackgroundColor: colors.white});
      this.setState({tabWeeklybackgroundColor: colors.orange});
    } else
      this.setState({TabWeekly: 'flex'}), this.setState({TabDaily: 'none'});

    this.setState({ColorDaily: colors.inputBordercolor});
    this.setState({ColorWeekly: colors.white});
    this.setState({tabDailybackgroundColor: colors.white});
    this.setState({tabWeeklybackgroundColor: colors.orange});
  };

  render() {
    const data = {
      electric: [{x: 'Electritions', y: this.state.electric}],
      engine: [{x: 'Engine', y: this.state.engine}],
      body: [{x: 'Body', y: this.state.body}],
      Painter: [{x: 'Painter', y: this.state.painter}],
    };
    const data1 = {
      electricissue: [{x: 'Electric', y: this.state.electricissue}],
      engineissue: [{x: 'Engine', y: this.state.engineissue}],
      painterissuecount: [{x: 'Painter', y: this.state.painterissuecount}],
      bodyissue: [{x: 'Body', y: this.state.bodyissue}],
    };
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar
          barStyle={'dark-content'}
          translucent={true}
          backgroundColor={'transparent'}
        />

        {/*Body */}
        <View style={{marginTop: 40}} />

        <View style={[style.row, style.mh10]}>
          <View style={[style.mh5]}>
            <Text style={[text.heading1purple, text.bold]}>Analytics</Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>
              Review Analytics
            </Text>
          </View>
          <View></View>
        </View>

        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
            <View
              style={[
                appStyle.rowBtw,
                appStyle.bodyTop,
                {backgroundColor: colors.white, borderColor: colors.gray5d},
              ]}>
              <TouchableOpacity
                onPress={this.tabDaily}
                style={[
                  {backgroundColor: this.state.tabDailybackgroundColor},
                  appStyle.colLeft,
                ]}>
                <Text
                  style={[
                    style.asCenter,
                    text.heading2,
                    {color: this.state.ColorDaily},
                  ]}>
                  Statistics
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.tabWeekly}
                style={[
                  appStyle.colRight,
                  {backgroundColor: this.state.tabWeeklybackgroundColor},
                ]}>
                <Text
                  style={[
                    style.asCenter,
                    text.heading2,

                    {color: this.state.ColorWeekly},
                  ]}>
                  Issues
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{display: this.state.TabDaily}}>
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

              <View style={[style.mv30]}>
                <Text style={[text.heading1purple, text.bold]}>Report</Text>
              </View>
              <View style={[style.asCenter]}>
                <View style={[appStyle.bigdashboardCard]}>
                  <View style={[style.jcCenter]}>
                    <Text style={[text.textbox, text.center, style.mb5]}>
                      Mechanics
                    </Text>

                    <Text
                      style={[
                        text.center,
                        {color: colors.orange},
                        text.text22,
                        style.mb5,
                      ]}>
                      {this.state.registereduser}
                    </Text>

                    <Text
                      style={[
                        text.center,
                        text.text14,
                        {color: colors.orange},
                      ]}>
                      Total Online
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[style.rowBtw, style.mv10]}>
                <View style={[appStyle.bigdashboardCard]}>
                  <View style={[style.jcCenter]}>
                    <Text style={[text.textbox, text.center, style.mb5]}>
                      Mechanics
                    </Text>

                    <Text
                      style={[
                        text.center,
                        {color: colors.orange},
                        text.text22,
                        style.mb5,
                      ]}>
                      {this.state.registereduser}
                    </Text>

                    <Text
                      style={[
                        text.center,
                        text.text14,
                        {color: colors.orange},
                      ]}>
                      Total Online
                    </Text>
                  </View>
                </View>
                <View style={[appStyle.bigdashboardCard]}>
                  <View style={[style.jcCenter]}>
                    <Text style={[text.textbox, text.center, style.mb5]}>
                      Users
                    </Text>
                    <Text
                      style={[
                        text.center,
                        {color: colors.orange},
                        text.text22,
                        style.mb5,
                      ]}>
                      {this.state.registereduser}
                    </Text>

                    <Text
                      style={[
                        text.text14,
                        text.center,
                        {color: colors.orange},
                      ]}>
                      Total Online
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Issuess */}
            <View style={{display: this.state.TabWeekly}}>
              <VictoryChart
                domainPadding={40}
                width={350}
                theme={VictoryTheme.material}>
                <VictoryGroup offset={10}>
                  <VictoryBar data={data1.electricissue} />
                  <VictoryBar data={data1.bodyissue} />
                  <VictoryBar data={data1.painterissuecount} />
                  <VictoryBar data={data1.engineissue} />
                </VictoryGroup>
              </VictoryChart>

              <View style={[style.mv30]}>
                <Text style={[text.heading1purple, text.bold]}>Report</Text>
              </View>
              <View style={[style.rowBtw, style.mv10]}>
                <View style={[appStyle.bigdashboardCard]}>
                  <View style={[style.jcCenter]}>
                    <Text style={[text.textbox, text.center, style.mb5]}>
                      Body
                    </Text>
                    <Text
                      style={[
                        text.center,
                        {color: colors.orange},
                        text.text22,
                        style.mb5,
                      ]}>
                      {this.state.bodyissue}
                    </Text>

                    <Text
                      style={[
                        text.center,
                        text.text14,
                        {color: colors.orange},
                      ]}>
                      Total Issues
                    </Text>
                  </View>
                </View>
                <View style={[appStyle.bigdashboardCard]}>
                  <View style={[style.jcCenter]}>
                    <Text style={[text.textbox, text.center, style.mb5]}>
                      Engine
                    </Text>
                    <Text
                      style={[
                        text.center,
                        {color: colors.orange},
                        text.text22,
                        style.mb5,
                      ]}>
                      {this.state.engineissue}
                    </Text>

                    <Text
                      style={[
                        text.text14,
                        text.center,
                        {color: colors.orange},
                      ]}>
                      Total Engine
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[style.rowBtw, style.mv10]}>
                <View style={[appStyle.bigdashboardCard]}>
                  <View style={[style.jcCenter]}>
                    <Text style={[text.textbox, text.center, style.mb5]}>
                      Electrician
                    </Text>
                    <Text
                      style={[
                        text.center,
                        {color: colors.orange},
                        text.text22,
                        style.mb5,
                      ]}>
                      {this.state.electricissue}
                    </Text>

                    <Text
                      style={[
                        text.center,
                        text.text14,
                        {color: colors.orange},
                      ]}>
                      Total Electricians
                    </Text>
                  </View>
                </View>
                <View style={[appStyle.bigdashboardCard]}>
                  <View style={[style.jcCenter]}>
                    <Text style={[text.textbox, text.center, style.mb5]}>
                      Painter
                    </Text>
                    <Text
                      style={[
                        text.center,
                        {color: colors.orange},
                        text.text22,
                        style.mb5,
                      ]}>
                      {this.state.painterissuecount}
                    </Text>

                    <Text
                      style={[
                        text.text14,
                        text.center,
                        {color: colors.orange},
                      ]}>
                      Total Painter
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
