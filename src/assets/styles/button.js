import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import text from './text';

export default StyleSheet.create({
  buttoncontainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.darkblue,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'stretch',
    height: 50,
    marginHorizontal: 20,

    marginVertical: 8,
  },

  touchablebutton: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'OpenSans',
  },
  button: {
    borderColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonPress: {
    borderColor: '#000066',
    backgroundColor: '#000066',
    borderWidth: 1,
    borderRadius: 10,
  },
  bookbutton: {
    color: colors.white,
    fontWeight: '600',
  },
  bookbuttoncontainer: {
    marginTop: 5,
    marginHorizontal: 50,
    backgroundColor: colors.purple,
  },

  sharebutton: {
    marginHorizontal: 50,
    backgroundColor: colors.solidwhite,
  },
  modalButton: {
    backgroundColor: '#F59E52',
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 4,
    justifyContent: 'center',
  },
  btnExtraSmall: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: 'center',
    borderRadius: 20,
  },
  inviteBtn: {
    height: 30,
    borderRadius: 20,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  Profilebutton: {
    marginTop: 50,
    width: '45%',
    height: 35,
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: colors.orange,
    justifyContent: 'center',
  },
  //Mechanic Side Styling

  button1:{
    backgroundColor: colors.darkBlue,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 30,
  },
  btntext1:{
    fontSize:20,
    fontFamily:'goodfishbd',
    color:colors.white,
    letterSpacing:1
  },
  buttonTheme: {
    backgroundColor: colors.orange,
    width: '100%',
    // alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.0,

    elevation: 6,
  },

});
