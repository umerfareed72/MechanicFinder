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
} from 'react-native';
import {
  colors,
  URL,
  screenHeight,
  screenWidth,
  images,
} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
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

import axios from 'axios';

export default class MServiceRateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      isModalVisible: false,
      products: [],
      slot: '',
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  getProduct = () => {
    axios.get(URL.Url + 'getServices').then((response) => {
      this.setState({products: response.data});
    });
  };
  componentDidMount() {
    const {navigation} = this.props;
    this.getProduct();
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getProduct();
    });
  }

  render() {
    const {products} = this.state;
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          // translucent={true}
        />

        {/*Body */}
        <View style={{marginTop: 40}} />

        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <View>
            <Text style={[text.heading1purple, text.bold]}>Service Rates</Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>
              Maintenence Service Rates
            </Text>
          </View>
          <View></View>
        </View>

        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
            {products.map((item, index) => {
              return (
                <TouchableOpacity
                >
                  <View
                    style={[
                      appStyle.slotCard,
                    ]}>
                    <View style={[style.rowBtw]}>
                      <Text style={[text.text16]}>Service Name</Text>

                      <Text style={[text.text16]}>Service Rate</Text>
                    </View>

                    <View style={[style.rowBtw]}>
                      <Text style={[text.text18, text.bold]}>
                        {item.servicename}
                      </Text>

                      <Text style={[text.text16, text.darkYellow]}>
                        {item.serviceamount} $
                      </Text>
                    </View>
                   </View>
                </TouchableOpacity>
              );
            })}

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
