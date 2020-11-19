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
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
export default class Reportmechanic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TabDataStep1: 'flex',
      TabDataStep2: 'none',
      TabDataStep3: 'none',
      TabDataStep4: 'none',
      ColorStep1: colors.darkBlue,
      ColorStep2: colors.inputBordercolor,
      ColorStep3: colors.inputBordercolor,
      ColorStep4: colors.inputBordercolor,
      issuetype: '',
      photo: '',
      Phone: '',
      carcompany: '',
      reporttype: '',  
      userdbid: '',
      city: '',
      status: '',
      reportdescription: '',
      token: '',
      date: 'Select date of Incident',
      mdbid:this.props.navigation.getParam('mdbid','nothing sent'),
      userdata:'',
      userphoto:''  
    };
  }

  componentDidMount = () => {
   this.getid();
  };

  getid = () => {
    AsyncStorage.getItem('usersignintoken').then((res) => {
      this.setState({token: res});
      console.log(this.state.token);
      axios
        .get(URL.Url + 'me', {
          headers: {
            'x-access-token': this.state.token,
          },
        })
        .then((response) => {
          this.setState({userdbid: response.data.userid}).catch((error) => {
            console.log(error);
          });
        });
    });
    AsyncStorage.getItem('userdata').then((res) => {
      
      this.setState({userdata: JSON.parse(res)});
      this.setState({userphoto:this.state.userdata.photo})
      console.log('userphoto12',this.state.userphoto)
     
      console.log('firstname',this.state.userdata.photo)
      
    })
  };

  validatefield = () => {
    if (this.state.date == '') {
      ToastAndroid.show(
        'Date Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.reportdescription == '') {
      ToastAndroid.show(
        'Description Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.reporttype == '') {
      ToastAndroid.show(
        'Report type Is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } 
    return true;
  };
  

  
  
  submitReport = () => {
    if(this.validatefield()){axios
      .post(URL.Url + 'Creportregister', {
        reportdescription: this.state.reportdescription,
        reporttype: this.state.reporttype,
        userdbid: this.state.userdbid,
        mdbid:this.state.mdbid,
        date: this.state.date,
        userphoto:this.state.userdata.photo
      })
      .then(async (res) => {
        console.log(res.data);
        console.log(this.state.userdbid);
        ToastAndroid.show(
          'Mechanic Reported Successfully!!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        try {
          this.props.navigation.navigate('Issuedetail');
        } catch (e) {
          console.log('error hai', e);
        }
      })
      .catch((error) => {
        Alert.alert('something went Wrong try again!!');

        console.log(error);
      });}
    
  };

  tabStep1 = () => {
    if (this.state.TabDataStep1 == 'flex') {
      this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep3: 'none'}),
        this.setState({TabDataStep4: 'none'});
      this.setState({BookNowView: 'flex'}),
        this.setState({ColorStep1: colors.darkBlue}),
        this.setState({ColorStep3: colors.inputBordercolor}),
        this.setState({ColorStep2: colors.inputBordercolor});
      this.setState({ColorStep4: colors.inputBordercolor});
    } else
      this.setState({TabDataStep1: 'flex'}),
        this.setState({TabDataStep2: 'none'}),
        this.setState({TabDataStep3: 'none'});
    this.setState({TabDataStep4: 'none'});
    this.setState({BookNowView: 'flex'});
    this.setState({ColorStep1: colors.darkBlue});
    this.setState({ColorStep3: colors.inputBordercolor});
    this.setState({ColorStep2: colors.inputBordercolor});
    this.setState({ColorStep4: colors.inputBordercolor});
  };

  render() {
   // console.log('propppppppp',this.props)
     console.log('userid121',this.state.userdbid)
    console.log('mechanicid121',this.state.mdbid);
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
                  <Text style={[text.text35, {color: colors.white}]}>
                   Report Mechanic
                  </Text>
                  <Text style={[text.text20, {color: colors.white}]}>
                   
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View style={[appStyle.bodyBg]}>
              <View
                style={[
                  appStyle.rowBtw,
                  appStyle.bodyLayout,
                  appStyle.bodyShadowTop,
                  {backgroundColor: '#fff'},
                ]}>
                <TouchableOpacity onPress={() => this.tabStep1()}>
                  <Text
                    style={[
                      text.tab,
                      text.semibold,
                      {color: this.state.ColorStep1},
                    ]}>
                    
                  </Text>
                </TouchableOpacity>

                
              </View>
              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.BookNowView,
                  },
                ]}>
                <View style={[appStyle.headingLayout]}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Please Give discription of report
                  </Text>
                </View>
                <View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.cartype}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.reporttype}
                      style={[
                        {height: 50, width: 200, left: -8, color: colors.gray},
                      ]}
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
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <View>
                      <DatePicker
                        style={{width: 220}}
                        mode="date"
                        placeholder={this.state.date}
                        format="YYYY-MM-DD"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: -5,
                            top: 4,
                            height: 25,
                            width: 24,
                            resizeMode: 'contain',
                          },
                          dateInput: {
                            borderColor: colors.white,
                          },
                          dateText: {
                            color: colors.gray,
                          },

                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                          this.setState({date: date});
                        }}
                      />
                    </View>
                  </View>


                  <View style={[appStyle.headingLayout]}>
                  <Text style={[style.headerStyle, style.bottomborder]}>
                    Provide information about issue{' '}
                  </Text>
                </View>
                <View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <View style={styles.textAreaContainer}>
                      <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="                     Describe your issue here.."
                        onChangeText={(text) => {
                          this.setState({
                            reportdescription: text,
                          });
                        }}
                        numberOfLines={10}
                        multiline={true}
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
              </View>        
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderWidth: 0.5,
    padding: 1,
  },
  textArea: {
    height: 200,
    width: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
});