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
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Button,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import style from '../../assets/styles/style';
import image from '../../assets/styles/image';
import text from '../../assets/styles/text';
import input from '../../assets/styles/input';
import button from '../../assets/styles/button';
var FloatingLabel = require('react-native-floating-labels');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import appStyle from '../../assets/styles/appStyle';
import {color} from 'react-native-reanimated';
import Hamburger from '../../components/headerComponent/Hamburger';
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      date: '2020-05-15',
      filePath: {},
      photo: null,
      Gender: 'Select Gender',
      isImageVisible: false,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };
  handleChoosePhoto = () => {
    const options = {
      title: 'Take Image From',
      StorageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        var data = new FormData();
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        data.append('file', source);
        data.append('upload_preset', 'rjrthtdu');
        data.append('cloud_name', 'dbkmbaxmk');
        fetch('https://api.cloudinary.com/v1_1/dbkmbaxmk/image/upload', {
          method: 'post',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.secure_url);
            this.setState({photo: data.secure_url});
          })
          .catch((err) => {
            Alert.alert('An Error Occured While Uploading');
            console.log(err);
          });
      } else if (response.didCancel) {
        console.log('User Cancelled Image Picker');
      } else if (response.error) {
        console.log('Image Picker Error', response.error);
      }
    });
  };

  ImageModal = () => {
    this.setState({isImageVisible: !this.state.isImageVisible});
  };
  render() {
    const {photo} = this.state;
    return (
      <SafeAreaView style={style.flex1}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <View style={{}}>
          <Modal
            isVisible={this.state.isImageVisible}
            animationInTiming={500}
            animationOutTiming={500}>
            <ScrollView>
              <View style={[style.flex1, appStyle.rowEven]}>
                <TouchableOpacity
                  style={[appStyle.DashboardslotCard, style.w100]}
                  onPress={this.ImageModal}>
                  <View style={[style.mv10, style.aiCenter]}>
                    <Text style={[text.h1]}>Preview Image</Text>
                    <Text style={[text.heading2Gray]}>
                      {this.state.firstname} {this.state.lastname}
                    </Text>
                  </View>
                  <Image
                    source={{uri: this.state.photo}}
                    style={{
                      height: 450,
                      resizeMode: 'stretch',
                      borderRadius: 10,
                    }}></Image>
                  <TouchableOpacity
                    style={[button.buttonTheme, style.mt30, style.aiCenter]}
                    onPress={this.handleChoosePhoto}>
                    <Text style={[button.btntext1]}> Upload Pucture </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[button.buttonTheme, style.mt10, style.aiCenter]}
                    onPress={this.ImageModal}>
                    <Text style={[button.btntext1]}> Close Preview </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        </View>

        <KeyboardAvoidingView
          style={{backgroundColor: colors.white, flexGrow: 1}}>
          <ScrollView>
            <View>
              <View>
                <LinearGradient
                  colors={colors.orablu}
                  start={{x: -0.9, y: 1}}
                  end={{x: 1, y: 0}}
                  style={[style.headerHeight1]}>
                  <StatusBar backgroundColor={'transparent'} />

                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={[image.headerBackArrow]}>
                    <Image
                      style={[image.backArrow]}
                      source={images.backArrow}></Image>
                  </TouchableOpacity>
                  <View style={[style.flex1, style.jcCenter, style.mh40]}>
                    <View style={[style.jcSpaceBetween, style.row]}>
                      <View style={style.mr20}>
                        <View style={[image.ovalcontainer]}>
                          {photo && (
                            <Image
                              source={{uri: photo.uri}}
                              style={[image.ovalcontainerupload]}
                            />
                          )}
                          <TouchableOpacity
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={this.ImageModal}>
                            <Image
                              style={[image.mediumimagestyle]}
                              source={images.camerdark}
                            />
                          </TouchableOpacity>
                        </View>
                        <View>
                          <Text style={[text.textheader6, style.asCenter]}>
                            Edit Photo
                          </Text>
                        </View>
                      </View>
                      <View style={[style.flex1]}>
                        <TextInput
                          placeholder="First Name"
                          style={input.largeinputstyle}
                          placeholderTextColor={colors.white}></TextInput>
                        <TextInput
                          placeholder="Last Name"
                          style={input.largeinputstyle}
                          placeholderTextColor={colors.white}></TextInput>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              <View style={[appStyle.bodyBg, style.ph10]}>
                <View style={[style.padding10]}>
                  <Text style={[text.mediumlabel]}>Edit</Text>
                </View>
                <View style={[appStyle.editbordercontainer]}>
                  <View style={style.row}>
                    <View style={[text.mediumtextcontainer]}>
                      <Text style={text.textheader4}>Phone Number</Text>
                    </View>
                    <View style={[input.mediuminputstyle]}>
                      <TextInput
                        placeholder="0123456789"
                        keyboardType={'numeric'}></TextInput>
                    </View>
                  </View>
                </View>

                <View style={[appStyle.editbordercontainer]}>
                  <View style={style.row}>
                    <View style={[text.mediumtextcontainer]}>
                      <Text style={text.textheader4}>Email</Text>
                    </View>
                    <View style={[input.mediuminputstyle]}>
                      <TextInput placeholder="info@rex_solution.com"></TextInput>
                    </View>
                  </View>
                </View>
                <View style={[appStyle.editbordercontainer]}>
                  <View style={style.row}>
                    <View style={[text.mediumtextcontainer]}>
                      <Text style={text.textheader4}>Password</Text>
                    </View>
                    <View style={[input.mediuminputstyle]}>
                      <TextInput
                        secureTextEntry={true}
                        placeholder="*********"></TextInput>
                    </View>
                  </View>
                </View>

                <View style={[appStyle.editbordercontainer]}>
                  <View style={style.row}>
                    <View style={[text.mediumtextcontainer]}>
                      <Text style={text.textheader4}>Gender</Text>
                    </View>
                    <View style={[input.drop]}>
                      <Picker
                        style={text.regualGray}
                        selectedValue={this.state.Gender}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({Gender: itemValue})
                        }>
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                      </Picker>
                    </View>
                  </View>
                </View>

                <View style={[appStyle.editbordercontainer]}>
                  <View style={style.row}>
                    <View style={[text.mediumtextcontainer]}>
                      <Text style={text.textheader4}>Birthday</Text>
                    </View>
                    <View style={[input.mediuminputstyle]}>
                      <DatePicker
                        style={{width: 150}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 15,
                          },
                          dateInput: {
                            marginLeft: 36,

                            borderColor: colors.white,
                          },
                          dateText: {
                            color: colors.gray,
                          },

                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                          this.setState({date: date});
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ChatBox');
              }}>
              <View style={[button.buttoncontainer, style.mt20]}>
                <Text
                  style={[button.touchablebutton, {color: colors.darkBlue}]}>
                  Save
                </Text>
              </View>
            </TouchableOpacity>

            {/* <View style={[image.ovalcontainer, style.jcCenter, style.aiCenter]}>
                       
                            {photo && (
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={[  style.aiCenter,image.ovalcontainer ]}
                                />
                            )}
                           <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }} onPress={this.handleChoosePhoto}>
                                <Image style={{height:50,width:50}} source={images.camerdark} />

                            </TouchableOpacity>
                        </View> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
