import React from 'react';
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Dashboard from '../views/main/Dashboard';
import HomeDetail from '../views/main/HomeDetail';
import Discover from '../views/main/Discover';
import Account from '../views/main/Account';
import Memories from '../views/main/Memories';
import MyBooking from '../views/main/MyBooking';
import Notification from '../views/main/Notification';
import InviteFriend from '../views/main/InviteFriend';
import ReferExperience from '../views/main/ReferExperience';
import SelectReferExperience from '../views/main/SelectReferExperience';
import Tab3 from '../views/main/tab3';
import QrCode from '../views/main/QrCode';
import EditProfile from '../views/main/EditProfile';
import Setting from '../views/main/Setting';

import BookNow from '../views/main/BookNow';
import Icon from 'react-native-vector-icons/Entypo';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileIcon from '../components/headerComponent/profileIcon';
import {colors, screenHeight, screenWidth, images} from '../config/Constant';
import SideMenu from '../views/registration/SideMenu';
import Privacy from '../views/main/Privacy';
import Terms from '../views/main/Terms';
import Feedback from "../views/main/Feedback";
import Help from "../views/main/Help";
import InviteFriends from '../views/main/InviteFriends';
import Mechaniclist from "../views/main/Mechaniclist"
import ChatBox from '../views/main/ChatBox';
//add new screen to this stack here
const DashboardStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
    },
    HomeDetail: {
      screen: HomeDetail,
    },
    Memories: {
      screen: Memories,
    },
    Account: {
      screen: Account,
    },
    Mechaniclist:{
      screen:Mechaniclist
    },
    Notification: {
      screen: Notification,
    },
    InviteFriend: {
      screen: InviteFriend,
    },
    InviteFriends: {
      screen: InviteFriends,
    },

    MyBooking: {
      screen: MyBooking,
    },
    ReferExperience: {
      screen: ReferExperience,
    },

    SelectReferExperience: {
      screen: SelectReferExperience,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const DiscoverStack = createStackNavigator(
  {
    Memories: Memories,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const TabStack = createStackNavigator(
  {
    Setting:Setting,
    EditProfile: EditProfile,
    Terms:Terms,
    Privacy:Privacy,
    Help: Help,
    Feedback:Feedback
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Navigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.searchBottom}
          />
        ),
      },
    },

    Discover: {
      screen: DiscoverStack,
      navigationOptions: {
        tabBarLabel: 'Discover',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.saved}
          />
        ),
      },
    },

    Tab3: {
      screen: TabStack,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.username}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Dashboard',
    activeColor: '#F59E52',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    inactiveColor: '#4E5967',
    barStyle: {backgroundColor: '#fff'},
  },
);

const Navigators = createMaterialBottomTabNavigator(
  {
    BookNow: {
      screen: BookNow,
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
const TabNavigator = createDrawerNavigator(
  {
    Navigator: {
      screen: Navigator,
    },
    Dashboard: {
      screen: DashboardStack,
    },
    Navigators: {
      screen: Navigators,
    },
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get('window').width / 4) * 3,
  },
);
export default createAppContainer(TabNavigator);
