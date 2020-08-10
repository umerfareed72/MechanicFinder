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

export default class HomeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      starCount: 5,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    return (
      <SafeAreaView style={[appStyle.safeAreaHeight]}>
        <StatusBar />
        {/*Body */}
        <View style={{}}>
          <ImageBackground
            source={images.HomeImg2}
            style={{height: screenHeight.height35}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={[image.headerBackArrow]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>
            <View style={[appStyle.headInner, style.ph20]}>
              <View style={[style.mv5]}></View>

              <View style={[style.mv5]}>
                <Image source={images.logoDark} style={[image.splashImg]} />
                <Text style={[text.heading1, text.bold]}>Account</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[appStyle.bodyBg, appStyle.bodyHeight35]}>
          <View style={[appStyle.rowjustify, appStyle.bodyLayout]}>
            <Text style={[text.heading2, text.semibold]}>Accounts</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Notification');
              }}>
              <Image style={[image.plusImg]} source={images.plus}></Image>
            </TouchableOpacity>
          </View>
          <ScrollView style={style.mb50}>
            {/* Reviews Tab Start  */}
            <View style={[appStyle.bodyLayout]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('InviteFriend');
                }}>
                <View style={[style.row, style.mv5]}>
                  <View style={[style.mr5]}>
                    <Image
                      style={appStyle.listImg}
                      source={images.logoSmall}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={[style.row]}>
                      <Text style={[style.mr5, text.heading6]}>
                        Rex_Solution
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, {color: colors.gray5d}]}>
                        rex@gmail.com
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ReferExperience');
                }}>
                <View style={[style.row, style.mv5]}>
                  <View style={[style.mr5]}>
                    <Image
                      style={appStyle.listImg}
                      source={images.logoSmall}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={[style.row]}>
                      <Text style={[style.mr5, text.heading6]}>
                        Rex_Solution
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, {color: colors.gray5d}]}>
                        rex@gmail.com
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('');
                }}>
                <View style={[style.row, style.mv5]}>
                  <View style={[style.mr5]}>
                    <Image
                      style={appStyle.listImg}
                      source={images.logoSmall}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={[style.row]}>
                      <Text style={[style.mr5, text.heading6]}>
                        Rex_Solution
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, {color: colors.gray5d}]}>
                        rex@gmail.com
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('');
                }}>
                <View style={[style.row, style.mv5]}>
                  <View style={[style.mr5]}>
                    <Image
                      style={appStyle.listImg}
                      source={images.logoSmall}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={[style.row]}>
                      <Text style={[style.mr5, text.heading6]}>
                        Rex_Solution
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, {color: colors.gray5d}]}>
                        rex@gmail.com
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('');
                }}>
                <View style={[style.row, style.mv5]}>
                  <View style={[style.mr5]}>
                    <Image
                      style={appStyle.listImg}
                      source={images.logoSmall}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={[style.row]}>
                      <Text style={[style.mr5, text.heading6]}>
                        Rex_Solution
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, {color: colors.gray5d}]}>
                        rex@gmail.com
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('');
                }}>
                <View style={[style.row, style.mv5]}>
                  <View style={[style.mr5]}>
                    <Image
                      style={appStyle.listImg}
                      source={images.logoSmall}></Image>
                  </View>
                  <View style={[style.jcCenter, {}]}>
                    <View style={[style.row]}>
                      <Text style={[style.mr5, text.heading6]}>
                        Rex_Solution
                      </Text>
                    </View>
                    <View>
                      <Text style={[text.text12, {color: colors.gray5d}]}>
                        rex@gmail.com
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* Reviews Tab End  */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
