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

export default class MechanicManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      isModalVisible: false,
      products: [],
      slot: '',
      mechanics:[]
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
axios.get(URL.Url+'mechanics').then((res)=>{
    console.log(res.data)
})  
};
  componentDidMount() {
      const {navigation} = this.props;
      this.getProduct();
      this.focusListener = navigation.addListener('didFo cus', () => {
        this.getProduct();
      });
      }

  selectProduct = (id) => {
    const senddata = JSON.stringify(this.state.products[id]);
    AsyncStorage.setItem('productdata', senddata);
      this.props.navigation.navigate('EditProduct');
    };

  deleteProduct = (id) => {
    axios
      .delete(URL.Url + 'deleteProduct/' + this.state.products[id]._id)
      .then((del) => {
        console.log(del.data);
        this.toggleModal();
      });
  };

  render() {
    const {products} = this.state;
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />

        {/*Body */}
        <View style={{marginTop: 40}} />

        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <View>
            <Text style={[text.heading1purple, text.bold]}>
              Mechanic Management
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>
              Manage Mechanics
            </Text>
          </View>
          <View></View>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddProducts')}>
            <Image style={image.large} source={images.searchBottom}></Image>
          </TouchableOpacity> */}
        </View>

        <ScrollView style={{}}>
        <TouchableOpacity
                style={[style.pv10]}
                onPress={() => {
                  
                  this.props.navigation.navigate('Electricmechanic');
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.electric}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Electrition</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.pv10]}
                onPress={() => {
                 
                  this.props.navigation.navigate('Enginemechanic');
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.engine}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Engine</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.pv10]}
                onPress={() => {
                 
                  this.props.navigation.navigate('Paintermechanic');
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.carPaint}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Painter</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.pv10]}
                onPress={() => {
                 
                  this.props.navigation.navigate('Bodymechanic');
                }}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.body}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Body</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>


        </ScrollView>
      </SafeAreaView>
    );
  }
}
