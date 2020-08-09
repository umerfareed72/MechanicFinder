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

import React from 'react';
import {colors} from '../config/Constant';


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

Login:Login,
SignUp:SignUp,
MechanicRegister:MechanicRegister,
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
