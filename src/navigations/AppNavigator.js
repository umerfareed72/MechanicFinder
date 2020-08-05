import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TabNavigation from './BottomTabNavigation';
import Splash from '../views/registration/Splash';
import Login from '../views/registration/Login';
import MechanicRegister from '../views/registration/MechanicRegister';
// import TabNavigation from './BottomTabNavigation';
import SignUp from '../views/registration/SignUp';
import DrawerNavigator from '../navigations/SideMenuNavigation';
import ChatBox from '../views/main/ChatBox';
import ForgotPassword from '../views/registration/ForgotPassword';
import { createBottomTabNavigator} from 'react-navigation-tabs';

//import Header from '../components/header'; //not being used currently but header function can be placed in-place of header title more customization

import React from 'react';
import {colors} from '../config/Constant';

const Top = createBottomTabNavigator(
  {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
      navigationOptions:{
        tabBarLabel:"User Register"
      }
    },
    MechanicRegister: {
      screen: MechanicRegister,
      navigationOptions:{
        tabBarLabel:"Mechanic Register"
      }
    },
  },
  {
    order: ['Login', 'SignUp','MechanicRegister'],
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: colors.white,
activeBackgroundColor:colors.darkBlue,
      inactiveTintColor: colors.lightblue,
      labelStyle: {fontSize: 12, fontWeight: 'bold',paddingBottom:15},
        indicatorStyle: {backgroundColor: colors.darkBlue},
      style: {backgroundColor: colors.white},
      
    },
    initialRouteName: 'Login',
  },
);

const SplashStack = createStackNavigator(
  {
    Splash: Splash,
  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const AuthStack = createStackNavigator(
  {

    Top: {
      screen: Top,
    },
    Forgot: ForgotPassword,

    BottomTabNavigation: TabNavigation,
    ChatBox: ChatBox,
    // DrawerNavigator:DrawerNavigator
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
