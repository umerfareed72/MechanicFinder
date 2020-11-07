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
} from 'react-native';
import Modal from 'react-native-modal';

import {
  colors,
  URL,
  screenHeight,
  screenWidth,
  images,
} from '../../config/Constant';
var FloatingLabel = require('react-native-floating-labels');
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import ImagePicker from 'react-native-image-picker';
import Textarea from 'react-native-textarea';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';

export default class AddServiceRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      loading: false,
      items: [],
      isModalVisible: false,
      refreshing: false,
      title: '',
      price: '',
    
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  submitdata = () => {
    axios
      .post(URL.Url + 'addservices', {
     servicename:this.state.title,
     serviceamount:this.state.price
      })
      .then((response) => {
        console.log(response.data);
        alert('Item Successfully Added')
      });
};
  render() {
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar barStyle={'light-content'} translucent={true} />
        {/*Body */}
        <View style={{}}>
              <LinearGradient
                colors={colors.orablu}
                start={{x: -0.9, y: 1}}
                end={{x: 1, y: 0}}
                style={{height: screenHeight.height25}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={[image.headerBackArrow]}>
                  <Image
                    style={[image.backArrow]}
                    source={images.backArrow}></Image>
                </TouchableOpacity>
                <View style={[appStyle.headInner]}>
                  <View style={[]}>
                    <Text style={[text.heading1, text.bold]}>Add Service Rates</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
        
        <View style={[appStyle.bodyBg, style.flex1]}>
          <ScrollView>
              <View style={appStyle.headingLayout}
              ><Text style={text.h1}>Add Services</Text></View>
            <View style={[style.pv20]}>
              <View style={input.floatInput}>
                <FloatingLabel
                  onChangeText={(text) => {
                    this.setState({title: text});
                  }}
                  labelStyle={input.labelInput}
                  inputStyle={input.input}
                  style={input.formInput}
                  onBlur={this.onBlur}>
                Service Name
                </FloatingLabel>
              </View>

              <View style={input.floatInput}>
                <FloatingLabel
                  onChangeText={(text) => {
                    this.setState({price: text});
                  }}
                  labelStyle={input.labelInput}
                  inputStyle={input.input}
                  style={input.formInput}
                  onBlur={this.onBlur}>
                  Service Rate
                </FloatingLabel>
              </View>
         
              <TouchableOpacity
                onPress={this.submitdata}
                style={[button.button1, style.mt40, style.aiCenter]}>
                <Text style={button.btntext1}>Add Product</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
