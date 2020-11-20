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
  Button,
  Platform,
  Alert,ToastAndroid
} from 'react-native';
const axios = require('axios');
import {
  URL,
  colors,
  screenHeight,
  screenWidth,
  images,
} from '../../config/Constant';
import {Animated} from 'react-native';

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
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import {color} from 'react-native-reanimated';
export default class Highratedmechanics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      isModalVisible: false,
    };
    this.state = {
      dataSource: [],
      slot: '',
      userId: '',
      userdbid: '',
      token: '',
      
      topmechanics: [],
    };
  }

  componentDidMount = () => {
    this.gettopMechanics();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
     this.gettopMechanics();
    });
  };

  //   getid = () => {
  //     AsyncStorage.getItem('userdata').then((res) => {
  //     const  response=JSON.parse(res)
  //      this.setState({userdbid: response._id})
  //   })
  //   };


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

  movetodetail = (id) => {
    const reportdata = JSON.stringify(this.state.dataSource[id]);
    AsyncStorage.setItem('reportdata', reportdata);
    setTimeout(() => {
      this.props.navigation.navigate('Reportmechanicdetail');
    }, 2000);
  };

  deletereport = (id) => {
    const reportdata = this.state.dataSource[id];
    console.log(reportdata);
    axios
      .delete(URL.Url + 'Cdeletereport/' + reportdata._id)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          ToastAndroid.show(
            'Report Deleted Successfully!',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
          this.showreports();
        }
      })
      .catch((error) => {
        console.log('ye lo 2', error);
        Alert.alert('something is wrong');
      });
  };
  render() {
    const {topmechanics} = this.state;
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <View style={{marginTop: 40}} />
        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AdminDashboard')}>
            <Image source={images.backarrowh} style={image.backArrow2}></Image>
          </TouchableOpacity>

          <View>
            <Text style={[text.heading1purple, text.bold]}>
              High Rated Mechanics 
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>
          
            </Text>
          </View>
          <View></View>
        </View>
        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
          {topmechanics.map((data, index) => {
               {
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
                          source={{uri:data.photo}}
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
      </SafeAreaView>
    );
  }
}
