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
import {VictoryBar, VictoryChart, VictoryGroup} from 'victory-native';
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
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    this.getmechanicdata();
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
    const data = {
      electric: [{x: 'Electritions', y: this.state.electric}],
      engine: [{x: 'Engine', y: this.state.engine}],
      body: [{x: 'Body', y: this.state.body}],
      Painter: [{x: 'Painter', y: this.state.painter}],
    };
    const data1 = {
      electricissue: [{x: 'Electric issue', y: this.state.electricissue}],
      engineissue: [{x: 'Engine issue', y: this.state.engineissue}],
      bodyissue: [{x: 'Body issue', y: this.state.bodyissue}],
      Painterissue: [{x: 'Painting issue', y: this.state.bodyissue}],
      
    };
    return (
      <View>
        <ScrollView>
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
                  <Text style={[text.heading1]}>Dashboard</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View>
            <View style={[style.mv20, style.mh10]}>
              <Text style={[text.goodfishbd, text.text18, text.center]}>
                Registered Mechanic Graph
              </Text>
            </View>
            <VictoryChart>
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
            <VictoryChart>
              <VictoryGroup offset={25}>
                <VictoryBar data={data1.electricissue} />
                <VictoryBar data={data1.bodyissue} />
                <VictoryBar data={data1.engineissue} />
              </VictoryGroup>
            </VictoryChart>
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
        </ScrollView>
      </View>
    );
  }
}

export default AdminDashboard;
