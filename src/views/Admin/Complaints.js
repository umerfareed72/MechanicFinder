import { Text, View } from 'native-base';
import React, { Component } from 'react';
import {
    colors,
    screenHeight,
    screenWidth,
    images,
    URL,
  } from '../../config/Constant';
  import AsyncStorage from '@react-native-community/async-storage';
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
import { TouchableOpacity,Image,ImageBackground } from 'react-native';
class Complaints extends Component {
    state = {  }
    render() { 
        return (  <View>
            <View style={[style.row, style.jcSpaceBetween, style.ph20, style.pb10]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminDashboard')}>
            <Image source={images.backarrowh} style={image.backArrow2}></Image>
          </TouchableOpacity>
         
          <View>
            <Text style={[text.heading1purple, text.bold]}>
              Select type of reports
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}></Text>
          </View>
          <TouchableOpacity>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
                style={[style.pv10],{marginTop:80}}
                onPress={() => this.props.navigation.navigate('Reportedcustomers')}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.delete}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Reported Customers</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.pv10],{marginTop:100}}
                onPress={() => this.props.navigation.navigate('Reportedmechanics')}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.delete}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Reported Mechanics</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
        
            
        </View>);
    }
}
 
export default Complaints;