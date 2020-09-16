import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';

export default StyleSheet.create({
  mediuminputstyle: {
    flex: 2.5,
    alignItems: 'flex-end',
    backgroundColor: '#fff',
   
  },
  drop: {
    flex: 0.8,
   
  },

  areainputborder: {
    borderColor: colors.gray,
    borderWidth: 1,
    marginHorizontal: 20,
  },
  textarea: {
    textAlignVertical: 'top',
  },
  textinputcontainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    alignItems: 'center',
    borderBottomColor: colors.grayd7,
    borderBottomWidth: 1,
  },
  largeinputstyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    fontSize: 20,
    color: '#fff',
   

 
  },


  textinputstyle: {
    width: '87%',
   
  },
});
