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
// import Icon from 'react-native-ionicons';
// import vectorIcon from 'react-native-vector-icons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
      TabDataOverview: 'flex',
      TabDataGallery: 'none',
      TabDataReview: 'none',
      ColorOverview: colors.darkyellow,
      ColorGallery: colors.inputBordercolor,
      ColorReview: colors.inputBordercolor,
      BookNowView: 'flex',
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  tabOverview = () => {
    if (this.state.TabDataOverview == 'flex') {
      this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'flex'}),
        this.setState({ColorOverview: colors.darkyellow}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorGallery: colors.inputBordercolor});
    } else
      this.setState({TabDataOverview: 'flex'}),
        this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({BookNowView: 'flex'});
    this.setState({ColorOverview: colors.darkyellow});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorGallery: colors.inputBordercolor});
  };

  tabGallery = () => {
    if (this.state.TabDataGallery == 'flex') {
      this.setState({TabDataOverview: 'none'}),
        this.setState({TabDataReview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.inputBordercolor}),
        this.setState({ColorGallery: colors.darkyellow});
    } else
      this.setState({TabDataGallery: 'flex'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataReview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.inputBordercolor});
    this.setState({ColorGallery: colors.darkyellow});
  };

  tabReview = () => {
    if (this.state.TabDataReview == 'flex') {
      this.setState({TabDataGallery: 'none'}),
        this.setState({TabDataOverview: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({color: 'none'});
      this.setState({ColorOverview: colors.inputBordercolor}),
        this.setState({ColorReview: colors.darkyellow}),
        this.setState({ColorGallery: colors.inputBordercolor});
    } else
      this.setState({TabDataReview: 'flex'}),
        this.setState({TabDataGallery: 'none'}),
        this.setState({BookNowView: 'none'}),
        this.setState({TabDataOverview: 'none'});
    this.setState({ColorOverview: colors.inputBordercolor});
    this.setState({ColorReview: colors.darkyellow});
    this.setState({ColorGallery: colors.inputBordercolor});
  };

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
            <View style={{margin: 20}} />
     

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>

            <View style={[appStyle.headInner]}>
              <View style={[]}>
                <Text style={[text.heading1, text.bold]}>Notifications</Text>
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
        <View style={[appStyle.bodyBg, appStyle.bodyHeight30]}>
          <View style={[appStyle.rowBtw, appStyle.bodyLayout]}>
            <TouchableOpacity onPress={() => this.tabOverview()}>
              <Text
                style={[
                  text.heading2,
                  text.semibold,
                  {color: this.state.ColorOverview},
                ]}>
                Unread
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.tabGallery()}>
              <Text
                style={[
                  text.heading2,
          
                  {color: this.state.ColorGallery},
                ]}>
                Recent
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.tabReview()}>
              <Text
                style={[
                  text.heading2,
             
                  {color: this.state.ColorReview},
                ]}>
                Group
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={[appStyle.bottomBorder]}></View> */}

          <ScrollView style={style.mb50}>
            {/* OverView Tab */}
            <View style={[{display: this.state.TabDataOverview}]}>
              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please hhhhh hhhhh hhhhhhhhhhh hhh hhh
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>
              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>
            </View>

            {/* Gallery Tab View */}

            <View style={[{display: this.state.TabDataGallery}]}>
              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>
            </View>
            {/* Gallery Tab View End */}

            {/* Reviews Tab Start  */}
            <View style={[{display: this.state.TabDataReview}]}>
              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>

              <View
                style={[
                  style.row,
                  style.mv5,
                  style.jcCenter,
                  {width: screenWidth.width100 - 20},
                ]}>
                <View style={[{width: screenWidth.width20}]}>
                  <Image
                    style={appStyle.listImg}
                    source={images.logoSmall}></Image>
                </View>
                <View
                  style={[
                    style.jcCenter,
                    style.mh5,
                    {width: screenWidth.width40 + 10},
                  ]}>
                  <View style={[style.row]}>
                    <Text style={[text.heading2Gray, text.semibold]}>
                      Rex_Solution
                    </Text>
                  </View>
                  <View>
                    <Text style={[text.paraGray]}>
                      Please let me know Please{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    appStyle.rowAlignCenter,
                    style.mh5,
                    {width: screenWidth.width20 - 20},
                  ]}>
                  <Text style={[text.dateTime]}>Tomorrow</Text>
                  <Text style={[text.dateTime]}>12:59pm</Text>
                </View>
              </View>
            </View>
            {/* Reviews Tab End  */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
