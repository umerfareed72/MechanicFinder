import React from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
import appStyle from '../../assets/styles/appStyle';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {ListItem, Separator} from 'native-base';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';
import {SafeAreaView} from 'react-navigation';

navigateToScreen = (route) => () => {
  const navigateAction = NavigationActions.navigate({
    routeName: route,
  });
  this.props.navigation.dispatch(navigateAction);
};
export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      collpased2: false,
      collapsed3: false,
      collapsed4: false,
    };
  }
  logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      this.props.navigation.navigate('Login');
    });
  };

  static navigationOptions = {
    headerShown: false,
  };
  render() {
    return (
      <SafeAreaView>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <ScrollView>
          <View>
            <View style={({color: colors.white}, appStyle.borderContainer)}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ReferExperience');
                }}>
                <View style={[style.row, style.mt40, style.mh20]}>
                  <View style={[style.mr10]}>
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Account');
              }}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.user}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.gray666}]}>
                    Accounts
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SelectReferExperience');
              }}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.saved}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.gray666}]}>
                    Saved
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Memories")}}>
                  <View style={style.mh20}>
                  <View style={[image.attachtextimageleft]}>
                    <Image
                      source={images.picture}
                      style={[image.image18]}></Image>
                    <Text style={text.textheader4}>Memories</Text>
                  </View>
                  </View>
                  </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('MyBooking');
              }}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.calendar}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.gray666}]}>
                    My Booking
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Collapse isCollapsed={this.state.collapsed}>
              <CollapseHeader>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      collapsed: true,
                      collapsed2: false,
                      collapsed4: false,
                      collapsed3: false,
                    });
                  }}>
                  <View style={style.mh20}>
                    <View style={[image.attachtextimageleft]}>
                      <Image
                        source={images.setting}
                        style={[image.drawerIcon]}></Image>
                      <Text style={[text.textheader4, {color: colors.gray666}]}>
                        Setting
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </CollapseHeader>
              <CollapseBody>
                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('EditProfile');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Edit Profile</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>

                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Notification');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Notification</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </CollapseBody>
            </Collapse>

            <Collapse isCollapsed={this.state.collapsed2}>
              <CollapseHeader>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      collapsed: false,
                      collapsed2: true,
                      collapsed3: false,
                      collapsed4: false,
                    });
                  }}>
                  <View style={style.mh20}>
                    <View style={[image.attachtextimageleft]}>
                      <Image
                        source={images.percent}
                        style={[image.drawerIcon]}></Image>
                      <Text style={[text.textheader4, {color: colors.gray666}]}>
                        Promotions
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </CollapseHeader>
              <CollapseBody>
                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('InviteFriend');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Invite Friend</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>

                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ReferExperience');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Refer Experience</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </CollapseBody>
            </Collapse>

            <Collapse isCollapsed={this.state.collapsed3}>
              <CollapseHeader>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      collapsed: false,
                      collapsed2: false,
                      collapsed4: false,
                      collapsed3: true,
                    });
                  }}>
                  <View style={style.mh20}>
                    <View style={[image.attachtextimageleft]}>
                      <Image
                        source={images.support}
                        style={[image.drawerIcon]}></Image>
                      <Text style={[text.textheader4, {color: colors.gray666}]}>
                        Support
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </CollapseHeader>
              <CollapseBody>
                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Help');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Heip</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>

                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Feedback');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Feedback</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </CollapseBody>
            </Collapse>

            <Collapse isCollapsed={this.state.collapsed4}>
              <CollapseHeader>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      collapsed: false,
                      collapsed2: false,
                      collapsed3: false,
                      collapsed4: true,
                    });
                  }}>
                  <View style={style.mh20}>
                    <View style={[image.attachtextimageleft]}>
                      <Image
                        source={images.LegalPaper}
                        style={[image.drawerIcon]}></Image>
                      <Text style={[text.textheader4, {color: colors.gray666}]}>
                        Legal
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </CollapseHeader>
              <CollapseBody>
                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Terms');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Term of Service</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>

                <ListItem style={{borderColor: colors.white}}>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      this.props.navigation.navigate('Privacy');
                    }}>
                    <View style={style.pl60}>
                      <Text style={[text.textlabel12]}>Privacy Policy</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </CollapseBody>
            </Collapse>

            <TouchableOpacity
              onPress={() => {
                this.logout();
              }}>
              <View style={style.mh20}>
                <View style={[image.attachtextimageleft]}>
                  <Image
                    source={images.logout}
                    style={[image.drawerIcon]}></Image>
                  <Text style={[text.textheader4, {color: colors.gray666}]}>
                    Logout
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
