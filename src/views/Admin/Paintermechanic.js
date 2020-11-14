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
export default class Paintermechanic extends Component {
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

  componentDidMount = () => {    // this.getid()
    // this.showIssues();
     this.focusListener = this.props.navigation.addListener('didFocus', () => {
     this.showIssues();
    });
    ;
  };

 
  showIssues = async() => {
    // AsyncStorage.getItem('userId')
    //   .then((res) => {
    //     const id = JSON.parse(res);
    //     this.setState({userId: id});

    // AsyncStorage.getItem('usersignintoken').then((res) => {
    //   this.setState({token: res});
    //   console.log(this.state.token);
    //   axios
    //     .get(URL.Url + 'me', {
    //       headers: {
    //         'x-access-token': this.state.token,
    //       },
    //     })
    //     .then((response) => {
    //       this.setState({userdbid: response.data.userid}).catch((error) => {
    //         console.log(error);
    //       });
    //     });
    // });

    
    console.log('in showissuesC');
    await axios
      .get(URL.Url + 'paintermechanic')
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        }
          this.setState({dataSource: response.data});
          console.log(this.state.dataSource);
       
      })
      .then(()=>{
        if (this.state.dataSource === '')
        ToastAndroid.show(
          'No Mechanic Registered !',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      })
      .catch((error) => {
        console.log('ye lo 1', error);
      });
   
  };

  
  movetodetail = (id) => {
    const issuedata = JSON.stringify(this.state.dataSource[id]);
    AsyncStorage.setItem('mechanicddata', issuedata);
    setTimeout(() => {
      this.props.navigation.navigate('Mechanicdetail',{mechanicid:this.state.dataSource[id]._id});
    }, 2000);
  };
 
  deleteissue = (id) => {
    const issuedata = this.state.dataSource[id];
    console.log(issuedata);
    axios
      .delete(URL.Url + 'deletemechanic/' + issuedata._id)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          ToastAndroid.show(
            'User Account Deleted !',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MechanicManagement')}>
            <Image source={images.backarrowh} style={image.backArrow2}></Image>
          </TouchableOpacity>
         
          <View>
            <Text style={[text.heading1purple, text.bold]}>
              Painter Mechanics :
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>Currently Registered</Text>
          </View>
          <TouchableOpacity>
           
          </TouchableOpacity>
        </View>
        <ScrollView >
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
                      <Image style={image.userImg} source={{uri:data.photo}} />
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
                             {data.firstname}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <Image
                            style={[image.xsmall, image.Orange]}
                            source={images.Company}></Image>
                          <Text style={[text.text15, {color: colors.gray}]}>
                           {data.skilltype} Mechanic of {data.vehicletype}
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
