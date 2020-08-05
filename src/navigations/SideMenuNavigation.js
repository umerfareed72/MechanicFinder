import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Account from '../views/registration/SideMenu';
import SideMenu from '../views/registration/SideMenu';
import BottomTabNavigation from './BottomTabNavigation';

const {height, width} = Dimensions.get('window');
// class NavigationDrawerStructure extends Component {
//   //Structure for the navigatin Drawer
//   toggleDrawer = () => {
//     //Props to open/close the drawer
//     this.props.navigationProps.toggleDrawer();
//   };
//   render() {
//     return (
//       <View style={{flexDirection: 'row'}}>
//         <TouchableOpacity onPress={() => alert('hello')}>
//           <Image
//             source={require('../assets/images/sidemenu.png')}
//             style={{marginLeft: 10}}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

const Dashboard = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: Account,
  },
});

const DrawerNavigator = createDrawerNavigator(
  {
    Tabs: BottomTabNavigation,

    //Drawer Optons and indexing
    Dashboard: {
      //Title
      screen: Dashboard,
      navigationOptions: {
        drawerLabel: 'Dashboard',
      },
    },
  },
  {
    contentComponent: SideMenu,
    drawerWidth: (Dimensions.get('window').width / 4) * 3,
  },
);

export default createAppContainer(DrawerNavigator);
