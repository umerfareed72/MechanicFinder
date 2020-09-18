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
import MechanicDashboard from '../views/Mechanic/MechanicDashboard';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideMenu from '../views/registration/SideMenu';
import Setting from '../views/main/Setting';
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../config/Constant';

//add new screen to this stack here
const DashboardStack = createStackNavigator(
  {
    MechanicDashboard: {
      screen: MechanicDashboard,
    },
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
    Setting: Setting,
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
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{resizeMode: 'contain', height: 25, width: 25}}
            source={images.searchBottom}
          />
        ),
      },
    },
    Settings: {
      screen: SettingStack,
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
    initialRouteName: 'MechanicDashboard',
    activeColor: '#F59E52',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    inactiveColor: '#4E5967',
    barStyle: {backgroundColor: '#fff'},
  },
);

const MechanicTabNavigator = createDrawerNavigator(
  {
    Navigator: {
      screen: Navigator,
    },
    MechanicDashboard: {
      screen: DashboardStack,
    },
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get('window').width / 4) * 3,
  },
);

export default createAppContainer(MechanicTabNavigator);
