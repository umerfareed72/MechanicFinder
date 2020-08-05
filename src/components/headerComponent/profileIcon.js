import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image,View,Text} from 'react-native';
class ProfileIcon extends Component {
    toggleProfile = () => {
        //Props to open/close profile screen
         this.props.navigation.navigate();
      };
  render() {
    return (
      <TouchableOpacity
      style={{backgroundColor:'#516575',
      borderTopLeftRadius: 130/2,
      borderBottomLeftRadius: 130/2,
      width: 50,
      height: 40,
      alignItems:'center',
      justifyContent:'center',
      }}
        onPress={()=>this.props.navigation.navigate('Profile')}>
             <Text style={{color:'#fff',fontWeight:'bold',fontSize:25}}>J</Text>

      </TouchableOpacity>
    );
  }
}
export default withNavigation(ProfileIcon);