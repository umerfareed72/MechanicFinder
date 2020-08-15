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
    width: '35%',
    height: 35,
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: colors.orange,
    justifyContent: 'center',
  },
});
