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
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import AdminDashboard from '../views/Admin/AdminDashboard'
import UserManagement from '../views/Admin/UserManagement'
import MechanicManagement from '../views/Admin/MechanicManagement'
import AdminSetting from '../views/Admin/AdminSetting'
import Complaints from '../views/Admin/Complaints'
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../config/Constant';
import LoginasMechanic from '../views/registration/LoginasMechanic';

//add new screen to this stack here
const DashboardStack = createStackNavigator(
  {
    AdminDashboard: {
      screen: AdminDashboard,
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
    AdminSetting:AdminSetting,
    UserManagement: UserManagement,
    MechanicManagement: MechanicManagement,
  Complaints:Complaints 
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
    AdminDashboard: {
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
              source={images.setting}
            />
          ),
        },
      },
  
    },
  

  {

    initialRouteName: 'AdminDashboard',
    activeColor: '#F59E52',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    inactiveColor: '#4E5967',
    barStyle: {backgroundColor: '#fff'},
  },
);


export default createAppContainer(Navigator);
