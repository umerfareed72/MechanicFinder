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
      Cars: 'Select Car Name',
      vehicletype:'Select vehicle Type'
    };
  }

  changebuttoncolor = (id) => {
    this.setState({
      slot: id,
    });
    if (this.state.slot == id) {
      // console.log(this.state.dataSource[id])
      this.props.navigation.navigate('HomeDetail');
      const senddata = JSON.stringify(this.state.dataSource[id]);
      AsyncStorage.setItem('data', senddata);
    }
  };

  componentDidMount() {
    fetch(URL.Url + 'mechanics')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      })
      .catch((error) => console.log(error, 'error')); //to catch the errors if any
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        {/*Body */}
        <View style={{marginTop: 40}} />

        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={images.backarrowh} style={image.backArrow2}></Image>
          </TouchableOpacity>

          <View>
            <Text style={[text.heading1purple, text.bold]}>Mechanics</Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>
              Have a Nice Day
            </Text>
          </View>
          <View></View>
        </View>

        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
            {/* row start */}
            <View style={[style.dropBar, style.mv10]}>
              <Picker
                selectedValue={this.state.Cars}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Cars: itemValue})
                }>
                <Picker.Item label="Select Car" value="Car" />
                <Picker.Item label="Honda" value="Honda" />
                <Picker.Item label="Toyota" value="Toyota" />
                <Picker.Item label="Suzuki" value="Suzuki" />
                <Picker.Item label="KIA" value="KIA" />
                <Picker.Item label="Haundai" value="Haundai" />
                <Picker.Item label="AUDI" value="AUDI" />
                <Picker.Item label="Mercedese" value="Mercedese" />
                <Picker.Item label="Range Rover" value="Range Rover" />
              </Picker>
            </View>
            <View style={[style.dropBar, style.mv10]}>
            <Picker
                      selectedValue={this.state.vehicletype}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({vehicletype: itemValue})
                      }>
                      <Picker.Item label="Select Vehicle Type" value="" />
                      <Picker.Item label="Heavy Truck" value="Heavy Truck" />
                      <Picker.Item label="Car" value="Car" />
                      <Picker.Item label="Jeep" value="Jeep" />
                      <Picker.Item label="Bus" value="Bus" />
                    </Picker>
            </View>
            {this.state.dataSource.map((data, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  // onPress={()=>{this.props.navigation.navigate("HomeDetail")}}
                  onPress={() => this.changebuttoncolor(index)}
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
                            {data.firstname} {data.lastname}{' '}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <Text style={[text.text15, {color: colors.gray}]}>
                            {data.address}
                            {data.city}
                          </Text>
                        </View>
                        <View style={[style.mv5]}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
                            fullStarColor={'#F59E52'}
                            emptyStarColor={'#F59E52'}
                            starSize={18}
                            containerStyle={{width: 110, marginTop: 3}}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('HomeDetail');
                    }}>
                    <Image
                      style={[image.forward]}
                      source={images.arrowLong}></Image>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
            {/* row end */}

            {/* row end */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
