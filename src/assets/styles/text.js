import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
export default StyleSheet.create({
  fontFamily: {
    // fontFamily:'serif',
  },
  textlabel12: {
    fontSize: 12,
    color: colors.gray,
    marginHorizontal: 10,
  },
  sharetext: {
    fontSize: 16,
   
    justifyContent: 'center',
  },
  heading8:{
    fontSize:22,
    color:colors.purple,
  },
  heading8White:{
    fontSize:22,
    color:colors.white,
    
  },
 
  textbody: {
    fontSize: 14,
   
    paddingTop: 10,
    color: colors.gray,
  },
  pickerstyle:{
    height: 50, 
    width: 280, 
    left: -8,
     color: colors.gray
  },
  mediumtextcontainer: {
    flex: 1.5,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    alignContent: 'flex-start',
  },
  lablealign: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  splashtext: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headertextstyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texttiny10: {
    fontSize: 10,
    color: colors.gray,
  },
  leftchatstyle: {
    fontSize: 13,
    padding: 10,
    borderRadius: 10,
    color: colors.gray,
    backgroundColor: colors.white,
    width: 'auto',
    marginRight: 80,
  },
  rightchatstyle: {
    fontSize: 13,
    padding: 10,
    borderRadius: 10,
    color: colors.white,
    backgroundColor: colors.orange,
    width: 'auto',
    marginLeft: 80,
  },
  smallheader: {
    fontSize: 13,
    paddingTop:10,

    color: colors.darkBlue,
  },
  mediumlabel: {
    fontSize: 16,
    padding: 5,
    color: colors.darkBlue,
  },
  lebel16: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  tcbottomheading: {
    paddingBottom: 30,
    alignSelf: 'center',
  },
  textheader1: {
    color: colors.white,
    fontSize: 22,
  },
  textHeader2: {
    alignSelf: 'center',
    fontSize: 15,
    color: colors.gray,
    paddingTop: 10,
  },
  textheader3: {
    color: colors.gray,
    paddingBottom: 15,
    fontSize: 14,
    marginHorizontal: 10,
  },
  textheader4: {
    fontSize: 14,
    color: colors.black,
    marginHorizontal: 10,
  },
  textheader5: {
    fontSize: 16,
    color: colors.gray,
    marginHorizontal: 10,
  },
  para3: {
    fontSize: 12,
  },
  textheader6: {
    fontSize: 16,
    color: colors.white,


     },
  text6: {
    fontSize: 6,
  },
  text7: {
    fontSize: 7,
  },
  text8: {
    fontSize: 8,
  },
  text9: {
    fontSize: 9,
  },
  text10: {
    fontSize: 10,
  },
  text11: {
    fontSize: 11,
  },
  text12: {
    fontSize: 12,
  },
  text14: {
    fontSize: 14,
  },
  text15: {
    fontSize: 15,
  },
  text16: {
    fontSize: 16,
  },
  text18: {
    fontSize: 18,
  },
  text20: {
    fontSize: 20,
  },
  text22: {
    fontSize: 22,
  },
  text23: {
    fontSize: 23,
  },
  text24: {
    fontSize: 24,
  },
  text25: {
    fontSize: 25,
  },
  text26: {
    fontSize: 26,
  },
  text27: {
    fontSize: 27,
  },
  text30: {
    fontSize: 30,
  },
  text35: {
    fontSize: 35,
  },
  text40: {
    fontSize: 40,
  },
  white: {
    color: '#ffffff',
  },

  paraWhite: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  paraGray: {
    fontSize: 13,
    color: colors.gray,
  },
  tab: {
    fontSize: 16,
    color: colors.darkBlue,
  },
  link: {
    fontSize: 14,
    color: colors.link,
  },
  heading1: {
    fontSize: 22,
    color: colors.white,
    textAlign: 'center',
  },
  heading2: {
    fontSize: 14,
    color: colors.darkBlue,
  },
  heading2Bold: {
    fontSize: 14,
    color: colors.white,
  },
  heading3: {
    fontSize: 12,
    color: colors.white,
  },
  heading4: {
    fontSize: 12,
    color: colors.white,
  },
  heading6: {
    fontSize: 16,
    color: colors.gray5d,
  },
  dateTime: {
    fontSize: 9,
    color: colors.gray5d,
  },

  justify: {
    textAlign: 'justify',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  semibold: {
    fontWeight: '600',
  },
  regular: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
  OpenSans: {
    fontFamily: 'OpenSans',
  },
  greyVLight:{
    color: '#c7c7c7'
  }
});
