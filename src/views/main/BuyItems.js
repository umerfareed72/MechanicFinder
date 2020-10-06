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
import {colors, screenHeight, screenWidth, images,URL} from '../../config/Constant';

import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import Hamburger from '../../components/headerComponent/Hamburger';
import {DrawerNavigator} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage'
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import axios from 'axios';

export default class BuyItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
    };
    this.state = {
      loading: false,
      items: [],
      refreshing: false,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
getProduct=async()=>{
  await AsyncStorage.getItem('data').then(async(res) => {
    res = JSON.parse(res);
 axios.get(URL.Url+'getProduct/'+res.mechanicid).then((prod)=>{
   this.setState({items:prod.data})
 })
  })
 
}

selectProduct = (id) => {
  const senddata = JSON.stringify(this.state.items[id]);
  AsyncStorage.setItem('itemdata', senddata);
    this.props.navigation.navigate('Items');
 
  };

componentDidMount(){
  const {navigation} = this.props;
  this.getProduct();
  this.focusListener = navigation.addListener('didFocus', () => {
    this.getProduct();
  });
}
  render() {
    const {items}=this.state;
    return (
      <SafeAreaView style={[appStyle.safeContainer]}>
        <StatusBar barStyle={'light-content'} translucent={true} />

        {/*Body */}
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height30}}>
            <StatusBar backgroundColor={'transparent'} />
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1]}>Products</Text>
              </View>
              <View style={[appStyle.searchBg, style.mv10]}>
                <View style={[style.row, style.aiCenter]}>
                  <View>
                    <Image
                      style={[image.searchIcon]}
                      source={images.serach}></Image>
                  </View>
                  <View style={[style.flex1]}>
                    <TextInput
                      style={[appStyle.inputTheme1]}
                      placeholder="Search"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#fff"></TextInput>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={[appStyle.bodyBg, style.flex1]}>
          <ScrollView>
          <View style={[style.row, style.jcFlexStart, appStyle.flexWrap]}>
           {
items.map((item,index)=>{
  return(
    <TouchableOpacity
    onPress={() => {this.selectProduct(index)
    }}
    style={image.imageCard}>
    <ImageBackground
      imageStyle={{borderRadius: 8}}
      style={image.storeImg}
      source={{uri:item.photo}}>
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <View
          style={{
            backgroundColor: colors.dullBlack,
            borderRadius: 8,
          }}>
          <View style={{padding: 5}}>
            <Text style={[text.heading4Bold, text.bold]}>
              {item.title}
            </Text>
            <View style={[style.row]}>
            <Text style={[text.heading5white]}>{item.price}</Text>
              <Text style={[text.heading5white,text.orange]}> $</Text>

              </View>
          </View>
        </View>
      </View>
    </ImageBackground>
    <View style={[style.mv5, appStyle.rowJustify]}>
      <View style={[style.row, style.aiCenter]}>
        <Image
          style={[image.small,image.Orange]}
          source={images.store}></Image>
        <Text style={[text.text10, style.pl5]}>Engine Product</Text>
      </View>
      <TouchableOpacity
       onPress={()=>{this.props.navigation.navigate('Items')}}
       style={[
          button.btnExtraSmall,
          {backgroundColor: colors.darkyellow},
        ]}>
        <Text style={[text.text10, {color: colors.white}]}>
          See detail
        </Text>
      </TouchableOpacity>
    </View>

  </TouchableOpacity>  

  )
})
           }
           
          </View>

          </ScrollView>
          {/* <ScrollView>
            <View style={[style.pv20]}>
              <View style={[appStyle.rowJustify, style.ph20]}>
                <Text style={[text.heading4, text.semibold]}>
                  Body Products
                </Text>
              </View>

              <View style={[appStyle.bodyContainerLayout]}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={[style.row]}>
                    <TouchableOpacity
                      style={[style.mr15]}
                      onPress={() => {
                        this.props.navigation.navigate('Items');
                      }}>
                      <ImageBackground
                        imageStyle={{borderRadius: 8}}
                        style={[image.homeImgLarge]}
                        source={images.body}>
                        <View style={[appStyle.categoryLayer2]}>
                          <Text style={[text.heading4Bold, text.bold]}>
                            Body
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[style.mr15]}
                      onPress={() => {
                        this.props.navigation.navigate('Items');
                      }}>
                      <ImageBackground
                        imageStyle={{borderRadius: 8}}
                        style={[image.homeImgLarge]}
                        source={images.body}>
                        <View style={[appStyle.categoryLayer2]}>
                          <Text style={[text.heading4Bold, text.bold]}>
                            Body
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>

            <View style={[appStyle.rowJustify, style.ph20]}>
              <Text style={[text.heading4, text.semibold]}>
                Electric Products
              </Text>
            </View>

            <View style={[appStyle.bodyContainerLayout]}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[style.row]}>
                  <TouchableOpacity
                    style={[style.mr15]}
                    onPress={() => {
                      this.props.navigation.navigate('Items');
                    }}>
                    <ImageBackground
                      imageStyle={{borderRadius: 8}}
                      style={[image.homeImgLarge]}
                      source={images.body}>
                      <View style={[appStyle.categoryLayer2]}>
                        <Text style={[text.heading4Bold, text.bold]}>Body</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[style.mr15]}
                    onPress={() => {
                      this.props.navigation.navigate('Items');
                    }}>
                    <ImageBackground
                      imageStyle={{borderRadius: 8}}
                      style={[image.homeImgLarge]}
                      source={images.body}>
                      <View style={[appStyle.categoryLayer2]}>
                        <Text style={[text.heading4Bold, text.bold]}>Body</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            <View style={[appStyle.rowJustify, style.ph20]}>
              <Text style={[text.heading4, text.semibold]}>Engine Product</Text>
            </View>

            <View style={[appStyle.bodyContainerLayout]}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[style.row]}>
                  <TouchableOpacity
                    style={[style.mr15]}
                    onPress={() => {
                      this.props.navigation.navigate('Items');
                    }}>
                    <ImageBackground
                      imageStyle={{borderRadius: 8}}
                      style={[image.homeImgLarge]}
                      source={images.body}>
                      <View style={[appStyle.categoryLayer2]}>
                        <Text style={[text.heading4Bold, text.bold]}>Body</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[style.mr15]}
                    onPress={() => {
                      this.props.navigation.navigate('Items');
                    }}>
                    <ImageBackground
                      imageStyle={{borderRadius: 8}}
                      style={[image.homeImgLarge]}
                      source={images.body}>
                      <View style={[appStyle.categoryLayer2]}>
                        <Text style={[text.heading4Bold, text.bold]}>Body</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ScrollView> */}
        </View>
      </SafeAreaView>
    );
  }
}
