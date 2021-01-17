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
  Alert,
  StyleSheet,
  KeyboardAvoidingView,ToastAndroid
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
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Textarea from 'react-native-textarea';
import { connect } from "react-redux";
import {withSafeAreaInsets} from 'react-native-safe-area-context';
 class Reportcustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carcompany: '',
      reporttype: '',  
      userdbid: this.props.navigation.getParam('userdbid','nothing sent'),
      photo: this.props.navigation.getParam('photo','nothing sent'),
      reportdescription: '',
      date: Date().toLocaleString(),
 
    };
  }

  submitReport = () => {
    axios
      .post(URL.Url + 'Mreportregister', {
        reportdescription: this.state.reportdescription,
        reporttype: this.state.reporttype,
        userdbid: this.state.userdbid,
        mdbid:this.props.auth.user._id,
        date:this.state.date,
        mechanicphoto:this.state.photo
      })
      .then(async (res) => {
        console.log(res.data);
         ToastAndroid.show(
          'Customer Reported Successfully!!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        try {
          this.props.navigation.navigate('UserProfileDetail');
        } catch (e) {
          console.log('error hai', e);
        }
      })
      .catch((error) => {
        Alert.alert('something went Wrong try again!!');

        console.log(error);
      });
  };

  render() {
  
     return (
      <SafeAreaView style={style.flex1}>
      <StatusBar />
      <KeyboardAvoidingView
        style={{backgroundColor: colors.white, flexGrow: 1}}>
        <ScrollView>
          <View>
            <LinearGradient
              colors={colors.orablu}
              start={{x: -0.9, y: 1}}
              end={{x: 1, y: 0}}
              style={[style.headerHeight4]}>
              <View style={[style.aiCenter, style.jcCenter, style.flex1]}>
                <Text style={[text.text30, {color: colors.white}]}>
                  Register Issue
                </Text>
                <Text style={[text.text20, {color: colors.white},text.goodfishbd,style.mv5]}>(Register An Issue)</Text>
              </View>
            </LinearGradient>
          </View>
          <View style={[appStyle.bodyBg]}>
            <View style={[appStyle.headingLayout]}>
              <Text style={[style.headerStyle, style.bottomborder]}>
                Explain Your Issue Here !
              </Text>
            </View>
            {/* <View style={[style.mh20]}> */}
              <View style={[style.mt10,style.mh30]}>
                <Text style={[text.heading2]}>Issue Type</Text>
              </View>

              <View style={[input.textinputcontainer, style.mv5]}>
                <Image
                  source={images.cartype}
                  style={image.InputImage}></Image>
                <Picker
                  selectedValue={this.state.reporttype}
                  style={[text.pickerstyle]}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({reporttype: itemValue})
                  }>
                  <Picker.Item label="Select Report Type" value="" />
                  <Picker.Item label="Abusive" value="Abusive" />
                  <Picker.Item label="Violent" value="Violent" />
                  <Picker.Item label="Fraud" value="Fraud" />
                  <Picker.Item label="Inappropriate" value="Inappropriate" />
                </Picker>
              </View>

              <View style={[style.mt10,style.mh30]}>
                <Text style={[text.heading2]}>Describe your Issue</Text>
              </View>
              <View>
                <View style={[style.aiCenter,style.mh30,style.mv10]}>
                  <View style={[appStyle.textareaBorder, style.w100]}>
                    <Textarea
                      onChangeText={(text) => {
                        this.setState({reportdescription: text});
                      }}
                      placeholder={'Type message here'}
                      placeholderTextColor={'#c7c7c7'}
                      underlineColorAndroid={'transparent'}
                    />
                  </View>
                </View>

                <TouchableOpacity onPress={this.submitReport}>
                  <View
                    style={[
                      button.buttoncontainer,
                      style.mt20,
                      style.mh50,
                      {backgroundColor: colors.purple},
                    ]}>
                    <Text
                      style={[
                        {color: colors.white},
                        button.touchablebutton,
                        text.semibold,
                      ]}>
                      Report Issue !
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          {/* </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
     )
    }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Reportcustomer);
