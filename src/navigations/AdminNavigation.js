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
import AdminDashboard from '../views/Admin/AdminDashboard';
import UserManagement from '../views/Admin/UserManagement';
//import Blockedusers from '../views/Admin/blockedusers'
import MechanicManagement from '../views/Admin/MechanicManagement';
import AdminSetting from '../views/Admin/AdminSetting';
import Complaints from '../views/Admin/Complaints';
import Reportedmechanics from '../views/Admin/Reportedmechanics';
import Reportedcustomers from '../views/Admin/Reportedcustomers';
import Userdetail from '../views/Admin/Userdetail';
import Reportmechanicdetail from '../views/Admin/Reportmechanicdetail';
import RMechanicprofile from '../views/Admin/RMechanicprofile';
import Customerprofile from '../views/Admin/Customerprofile';
import Chelp from '../views/Admin/chelp';
import Mhelp from '../views/Admin/mhelp';
import Electricmechanic from '../views/Admin/Electricmechanic';
import Enginemechanic from '../views/Admin/Enginemechanic';
import Bodymechanic from '../views/Admin/Bodymechanic';
import Paintermechanic from '../views/Admin/Paintermechanic';
import highratedmechanics from '../views/Admin/highratedmechanics';
import MechanicHelpProfile from '../views/Admin/MechanicHelpProfile';
import CustomerHelpProfile from '../views/Admin/CustomerHelpProfile';
import {
  colors,
  screenHeight,
  screenWidth,
  images,
  URL,
} from '../config/Constant';
import LoginasMechanic from '../views/registration/LoginasMechanic';
import AddServiceRates from '../views/Admin/AddServiceRates';
import ServiceRates from '../views/Admin/ServiceRates';
import UpdateServiceRate from '../views/Admin/UpdateServiceRate';
import Mechanicprofile from '../views/Admin/Mechanicprofile';
import Mechanicdetail from '../views/Admin/Mechanicdetail';
import Analytic from '../views/Admin/Analytic';
import ReportedCustomerDetail from '../views/Admin/ReportedCustomerDetail';
import CustomerDetail from '../views/Admin/CustomerDetail';
import Blockedusers from '../views/Admin/blockedusers';
import ManageUsers from '../views/Admin/ManageUsers';
import Terms from '../views/Admin/Terms';

//add new screen to this stack here

const UserStackReport = createStackNavigator(
  {
    Reportedcustomers: Reportedcustomers,
    Reportmechanicdetail: Reportmechanicdetail,
    Mechanicprofile: Mechanicprofile,
    Customerprofile: Customerprofile,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const MechanicStackReport = createStackNavigator(
  {
    Reportedmechanics: Reportedmechanics,
    ReportedCustomerDetail: ReportedCustomerDetail,
    RMechanicprofile: RMechanicprofile,
    CustomerDetail: CustomerDetail,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const CustomerStackHelp = createStackNavigator(
  {
    Chelp: Chelp,
    CustomerHelpProfile: CustomerHelpProfile,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const MechanicStackHelp = createStackNavigator(
  {
    Mhelp: Mhelp,
    MechanicHelpProfile: MechanicHelpProfile,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const DashboardStack = createStackNavigator(
  {
    AdminDashboard: {
      screen: AdminDashboard,
    },
    
    UserStackReport: UserStackReport,
    MechanicStackReport: MechanicStackReport,
    CustomerStackHelp: CustomerStackHelp,
    MechanicStackHelp: MechanicStackHelp,
    highratedmechanics: highratedmechanics,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const RatesStack = createStackNavigator(
  {
    ServiceRates: ServiceRates,
    AddServiceRates: AddServiceRates,
    UpdateServiceRate: UpdateServiceRate,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const MechanicManagementStack = createStackNavigator(
  {
    MechanicManagement: MechanicManagement,
    Electricmechanic: Electricmechanic,
    Enginemechanic: Enginemechanic,
    Paintermechanic: Paintermechanic,
    Bodymechanic: Bodymechanic,
    UserManagement: UserManagement,
    Mechanicdetail: Mechanicdetail,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const UserManagementStack = createStackNavigator(
  {
     ManageUsers:ManageUsers,
    Userdetail: Userdetail,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const BlockedUserManagementStack = createStackNavigator(
  {
    Blockedusers: Blockedusers,
    //Userdetail: Userdetail,
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
    AdminSetting: AdminSetting,
    Rates: RatesStack,
    MechanicManagement: MechanicManagementStack,
    UserManagement: UserManagementStack,
    Blockedusers: BlockedUserManagementStack,
    Terms:Terms
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const Analyticstack = createStackNavigator(
  {
    Analytic: Analytic,
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

    Analytic: {
      screen: Analyticstack,
      navigationOptions: {
        tabBarLabel: 'Analytics',
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{
              resizeMode: 'contain',
              height: 25,
              width: 25,
              tintColor: colors.gray,
            }}
            source={images.stat}
          />
        ),
      },
    },
    // Help: {
    //   screen: Helpstack,
    //   navigationOptions: {
    //     tabBarLabel: 'Help',
    //     tabBarIcon: ({tintColor}) => (
    //       <Image
    //         style={{resizeMode: 'contain', height: 25, width: 25,tintColor:colors.gray}}
    //         source={images.Question}
    //       />
    //     ),
    //   },
    // },
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
