import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
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
import {colors, screenHeight, screenWidth, images} from '../config/Constant';
// import TabNavigation from './BottomTabNavigation';
import SignUp from '../views/registration/SignUp';
import LoginasMechanic from '../views/registration/LoginasMechanic';
import ForgotPassword from '../views/registration/ForgotPassword';
import MechanicNavigation from './MechanicNavigation';
import ProfileNavigator from './Profiles';

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
    LoginasMechanic: LoginasMechanic,
    MechanicRegister: MechanicRegister,
    Forgot: ForgotPassword,
  },
  {
    headerMode: 'none',
  },
);



const ProfileStack = createStackNavigator(
  {
    screen: ProfileNavigator,
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

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashStack,
      Auth: AuthStack,
      userStack: userStack,
      mechanicStack: mechanicStack,
      ProfileStack: ProfileStack,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
