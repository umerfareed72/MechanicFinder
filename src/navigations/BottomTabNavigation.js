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
// import Discover from '../views/main/Discover';

// import Memories from '../views/main/Memories'

;
import MyBooking from '../views/main/MyBooking';
import InviteFriend from '../views/main/InviteFriend';

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
import Help from '../views/main/Help';

import Mechaniclist from '../views/main/Mechaniclist';
import ChatBox from '../views/main/ChatBox';
import BuyItems from '../views/main/BuyItems';
import ProfileDetail from '../views/main/ProfileDetail';

import Items from '../views/main/Items';
import Login from '../views/registration/Login';
import PostVehicleIssue from "../views/main/PostVehicleIssue"
import Issuedetail from "../views/main/Issuedetail"
import IssueListC from "../views/main/IssueListC"
import EditIssue from "../views/main/EditIssue"
import Rates from '../views/Mechanic/Rates'
//add new screen to this stack here
const DashboardStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
    },
    HomeDetail: {
      screen: HomeDetail,
    },
    // Memories: {
    //   screen: Memories,
    // },

    Mechaniclist: {
      screen: Mechaniclist,
    },

    InviteFriend: {
      screen: InviteFriend,
    },

    MyBooking: {
      screen: MyBooking,
    },
    BuyItems: {
      screen: BuyItems,
    },
    Items: {
      screen: Items,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const PostVehicleStack = createStackNavigator(
  {
    IssueListC: IssueListC,
    PostVehicleIssue:PostVehicleIssue,
    Issuedetail:Issuedetail,
    EditIssue:EditIssue
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
    Setting: Setting,
    EditProfile: EditProfile,
    Terms: Terms,
    Privacy: Privacy,
    Help: Help,
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

    IssueListC: {
      screen: PostVehicleStack,
      navigationOptions: {
        tabBarLabel: 'Post Vehicle',
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

const BookNowStack = createStackNavigator(
  {
    ProfileDetail: ProfileDetail,
    BookNow: BookNow,
   
  },
  {
    headerMode: 'none',
  },
);

const LoginStack = createStackNavigator(
  {
    Login: Login,
  },
  {
    headerMode: 'none',
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
const TabNavigator = createDrawerNavigator(
  {
    Navigator: {
      screen: Navigator,
    },
    // Dashboard: {
    //   screen: DashboardStack,
    // },
    Navigators: {
      screen: Navigators,
    },
    Rates:{
      screen:Rates
    }

  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get('window').width / 4) * 3,
  },
);
export default createAppContainer(TabNavigator);
