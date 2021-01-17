import React from 'react';
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import MechanicDashboard from '../views/Mechanic/MechanicDashboard';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MechanicSideMenu from '../views/registration/MechanicSideMenu';
import MechanicSetting from '../views/Mechanic/MechanicSetting';
import UserProfile from '../views/Mechanic/UserProfile';
import Chat from '../views/Mechanic/ChatBox';
import UserProfileDetail from '../views/Mechanic/UserProfileDetail';
import Products from '../views/Mechanic/Products'
import AddProducts from '../views/Mechanic/AddProducts'
import EditMechanicProfile from '../views/Mechanic/EditMechanicProfile'
import Rates from '../views/Mechanic/Rates'
import BookedUser from '../views/Mechanic/BookedUser'
import playvideo1 from '../views/main/playvideo'
import MechanicHelp from '../views/Mechanic/MechanicHelp'
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../config/Constant';
import LoginasMechanic from '../views/registration/LoginasMechanic';
import EditProduct from '../views/Mechanic/EditProduct';
import IssueList from '../views/Mechanic/IssueList';
import Issuedetail from '../views/main/Issuedetail';
import MIssuedetail from '../views/Mechanic/MIssueDetail';
import MechanicTerms from '../views/Mechanic/MechanicTerms';
import reportcustomer from '../views/Mechanic/reportcustomer';
//add new screen to this stack here
const DashboardStack = createStackNavigator(
  {
    MechanicDashboard: {
      screen: MechanicDashboard,
    },
    BookedUser: {
      screen: BookedUser
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const IssueStack = createStackNavigator(
  {
    IssueList: IssueList,
    MIssuedetail: MIssuedetail,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const SettingStack = createStackNavigator(
  {
    MechanicSetting: MechanicSetting,
    EditMechanicProfile: EditMechanicProfile,
    MechanicHelp: MechanicHelp,
    MechanicTerms: MechanicTerms,

  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Productsstack = createStackNavigator(
  {
    Products: Products,
    AddProducts: AddProducts,
    EditProduct: EditProduct,

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
    MechanicDashboard: {
      screen: DashboardStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ resizeMode: 'contain', height: 25, width: 25 }}
            source={images.searchBottom}
          />
        ),
      },
    },
    Product: {
      screen: IssueStack,
      navigationOptions: {
        tabBarLabel: 'Vehical Issues',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ resizeMode: 'contain', height: 25, width: 25 }}
            source={images.store}
          />
        ),
      },
    },
    Settings: {
      screen: SettingStack,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ resizeMode: 'contain', height: 25, width: 25 }}
            source={images.username}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'MechanicDashboard',
    activeColor: '#F59E52',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    inactiveColor: '#4E5967',
    barStyle: { backgroundColor: '#fff' },
  },
);
const UserBookNowStack = createStackNavigator(
  {
    UserProfileDetail: UserProfileDetail,
    UserProfile: UserProfile,
    reportcustomer: reportcustomer,

  },
  {
    headerMode: 'none',
  },
);

const Navigators = createMaterialBottomTabNavigator(
  {
    UserBookNow: {
      screen: UserBookNowStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ resizeMode: 'contain', height: 25, width: 25 }}
            source={images.userIcon}
          />
        ),
      },
    },

    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarLabel: 'ChatBox',
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ resizeMode: 'contain', height: 25, width: 25 }}
            source={images.chatBox}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'UserBookNow',
    activeColor: '#F59E52',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    inactiveColor: '#4E5967',
    barStyle: { backgroundColor: '#fff' },
  },
);


const MechanicTabNavigator = createDrawerNavigator(
  {
    Navigator: {
      screen: Navigator,
    },

    //     LoginasMechanic: {
    //   screen: LoginasMechanic,
    // },
    Navigators: {
      screen: Navigators,
    },
    Rates: {
      screen: Rates
    },
    Products: {
      screen: Productsstack
    }
  },
  {
    contentComponent: MechanicSideMenu,
    drawerWidth: (Dimensions.get('window').width / 4) * 3,
  },
);

export default createAppContainer(MechanicTabNavigator);
