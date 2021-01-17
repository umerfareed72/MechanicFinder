import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './BottomTabNavigation';
import Splash from '../views/registration/Splash';
import Login from '../views/registration/Login';
import MechanicRegister from '../views/registration/MechanicRegister';
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, screenHeight, screenWidth, images } from '../config/Constant';

// import TabNavigation from './BottomTabNavigation';
import SignUp from '../views/registration/SignUp';
import LoginasMechanic from '../views/registration/LoginasMechanic';
import GoogleUserSignUp from '../views/registration/GoogleUserSignUp';
import cnewpassword from '../views/registration/cnewpassword';
import ForgotPassword from '../views/registration/ForgotPassword';
//import Usman from '../views/registration/usman'
import Cpasscode from '../views/registration/cpasscode';
import Mforget from '../views/registration/Mforgetpassword';
import mpasscode from '../views/registration/mpasscode';
import Mnewpassword from '../views/registration/mnewpassword';
import MechanicNavigation from './MechanicNavigation';
import LoginAsAdmin from "../views/registration/LoginAsAdmin"
import newuserconfirm from '../views/registration/newuserconfirm'
import newuserconfirm1 from '../views/registration/newuser1confirm'
import AdminNavigation from './AdminNavigation'
//import mnewpassword from '../views/registration/mnewpassword';
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
    Login: Login,
    SignUp: SignUp,

    GoogleUserSignUp: GoogleUserSignUp,
    LoginasMechanic: LoginasMechanic,
    MechanicRegister: MechanicRegister,
    Forgot: ForgotPassword,
    Cpasscode: Cpasscode,
    cnewpassword: cnewpassword,
    Mforget: Mforget,
    mpasscode: mpasscode,
    Mnewpassword: Mnewpassword,
    LoginAsAdmin: LoginAsAdmin,
    newuserconfirm: newuserconfirm,
    newuserconfirm1: newuserconfirm1
  },
  {
    headerMode: 'none',
  },
);





const userStack = createStackNavigator(
  {
    screen: TabNavigation,
  },
  {
    headerMode: 'none',
  },
);
const mechanicStack = createStackNavigator(
  {
    screen: MechanicNavigation,
  },
  {
    headerMode: 'none',
  },
);
const AdminStack = createStackNavigator(
  {
    screen: AdminNavigation,
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
      userStack: userStack,
      mechanicStack: mechanicStack,
      AdminStack: AdminStack
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
