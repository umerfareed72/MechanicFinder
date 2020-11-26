import React, { Component } from 'react';
import {SafeAreaView,StatusBar,View,ActivityIndicator} from "react-native"
import appStyle from "./assets/styles/appStyle"
import style from "./assets/styles/style"
class Loading extends Component {
    state = {  }
    render() { 
        return (    <SafeAreaView style={[appStyle.safeContainer]}>
            <StatusBar barStyle={'dark-content'}></StatusBar>
            <View style={[style.flex1, style.jcCenter]}>
              <View style={[style.aiCenter]}>
                <ActivityIndicator
                  color="#bc2b78"
                  size="large"></ActivityIndicator>
              </View>
            </View>
          </SafeAreaView> );
    }
}
 
export default Loading;