import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Card, CardItem} from 'native-base';
import RecommendedMechanic from './RecommendedMechanic';
import {ScrollView} from 'react-native-gesture-handler';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
var FloatingLabel = require('react-native-floating-labels');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appStyle from '../../assets/styles/appStyle';
class Mechanics extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <LinearGradient
            colors={colors.orablu}
            start={{x: -0.9, y: 1}}
            end={{x: 1, y: 0}}
            style={[{paddingTop: 30}]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Dashboard')}
              style={[image.headerBackArrow, style.pt15]}>
              <Image
                style={[image.backArrow]}
                source={images.backArrow}></Image>
            </TouchableOpacity>

            <View style={style.row}>
              <View style={[style.pl40]}>
                <Image source={images.logoSmall} style={[image.Size50]}></Image>
              </View>

              <View style={{alignSelf: 'center', alignContent: 'center'}}>
                <Text style={[text.mediumlabel, {color: colors.white}]}>
                  Rex_Solution
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <StatusBar></StatusBar>
        <Card style={{marginLeft: 5, marginRight: 5}}>
          <CardItem
            header
            style={{borderBottomWidth: 1, borderBottomColor: '#dee0e2'}}>
            <Text>Your Recommendations</Text>
          </CardItem>

          <RecommendedMechanic
            navigation={this.props.navigation}
            mechanicname="UMER FAREED"
            location="Badami Bagh Lahore"
            Price="$10"
            imageUri={images.HomeImg}
            rating={5}
          />
          <RecommendedMechanic
            navigation={this.props.navigation}
            mechanicname="UMER FAREED"
            location="Badami Bagh Lahore"
            Price="$10"
            imageUri={images.HomeImg}
            rating={1}
          />
          <RecommendedMechanic
            navigation={this.props.navigation}
            mechanicname="UMER FAREED"
            location="Badami Bagh Lahore"
            Price="$10"
            imageUri={images.HomeImg}
            rating={2}
          />
          <RecommendedMechanic
            navigation={this.props.navigation}
            mechanicname="UMER FAREED"
            location="Badami Bagh Lahore"
            Price="$10"
            imageUri={images.HomeImg}
            rating={3}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default Mechanics;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
  },
});
