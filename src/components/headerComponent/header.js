import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
  TextInput
} from 'react-native';

import {colors, screenHeight, screenWidth, images} from '../config/Constant';



export default function Header() {
    return(
        <View style ={styles.header}>
        {/*Icons */}
         <View>
             <Text style={styles.headerText}>Headerss</Text>
         </View>
        </View>
    );
}

const styles = StyleSheet.create({
      header: {
          width:'100%',
          height:'100%',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
      },
      headerText: {
        fontWeight:'bold',
        fontSize:20,
        color:'#fff',
        letterSpacing:1
    },

});