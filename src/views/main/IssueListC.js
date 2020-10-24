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
  Alert,
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
export default class Mechaniclist extends Component {
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
    };
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    this.getid();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getid();
      });
  
  };

  getid = () => {
    AsyncStorage.getItem('userdata').then((res) => {
      const response = JSON.parse(res);
      this.setState({userdbid: response._id});
      axios
      .get(URL.Url + 'vehicalissuesC/' + this.state.userdbid)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.setState({dataSource: response.data});
          console.log(this.state.dataSource);
        }
        if (this.state.dataSource == '')
          Alert.alert('No issue is posted by you!');
      })
      .catch((error) => {
        console.log('ye lo 1', error);
      });
    });
  };

  
  movetodetail = (id) => {
    const issuedata = JSON.stringify(this.state.dataSource[id]);
    AsyncStorage.setItem('issuedata', issuedata);
    setTimeout(() => {
      this.props.navigation.navigate('Issuedetail');
    }, 2000);
  };
  movetoedit = (id) => {
    const issuedata = JSON.stringify(this.state.dataSource[id]);
    AsyncStorage.setItem('issuedata', issuedata);
    setTimeout(() => {
      this.props.navigation.navigate('EditIssue');
    }, 2000);
  };

  deleteissue = (id) => {
    const issuedata = this.state.dataSource[id];
    console.log(issuedata);
    axios
      .delete(URL.Url + 'deleteissue/' + issuedata._id)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          Alert.alert('Issue deleted successfully!');
          this.showIssues();
        }
      })
      .catch((error) => {
        console.log('ye lo 2', error);
        Alert.alert('something is wrong');
      });
  };
  render() {
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <View style={{marginTop: 40}} />
        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dashboard')}>
            <Image source={images.backarrowh} style={image.backArrow2}></Image>
          </TouchableOpacity>
         
          <View>
            <Text style={[text.heading1purple, text.bold]}>
              Posted Vehical Issues
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>Active Issues</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PostVehicleIssue')}>
            <Image style={image.iconAdd} source={images.add}></Image>
          </TouchableOpacity>
        </View>
        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
            {this.state.dataSource.map((data, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  // onPress={()=>{this.props.navigation.navigate("HomeDetail")}}
                  onPress={() => this.movetodetail(index)}
                  style={[
                    appStyle.slotCard,
                    appStyle.rowJustify,
                    style.aiCenter,
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
                            {data.issuetype} issue in {data.vehicaltype}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <Image
                            style={[image.xsmall, image.Orange]}
                            source={images.Company}></Image>
                          <Text style={[text.text15, {color: colors.gray}]}>
                            {data.carcompany}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <Image
                            style={image.xsmall}
                            source={images.location}></Image>
                          <Text style={[text.text15, {color: colors.gray}]}>
                            {data.city}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.deleteissue(index);
                    }}>
                    <Image
                      style={[image.forward]}
                      source={images.delete}></Image>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
