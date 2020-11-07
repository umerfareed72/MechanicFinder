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
import { TouchableOpacity } from 'react-native';

class Reportedposts extends Component {
    state = {  }
    render() { 
        return (  <View><TouchableOpacity><Text>Reported customers</Text></TouchableOpacity>
        <TouchableOpacity><Text>Reported mechanics</Text></TouchableOpacity>
        <TouchableOpacity><Text>Reported ........posts</Text></TouchableOpacity>
            
        </View>);
    }
}
 
export default Reportedposts;