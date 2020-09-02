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


export default createAppContainer(DashboardStack);
