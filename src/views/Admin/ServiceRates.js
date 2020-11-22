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

export default class Products extends Component {
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
      axios.get(URL.Url + 'getServices' ).then((response) => {
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

  selectProduct = (id) => {
    const senddata = JSON.stringify(this.state.products[id]);
    AsyncStorage.setItem('ServiceRatedata', senddata);
      this.props.navigation.navigate('UpdateServiceRate');
      };

  deleteProduct = (id) => {
    axios
      .delete(URL.Url + 'deleteServices/' + this.state.products[id]._id)
      .then((del) => {
        console.log(del.data);
     this.getProduct()
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
           Service Rates Management
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>
              Manage Maintenence Service Rates
            </Text>
          </View>
          <View></View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddServiceRates')}>
            <Image style={image.iconAdd} source={images.add}></Image>
          </TouchableOpacity>
        </View>

        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
            {products.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.selectProduct(index)}>
                  {/* <View style={{}}>
                    <Modal
                      isVisible={this.state.isModalVisible}
                      animationInTiming={500}
                      animationOutTiming={500}>
                      <View style={[style.flex1, appStyle.rowCenter]}>
                        <View style={[appStyle.modalBg]}>
                          <Text style={[]}>Are You Sure?</Text>
                          <View style={[style.row, style.mt10]}>
                            <TouchableOpacity
                              style={[style.mh10]}
                              onPress={this.toggleModal}>
                              <View style={[button.modalButton]}>
                                <Text style={[text.heading3, text.white]}>
                                  No
                                </Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={[style.mh10]}
                              onPress={() => this.deleteProduct(index)}>
                              <View style={[button.modalButton]}>
                                <Text style={[text.heading3, text.white]}>
                                  Yes
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View> */}

                  <View
                    style={[
                      appStyle.slotCard,
                      appStyle.rowJustify,
                      style.aiCenter,
                    ]}>
                    <View style={[style.row, style.aiCenter]}>
                     
                      <View>
                        <Text style={[text.text18, text.bold]}>
                          {item.servicename}
                        </Text>

                        <View style={[style.pt5, style.row]}>
                          <Text style={[text.text12, text.greyVLight]}>
                            Price :{' '}
                          </Text>

                          <Text style={[text.text12, text.darkYellow]}>
                            {item.serviceamount} $
                          </Text>
                        </View>
                     
                      </View>
                    </View>
                    <TouchableOpacity onPress={()=>this.deleteProduct(index)}>
                      <Image
                        style={[image.forward]}
                        source={images.delete}></Image>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* row start */}
            {/* row end */}

            {/* row start */}
            {/* row end */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
