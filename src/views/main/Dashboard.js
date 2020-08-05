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

export default class Dashboard extends Component {
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

  // static navigationOptions = ({navigation}) => {
  //     return {
  //       headerTitle: '',
  //       headerTitleAlign: 'left',
  //       headerShown: 'false',
  //       headerVisible: 'false',
  //       headerTitleStyle: [text.bold, {
  //         fontSize: 35,
  //         color: 'transparent',
  //         letterSpacing: 1,
  //         marginLeft: 20,
  //       }],
  //       headerLeft: () => <Hamburger/>,
  //       //headerRight: () => <ProfileIcon />,
  //       headerStyle: {
  //         elevation: 0,
  //         backgroundColor: 'transparent',
  //         // alignItems:'center',
  //         justifyContent: 'center',
  //       },
  //     };
  //   };

  render() {
    return (
      <SafeAreaView style={[appStyle.safeAreaHeight]}>
        <StatusBar />
        {/*Body */}
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height35}}>
            <View style={{postion: 'absolute', top: 30, left: 10,width:30}}>
              <Hamburger />
            </View>
            <StatusBar backgroundColor={'transparent'} />
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1, text.bold]}>Discover</Text>
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
        <View style={[appStyle.bodyHeight35, appStyle.bodyBg]}>
          <ScrollView>
            <View style={[style.pv20]}>
              <View style={[appStyle.rowjustify, style.ph20]}>
                <Text style={[text.heading2, text.semibold]}>Popular</Text>
                <TouchableOpacity onPress={
                 ()=>{this.props.navigation.navigate("Mechanics")} 
                }>
                  <Text style={[text.link]}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={[appStyle.bodyContainerLayout]}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={[style.row]}>
                    <TouchableOpacity
                      style={[style.mr15]}
                      onPress={() => {
                        this.props.navigation.navigate('HomeDetail');
                      }}>
                      <ImageBackground
                        imageStyle={{borderRadius: 4}}
                        style={image.homeImgLarge}
                        source={images.HomeImg}>
                        <View style={[appStyle.popularInnerContent]}>
                          <Text style={[text.heading3, text.bold]}>
                        Abdul
                          </Text>
                          <Text style={[text.heading3, text.bold]}>
                          Honda Motor Mechanic
                          </Text>

                          <StarRating
                            disabled={true}
                           
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
                            fullStarColor={'#fff'}
                            emptyStarColor={'#fff'}
                            starSize={10}
                            containerStyle={{width: 53, marginTop: 3}}
                          />
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[style.mr15]}
                      onPress={() => {
                        this.props.navigation.navigate('HomeDetail');
                      }}>
                      <ImageBackground
                        imageStyle={{borderRadius: 4}}
                        style={image.homeImgLarge}
                        source={images.HomeImg2}>
                        <View style={[appStyle.popularInnerContent]}>
                          <Text style={[text.heading3, text.bold]}>
                          Kareem
                          </Text>
                          <Text style={[text.heading3, text.bold]}>
                           Suzuki Motor Mechanic
                          </Text>

                          <StarRating
                            disabled={true}
                           
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
                            fullStarColor={'#fff'}
                            emptyStarColor={'#fff'}
                            starSize={10}
                            containerStyle={{width: 53, marginTop: 3}}
                          />
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[style.mr15]}
                      onPress={() => {
                        this.props.navigation.navigate('HomeDetail');
                      }}>
                      <ImageBackground
                        imageStyle={{borderRadius: 4}}
                        style={image.homeImgLarge}
                        source={images.HomeImg2}>
                        <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading3, text.bold]}>
                        Abdul
                          </Text>
                          <Text style={[text.heading3, text.bold]}>
                          Honda Motor Mechanic
                          </Text>

                          <StarRating
                            disabled={true}
                           
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
                            fullStarColor={'#fff'}
                            emptyStarColor={'#fff'}
                            starSize={10}
                            containerStyle={{width: 53, marginTop: 3}}
                          />
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>

                    <View style={[style.mr15, style.mb20]}>
                      <ImageBackground
                        imageStyle={{borderRadius: 4}}
                        style={image.homeImgLarge}
                        source={images.HomeImg}>
                        <View style={[appStyle.popularInnerContent]}>
                        <Text style={[text.heading3, text.bold]}>
                        Abdul
                          </Text>
                          <Text style={[text.heading3, text.bold]}>
                          Honda Motor Mechanic
                          </Text>

                          <StarRating
                            disabled={true}
                           
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
                            fullStarColor={'#fff'}
                            emptyStarColor={'#fff'}
                            starSize={10}
                            containerStyle={{width: 53, marginTop: 3}}
                          />
                        </View>
                      </ImageBackground>
                    </View>
                  </View>
                </ScrollView>

                <View style={[style.mb20]}>
                  <View style={[appStyle.rowjustify, style.pv15, style.pr20]}>
                    <Text style={[text.heading2, text.semibold]}>
                      Categories
                    </Text>
                    <TouchableOpacity onPress={
                 ()=>{this.props.navigation.navigate("Mechanics")}}>
                      <Text style={[text.link]}>See all</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={[style.row]}>
                      <View style={[style.mr15]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={image.homeCategoryImg}
                          source={images.category1}>
                          <View style={[appStyle.categoryLayer]}>
                            <Text style={[text.heading2Bold, text.bold]}>
                             Painter
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>

                      <View style={[style.mr15]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={image.homeCategoryImg}
                          source={images.category2}>
                          <View style={[appStyle.categoryLayer]}>
                            <Text style={[text.heading2Bold, text.bold]}>
                              Electrician
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                      <View style={[style.mr15]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={image.homeCategoryImg}
                          source={images.HomeImg}>
                          <View style={[appStyle.categoryLayer]}>
                            <Text style={[text.heading2Bold, text.bold]}>
                              Engine
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                      <View style={[style.mr15]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={image.homeCategoryImg}
                          source={images.HomeImg}>
                          <View style={[appStyle.categoryLayer]}>
                            <Text style={[text.heading2Bold, text.bold]}>
                             Body
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                    
                    </View>
                  </ScrollView>
                </View>

                <View style={[style.mb20]}>
                  <View style={[appStyle.rowjustify, style.pv15, style.pr20]}>
                    <Text style={[text.heading2]}>Recommend</Text>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Mechanics")}}>
                      <Text style={[text.link]}>See all</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={[style.row]}>
                      <View style={[style.mr15]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={image.homerecommendImg}
                          source={images.HomeImg}>
                          <View style={[appStyle.popularInnerContent]}>
                            <Text style={[text.heading4, text.bold]}>
                            Engine
                            </Text>
                            <StarRating
                              disabled={true}
                           
                              maxStars={5}
                              rating={this.state.starCount}
                              selectedStar={(rating) =>
                                this.onStarRatingPress(rating)
                              }
                              fullStarColor={'#fff'}
                              emptyStarColor={'#fff'}
                              starSize={10}
                              containerStyle={{width: 53, marginTop: 5}}
                            />
                          </View>
                        </ImageBackground>
                      </View>

                      <View style={[style.mr15]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={image.homerecommendImg}
                          source={images.HomeImg2}>
                          <View style={[appStyle.popularInnerContent]}>
                            <Text style={[text.heading4, text.bold]}>
                            Painter
                            </Text>
                            <StarRating
                              disabled={true}
                           
                              maxStars={5}
                              rating={this.state.starCount}
                              selectedStar={(rating) =>
                                this.onStarRatingPress(rating)
                              }
                              fullStarColor={'#fff'}
                              emptyStarColor={'#fff'}
                              starSize={10}
                              containerStyle={{width: 53, marginTop: 5}}
                            />
                          </View>
                        </ImageBackground>
                      </View>
                      <View style={[style.mr15]}>
                        <ImageBackground
                          imageStyle={{borderRadius: 4}}
                          style={image.homerecommendImg}
                          source={images.HomeImg}>
                          <View style={[appStyle.popularInnerContent]}>
                            <Text style={[text.heading4, text.bold]}>
                          Electrician
                            </Text>
                            <StarRating
                              disabled={true}
                           
                              maxStars={5}
                              rating={this.state.starCount}
                              selectedStar={(rating) =>
                                this.onStarRatingPress(rating)
                              }
                              fullStarColor={'#fff'}
                              emptyStarColor={'#fff'}
                              starSize={10}
                              containerStyle={{width: 53, marginTop: 5}}
                            />
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
