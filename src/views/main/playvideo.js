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
  Alert,StyleSheet
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
      console.log(this.state.videourl)
      return(<Container>
        <Video source={{uri:this.state.videourl}} 
        paused={false}
       controls={true}
       resizeMode={'contain'}
       //style={{flex:1}}
       style={styles.backgroundVideo}
        fullscreen={true}  />
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
    