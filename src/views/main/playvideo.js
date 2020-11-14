import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Image,
  ImageBackground,
  Dimensions,
  Keyboard,
  Platform,
  Alert,StyleSheet,ToastAndroid
} from 'react-native';
import {Container} from 'native-base'
import Video from 'react-native-video';
export default class Postvehicalissue extends Component {
    constructor(props) {
      super(props);
      this.state = {
        videourl:this.props.navigation.getParam('videourl','nothing sent')
      }}
    render(){
      console.log('video url',this.state.videourl)
      if(this.state.videourl=='')
      {
        ToastAndroid.show(
          'Sorry Video not available',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        
      }
      console.log(this.state.videourl)
      return(<Container>
        <Video source={{uri:this.state.videourl}} 
        paused={false}
       controls={true}
       resizeMode={'contain'}
       //style={{flex:1}}
       style={styles.backgroundVideo}
        fullscreen={false}  />
      </Container>)

    }
    
  }
  var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
    