import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions} from 'react-navigation-drawer';
import {Image} from 'react-native';
class Hamburger extends Component {
 
  render(props) {
    return (
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          marginLeft: 5,
          resizeMode:'contain',
          // onPress={() => alert('hello')}
          // onPress={()=>this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
          justifyContent:'center'   
        }}
        onPress={()=>this.props.navigation.openDrawer()}>
         <Image style={{width: 27,
          height: 27,
          resizeMode:'contain',
          tintColor:this.props.tintColor
        }} source={require('../../assets/images/iconHam.png')}
         />
      </TouchableOpacity>
    );
  }
}
export default withNavigation(Hamburger);