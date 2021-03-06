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
export default class Chelp extends Component {
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
      
    this.showreports();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
     this.showreports();
    });
    ;
  };

  movetodetail = (id) => {
    const reportdata = JSON.stringify(this.state.dataSource[id]);
    AsyncStorage.setItem('chelpdata', reportdata);
    setTimeout(() => {
      this.props.navigation.navigate('CustomerHelpProfile');
    }, 2000);
  };

showreports = async() => {
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

  
  console.log('in showreports');
  await axios    
    .get(URL.Url + 'cgethelp')  
    .then((response) => {
      if (response.data) {  
        console.log(response.data);
      }
         this.setState({dataSource: response.data});
        console.log(this.state.dataSource);
      if (this.state.dataSource == '')
      ToastAndroid.show(
        'No Help Issue !',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
    })
    .catch((error) => {
      console.log('ye lo 1', error);
    });
 
};



  
 

  gettingdatamechanicuser = () => {
    axios
          .get(URL.Url + 'user/' + this.state.userid)
          .then((response) => {
            if (response) {
              console.log(response.data);
            
            }   
          })
          .catch((error) => {
            console.log(error);
          });
        //   axios
        //   .get(URL.Url + 'mechanic/' + this.state.mdbid)
        //   .then((response) => {
        //     if (response) {
        //       console.log(response.data);
        //      this.setState({mphone:response.data.phone})
        //     }   
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
}
  deletereport = (id) => {
    const reportdata = this.state.dataSource[id];
    console.log(reportdata)
    axios
      .delete(URL.Url + 'deletechelp/' + reportdata._id)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
         
          ToastAndroid.show(
            'Report deleted successfully!',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
          this.showreports();
        }
      })
      .catch((error) => {
        console.log('ye lo 2', error);
        Alert.alert('something is wrong')
      });
  }
  render() {
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <View style={{marginTop: 40}} />
        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminDashboard')}>
            <Image source={images.backarrowh} style={image.backArrow2}></Image>
          </TouchableOpacity>
         
          <View>
            <Text style={[text.heading1purple, text.bold]}>
               Customers Help Questions 
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>Currently Added Reports</Text>
          </View>
         <View></View>
        </View>
        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
            {this.state.dataSource.map((data, index) => {
              return (
              
            
                <TouchableOpacity
                key={index}
                onPress={() => this.movetodetail(index)}
                style={[
                  appStyle.slotCard,
                  appStyle.rowJustify,
                  style.aiCenter,
                ]}>
                <View style={[style.row, style.aiCenter]}>
                  <View style={style.mr10}>
                    <Image
                      style={image.userImg}
                      source={{ uri: data.userimage }}
                    />
                  </View>
                  <View>
                    <Text style={[text.text16, text.bold]}>
                      {data.question}
                    </Text>
                    <Text style={[text.text15, { color: colors.gray, width: 100 }]} numberOfLines={1} ellipsizeMode='tail'>
                      {data.message}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.deletereport(index);
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