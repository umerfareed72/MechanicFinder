import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TabNavigation from './BottomTabNavigation';
import Splash from '../views/registration/Splash';
import Login from '../views/registration/Login';
import MechanicRegister from '../views/registration/MechanicRegister';
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, screenHeight, screenWidth, images} from '../config/Constant';
// import TabNavigation from './BottomTabNavigation';
import SignUp from '../views/registration/SignUp';
import LoginasMechanic from '../views/registration/LoginasMechanic';
import ChatBox from '../views/main/ChatBox';
import BookNow from '../views/main/BookNow';
import ForgotPassword from '../views/registration/ForgotPassword';
import MechanicNavigation from './MechanicNavigation';
import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import ProfileDetail from '../views/main/ProfileDetail';
import UserProfile from '../views/Mechanic/UserProfile';
import UserProfileDetail from '../views/Mechanic/UserProfileDetail';
import Chat from '../views/Mechanic/Chat';

//User Side Navigations

const BookNowStack = createStackNavigator(
  {
    BookNow: BookNow,
    ProfileDetail: ProfileDetail,
  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Navigators = createMaterialBottomTabNavigator(
  {
    BookNow: {
      screen: BookNowStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.userIcon}
          />
        ),
      },
    },

    ChatBox: {
      screen: ChatBox,
      navigationOptions: {
        tabBarLabel: 'ChatBox',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.chatBox}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'BookNow',
    activeColor: '#F59E52',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    inactiveColor: '#4E5967',
    barStyle: {backgroundColor: '#fff'},
  },
);

//Mechanic Side Navigations
const BookedUserStack = createStackNavigator(
  {
    UserProfile: UserProfile,
    UserProfileDetail: UserProfileDetail,
  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const MechanicNavigators = createMaterialBottomTabNavigator(
  {
    BookedUser: {
      screen: BookedUserStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.userIcon}
          />
        ),
      },
    },

    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: 'ChatBox',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.chatBox}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'BookedUser',
    activeColor: '#F59E52',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    inactiveColor: '#4E5967',
    barStyle: {backgroundColor: '#fff'},
  },
);
const ProfileNavigator = createStackNavigator(
  {
    Navigators: Navigators,
    MechanicNavigators: MechanicNavigators,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(ProfileNavigator);
