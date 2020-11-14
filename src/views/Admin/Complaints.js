import { Text, View } from 'native-base';
import React, { Component } from 'react';
import {
    colors,
    screenHeight,
    screenWidth,
    images,
    URL,
  } from '../../config/Constant';
  import {ScrollView,StatusBar} from 'react-native'
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
          <ScrollView>
            
          <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.04, y: 1}}
            end={{x: 0.9, y: 0}}
            style={{height: screenHeight.height10}}>
            <View style={{ backgroundColor:'rgba(68,68,68,0.6)',
    position:'absolute',
    top:0,
    bottom:0,right:0,left:0}}></View>

           
            <StatusBar backgroundColor={'transparent'} />
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1]}>View Reports and Questions</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <Image source={images.help} style={{width:10, height:30,marginTop:0,marginLeft:10}}></Image>
            <Text style={[text.heading1purple, text.bold],{margin:10,textDecorationLine:'none',fontSize:20,fontWeight: "bold",color: 'gray',fontFamily: "Cochin"}}>
              Reported Members
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}></Text>
          
          <TouchableOpacity>
          </TouchableOpacity>


        <TouchableOpacity
                style={[style.pv10],{marginTop:0}}
                onPress={() => this.props.navigation.navigate('Reportedcustomers')}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.searchBottom}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Reported Customers</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.pv10],{marginTop:40}}
                onPress={() => this.props.navigation.navigate('Reportedmechanics')}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.searchBottom}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Reported Mechanics</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View>
                <Image source={images.Question} style={{width:10,marginLeft:10, height:30,marginTop:40}}></Image>
            <Text style={[text.heading1purple, text.bold],{marginLeft:10,textDecorationLine:'none',fontSize:20,fontWeight: "bold",color: 'gray',fontFamily: "Cochin"}}>
              Help Questions
            </Text>
            <Text style={[text.text14, {color: '#4A4A4A'}]}></Text>
          </View>
              <TouchableOpacity
                style={[style.pv10],{marginTop:40}}
                onPress={() => this.props.navigation.navigate('Mhelp')}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.searchBottom}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Mechanics Help questions</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.pv10],{marginTop:40}}
                onPress={() => this.props.navigation.navigate('Chelp')}>
                <ImageBackground
                  imageStyle={{borderRadius: 8}}
                  style={image.homeCategoryImg}
                  source={images.searchBottom}>
                  {/* <View style={style.bgOverlay}></View> */}
                  <View style={[appStyle.categoryLayer]}>
                    <Text style={[text.heading4Bold, text.bold]}>Customers Help questions</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
        
              </ScrollView>
        </View>
        );
    }
}
 
export default Complaints;