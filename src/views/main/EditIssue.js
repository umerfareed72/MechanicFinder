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
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  COLORS,ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import RNPickerSelect from 'react-native-picker-select';
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../../config/Constant';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
const axios = require('axios');
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

export default class Editissue extends Component {
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
      vehicaltype: '',
      userdbid: '',
      city: '',
      status: '',
      description: '',
      token: '',
      issuedata:[],
      issueid:'',

    };
  }
    getData = async () => {
    try {
      await AsyncStorage.getItem('issuedata').then((res) => {
        res = JSON.parse(res);
        this.setState({issuedata: res});
        this.setState({issueid: res._id});
        this.setState({vehicaltype: res.vehicaltype});
        this.setState({issuetype: res.issuetype});
        this.setState({carcompany: res.carcompany});
        this.setState({city: res.city});
        this.setState({Phone: res.phone});
        this.setState({description: res.description});
        
    });

    
      
    } catch (error) {}
  };
  async componentDidMount() {
    const {navigation} = this.props;
    this.getData();
    
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getData();
    
    });
  }
  
  submitData = () => {
    axios
      .put(URL.Url + 'updateissue/'+this.state.issueid, { 
        issuetype: this.state.issuetype,
        phone: this.state.Phone,
        photo: this.state.photo,
        carcompany: this.state.carcompany,
        city: this.state.city,
        status: this.state.status,
        description: this.state.description,
        vehicaltype: this.state.vehicaltype,
        userdbid: this.state.userdbid,
        date: new Date().getDate(),
      })
      .then(async (res) => {
        console.log(res.data);
        console.log(this.state.userdbid);
        
        ToastAndroid.show(
          'Issue updated Successfully we will help U soon!',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        try {
          this.props.navigation.navigate('IssueListC');
        } catch (e) {
          console.log('error hai', e);
        }
      })
      .catch((error) => {
        Alert.alert('something went Wrong try again!!');

        console.log(error);
      });
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

  tabStep2 = () => {
    if (this.state.TabDataStep2 == 'flex') {
      this.setState({TabDataStep1: 'none'}),
        this.setState({TabDataStep3: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataStep4: 'none'});
      this.setState({color: 'none'});
      this.setState({ColorStep1: colors.inputBordercolor}),
        this.setState({ColorStep3: colors.inputBordercolor}),
        this.setState({ColorStep4: colors.inputBordercolor}),
        this.setState({ColorStep2: colors.darkBlue});
    } else
      this.setState({TabDataStep2: 'flex'}),
        this.setState({TabDataStep1: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataStep3: 'none'});
    this.setState({TabDataStep4: 'none'});
    this.setState({ColorStep1: colors.inputBordercolor});
    this.setState({ColorStep3: colors.inputBordercolor});
    this.setState({ColorStep2: colors.darkBlue});
    this.setState({ColorStep4: colors.inputBordercolor});
  };
  render() {
    const {issuedata} = this.state;
    
    console.log(this.state);
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
                   Edit Issue
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
                  style.aiCenter,
                  appStyle.bodyLayout,
                  appStyle.bodyShadowTop,
                  style.mh40,
                  {
                    backgroundColor: colors.lightgray,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => this.tabStep1()}
                  style={style.mh20}>
                  <Text
                    style={[
                      text.heading2,
                      text.semibold,

                      {color: this.state.ColorStep1},
                    ]}>
                    Step 1
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.tabStep2()}
                  style={style.mh20}>
                  <Text
                    style={[
                      text.heading2,
                      text.semibold,
                      {color: this.state.ColorStep2},
                    ]}>
                    Step 2
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
                    Update anything you Want
                  </Text>
                </View>
                <View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.cartype}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.vehicaltype}
                      style={[
                        {height: 50, width: 180, left: -8, color: colors.gray},
                      ]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({vehicaltype: itemValue})
                      }>
                      <Picker.Item label="Select Vehicle Type" value="" />
                <Picker.Item label="Heavy Truck" value="Heavy Truck" />
                <Picker.Item label="Car" value="Car" />
                <Picker.Item label="Jeep" value="Jeep" />
                <Picker.Item label="Bus" value="Bus" />
                    </Picker>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.location}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.city}
                      style={[
                        {height: 50, width: 180, left: -8, color: colors.gray},
                      ]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({city: itemValue})
                      }>
                      <Picker.Item label="Select Your City" value="" />
                      <Picker.Item label="Lahore" value="Lahore" />
                      <Picker.Item label="Islamabad" value="Islamabad" />
                      <Picker.Item label="Karachi" value="Karachi" />
                      <Picker.Item label="Multan" value="Multan" />
                    </Picker>
                  </View>

                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.help}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.carcompany}
                      style={[
                        {height: 50, width: 180, left: -8, color: colors.gray},
                      ]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({carcompany: itemValue})
                      }>
                      <Picker.Item label="Select Vehicle Company" value="Vehicle" />
                <Picker.Item label="Honda" value="Honda" />
                <Picker.Item label="Toyota" value="Toyota" />
                <Picker.Item label="Suzuki" value="Suzuki" />
                <Picker.Item label="KIA" value="KIA" />
                <Picker.Item label="Hundai" value="Hundai" />
                <Picker.Item label="AUDI" value="AUDI" />
                <Picker.Item label="Mercedese" value="Mercedese" />
                <Picker.Item label="Range Rover" value="Range Rover" />
                    </Picker>
                  </View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.electric}
                      style={image.InputImage}></Image>

                    <Picker
                      selectedValue={this.state.issuetype}
                      style={[
                        {height: 50, width: 180, left: -8, color: colors.gray},
                      ]}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({issuetype: itemValue})
                      }>
                      <Picker.Item label="Issue Type" value="" />
                      <Picker.Item label="Electric" value="Electric" />
                      <Picker.Item label="Engine" value="Engine" />
                      <Picker.Item label="Body" value="Body" />
                    </Picker>
                  </View>
                  <View style={[input.textinputcontainer, style.mv5]}>
                    <Image
                      source={images.phone}
                      style={image.InputImage}></Image>

                    <TextInput
                      style={input.textinputstyle}
                    //   placeholder={this.state.Phone}
                     
                 
                      keyboardType={'numeric'}
                      
                        
                       
                      onChangeText={(text) => {
                        this.setState({
                          Phone: text,
                        });
                      }} 
                      underlineColorAndroid="transparent"></TextInput>
                  </View>
                </View>
                <TouchableOpacity onPress={this.tabStep2}>
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
                      Next
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  {
                    backgroundColor: colors.white,
                    display: this.state.TabDataStep2,
                  },
                ]}>
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
                       // placeholder={this.state.description}
                        onChangeText={(text) => {
                          this.setState({
                            description: text,
                          });
                        }}
                        numberOfLines={10}
                        multiline={true}
                      />
                    </View>
                  </View>

                  <TouchableOpacity onPress={this.submitData}>
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
                        Update Issue !
                      </Text>
                    </View>
                  </TouchableOpacity>
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