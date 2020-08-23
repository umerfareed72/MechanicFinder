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
      dataSource:[],
      slot: '',
  
    };
  }

  changebuttoncolor = (id) => {
    this.setState({
      slot: id,
    });
    if(this.state.slot==id){
// console.log(this.state.dataSource[id])
        this.props.navigation.navigate("HomeDetail") 
 const senddata=JSON.stringify(this.state.dataSource[id])
        AsyncStorage.setItem("data",senddata)
    }
};
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount(){
    fetch("http://192.168.0.105:3000/mechanics")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson
      })
  console.log("Ok List")
    })
    .catch(error=>console.log(error,"error")

    ) //to catch the errors if any
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
      <SafeAreaView style={[appStyle.safeContainer]}>
   <StatusBar barStyle={"light-content"} backgroundColor={'transparent'} />
               
        {/*Body */}
        <View style={{}}>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: screenHeight.height30}}>
            <View style={{postion: 'absolute', top: 30, left: 10,width:30}}>
              <Hamburger  />
            </View>
            <StatusBar backgroundColor={'transparent'} />
            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1]}>Discover</Text>
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
              <View style={[appStyle.rowJustify, style.ph20]}>
                <Text style={[text.heading4, text.semibold]}>Popular</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Mechaniclist")}}>
                  <Text style={[text.link]}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={[appStyle.bodyContainerLayout]}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={[style.row]}>
                
                  {
                
                
                  this.state.dataSource.map((data,index)=>{
               if(index<3){
               return( 
              
                    <TouchableOpacity
                      style={[style.mr15]}
                      key={index}
                      onPress={() => this.changebuttoncolor(index)}
                     
                     >
                      <ImageBackground
                        imageStyle={{borderRadius: 4}}
                        style={image.homeImgLarge}
                        source={images.HomeImg}>
                        <View style={[appStyle.popularInnerContent]}>
                          <Text style={[text.heading5white, text.bold]}>
                          {data.firstname}{" "}{data.lastname}
                          </Text>
                          <Text style={[text.heading5white, text.bold]}>
                          {data.address}{data.city}
                          </Text>


                          <StarRating
                            disabled={true}
                         
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
                            fullStarColor={colors.white}
                            emptyStarColor={colors.white}
                            starSize={10}
                            containerStyle={{width: 53, marginTop: 3}}
                          />
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
               )
  }
 
  
  })}
  
  <TouchableOpacity
                      style={[style.mr15]}
                      // onPress={() => {
                      //   this.props.navigation.navigate('HomeDetail');
                      // }}
                      >
                      <ImageBackground
                        imageStyle={{borderRadius: 4}}
                        style={image.homeImgLarge}
                        source={images.HomeImg2}>
                        <View style={[appStyle.popularInnerContent]}>
                          <Text style={[text.heading5white, text.bold]}>
                            Resturant
                          </Text>
                          <StarRating
                            disabled={true}
                           
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) =>
                              this.onStarRatingPress(rating)
                            }
                            fullStarColor={colors.white}
                            emptyStarColor={colors.white}
                            starSize={10}
                            containerStyle={{width: 53, marginTop: 3}}
                          />
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>

                  </View>
                </ScrollView>

                <View style={[style.mb20]}>
                  <View style={[appStyle.rowJustify, style.pv15, style.pr20]}>
                    <Text style={[text.heading4, text.semibold]}>
                      Categories
                    </Text>
                    <TouchableOpacity>
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
                            <Text style={[text.heading4Bold, text.bold]}>
                              BBQ
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
                            <Text style={[text.heading4Bold, text.bold]}>
                              Drinks
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
                            <Text style={[text.heading4Bold, text.bold]}>
                              Salad
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  </ScrollView>
                </View>

                <View style={[style.mb20]}>
                  <View style={[appStyle.rowJustify, style.pv15, style.pr20]}>
                    <Text style={[text.heading4]}>Recommend</Text>
                    <TouchableOpacity>
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
                            <Text style={[text.heading5white, text.bold]}>
                              Momofuku
                            </Text>
                            <StarRating
                              disabled={true}
                              
                              maxStars={5}
                              rating={this.state.starCount}
                              selectedStar={(rating) =>
                                this.onStarRatingPress(rating)
                              }
                              fullStarColor={colors.white}
                              emptyStarColor={colors.white}
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
                            <Text style={[text.heading5white, text.bold]}>
                              Momofuku
                            </Text>
                            <StarRating
                              disabled={true}
                              
                              maxStars={5}
                              rating={this.state.starCount}
                              selectedStar={(rating) =>
                                this.onStarRatingPress(rating)
                              }
                              fullStarColor={colors.white}
                              emptyStarColor={colors.white}
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
                            <Text style={[text.heading5white, text.bold]}>
                              Resturant
                            </Text>
                            <StarRating
                              disabled={true}
                              
                              maxStars={5}
                              rating={this.state.starCount}
                              selectedStar={(rating) =>
                                this.onStarRatingPress(rating)
                              }
                              fullStarColor={colors.white}
                              emptyStarColor={colors.white}
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
