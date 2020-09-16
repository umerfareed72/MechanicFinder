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
  AsyncStorage,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';

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

import {withSafeAreaInsets} from 'react-native-safe-area-context';

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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
