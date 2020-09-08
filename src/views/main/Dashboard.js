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
  PermissionsAndroid,
  Permission,
  ImageBackground,
  Dimensions,
  Keyboard,
  Platform,
  AsyncStorage,

} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
const axios = require('axios');
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
import * as geolib from 'geolib';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 3,
      longitude:'',
      latitude:'',
      loading: false,
      items: [],
      locations:[],
      refreshing: false,
      dataSource:[],
      slot: '',
    };
  }
  requestUserLocation = async () => {
    try {
      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
        
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Cool Location Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        grantedLocation === PermissionsAndroid.RESULTS.GRANTED &&
        granted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
axios.get('http://192.168.0.108:3000/getmechaniclocation')
.then((response) => {
  
  this.setState({locations:response.data})
  this.state.locations.map((item)=>{
// const areaMechanics=geolib.isPointWithinRadius(item.latitude,item.longitude,5000)   
// console.log(areaMechanics) 
// alert(areaMechanics)

const near=geolib.findNearest({ latitude: position.coords.latitude, longitude: position.coords.longitude },[
  
  { latitude: item.latitude, longitude: item.longitude }]);
console.log(near)
})

})
  .catch((error) => {
     console.log(error);
  });





          this.setState({longitude:position.coords.longitude,latitude:position.coords.latitude})
          axios
          .post('http://192.168.0.108:3000/adduserlocation', {
         longitude:this.state.longitude,
         latitude:this.state.latitude
          })
          .then((response) => {
          console.log(response)         
          })
          .catch((error) => {
             console.log(error);
          });
       
        },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
    fetch("http://192.168.0.108:3000/mechanics")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource: responseJson
      })
  console.log("Ok List")
    })
    .catch(error=>console.log(error,"error")

    ) //to catch the errors if any
    this.requestUserLocation()
  }  
 

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
                      //    // }}
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
