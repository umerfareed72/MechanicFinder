import React, {Component} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  Dimensions,
  Keyboard,
  Button,
  Platform,
  
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
import {connect} from 'react-redux';
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
class Mechaniclist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      isLoading: false,
      dataSource: [],
      slot: '',
      userId: '',
      carcompany: 'Select Vehicle Name',
      skilltype: 'Select Skill Type',
      vehicletype: 'Select Vehicle Type',
    };
  }
  changebuttoncolor = (id) => {
    this.setState({isLoading:true})
    axios
      .get(URL.Url + 'getbookedMechanic/' + this.props.auth.user.userid)
      .then((res) => {
          if (res.data == '') {
          this.setState({
            slot: id,
          });
          if (this.state.slot == id) {
            
            const senddata = JSON.stringify(this.state.dataSource[id]);
            AsyncStorage.setItem('data', senddata); 
            setTimeout(() => {
              
              this.props.navigation.navigate('HomeDetail');
            }, 2000);
          }
        } else {
          this.setState({isLoading:false})
          ToastAndroid.show(
            'User Already Book a Mechanic',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(
          'Something Went Wrong',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      });
  };

  validate = () => {
    if (this.state.vehicletype == 'Select Vehicle Type') {
      ToastAndroid.show(
        'Vehicle Type is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    } else if (this.state.carcompany == 'Select Vehicle Name') {
      ToastAndroid.show(
        'Vehile Name is Required',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG,
      );
      return false;
    }
    return true;
  };

  showMechanics = () => {
    if (this.validate()) {
      axios
        .get(
          URL.Url +
            'nearmechanics/' +
            this.state.skilltype +
            '/' +
            this.state.vehicletype +
            '/' +
            this.state.carcompany +
            '/' +
            this.props.auth.user.userid,
        )
        .then((response) => {
          console.log(response.data);
          this.setState({dataSource: response.data});
          if (response.data.length == 0) {
            ToastAndroid.show(
              'No Mechanic Available',
              ToastAndroid.BOTTOM,
              ToastAndroid.LONG,
            );
          }
        })
        .catch((error) => {
          console.log(error);

          ToastAndroid.show(
            'Something went wrong',
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
        });
    }
  };
  componentDidMount() {
    AsyncStorage.getItem('skilltype').then((res) => {
      this.setState({skilltype: res});
      console.log(res);
    });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    if(this.state.isLoading==false){

    
    return (
      <SafeAreaView style={appStyle.safeContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        {/*Body */}
        <View style={{marginTop: 40}} />

        <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={images.backarrowh} style={image.backArrow2}></Image>
          </TouchableOpacity>

          <View style={style.aiCenter}>
            <Text style={[text.heading1purple, text.bold]}>Mechanics</Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}>
              {'Search & Book Your Desire'} {this.state.skilltype} {'Mechanic'}
            </Text>
          </View>
          <View></View>
        </View>

        <ScrollView style={{}}>
          <View style={[appStyle.bodyBg, appStyle.bodyLayout]}>
            {/* row start */}

            <View style={[style.dropBar, style.mv10]}>
              <Picker
                selectedValue={this.state.vehicletype}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({vehicletype: itemValue})
                }>
                <Picker.Item label="Select Vehicle Type" value="" />
                <Picker.Item label="Heavy Truck" value="Heavy Truck" />
                <Picker.Item label="Cars" value="Cars" />
                <Picker.Item label="Jeep" value="Jeep" />
                <Picker.Item label="Bus" value="Bus" />
              </Picker>
            </View>
            <View style={[style.dropBar, style.mv10]}>
              <Picker
                selectedValue={this.state.carcompany}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({carcompany: itemValue})
                }>
                <Picker.Item label="Select Vehicle Name" value="Vehicle" />
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
            <TouchableOpacity
              style={[
                button.button1,
                style.mv10,
                style.mh40,
                {backgroundColor: colors.lightgray},
                style.aiCenter,
              ]}
              onPress={this.showMechanics}>
              <View style={[style.row, style.aiCenter]}>
                <View style={style.mr5}>
                  <Image
                    style={[image.medium]}
                    source={images.searchBottom}></Image>
                </View>
                <Text style={[button.btntext1, text.orange]}>
                  Click To Serach
                </Text>
              </View>
            </TouchableOpacity>

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
                      <Image style={image.userImg} source={{uri: data.photo}} />
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
                            {data.firstname} {data.lastname}
                          </Text>
                        </View>
                        <View style={style.row}>
                          <Text style={[text.text15, {color: colors.gray}]}>
                            {data.address} {data.city}
                          </Text>
                        </View>
                        <View style={[style.mv5]}>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={data.rating}
                            // selectedStar={(rating) =>
                            //   this.onStarRatingPress(rating)
                            // }
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
                    key={index}
                    onPress={() => {
                      this.changebuttoncolor(index);
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
          else{
            return(
              <SafeAreaView style={[appStyle.safeContainer]}>
                <StatusBar
                  barStyle={'dark-content'}
                  translucent={true}
                  backgroundColor="transparent"></StatusBar>
                <View style={[style.flex1, style.jcCenter]}>
                  <View style={[style.aiCenter]}>
                    <ActivityIndicator
                      color="#bc2b78"
                      size="large"></ActivityIndicator>
                  </View>
                </View>
              </SafeAreaView>)
          }
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(Mechaniclist);
