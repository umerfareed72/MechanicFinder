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
  btntext: {
    color: colors.white,
    fontWeight: '600',
  },
  text14white: {
    fontSize: 14,
    color: colors.white,
  },
  textbody: {
    fontSize: 14,

    paddingTop: 10,
    color: colors.gray,
  },
  mediumtextcontainer: {
    flex: 1.5,

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
 
 
  lebel16: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  tcbottomheading: {
    paddingBottom: 25,
    alignSelf: 'center',
  },
  
  textHeader2: {
    alignSelf: 'center',
    fontSize: 15,
    color: colors.gray,
    paddingTop: 10,
  },
 
  textbox: {
    color: colors.grayB4,
    fontSize: 14,
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

  link: {
    fontSize: 14,
    color: colors.link,
  },
  ac: {
    textAlign: 'center',
  },

  heading4Bold: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  // heading6: {
  //   fontSize: 16,
  //   color: colors.gray5d,
  // },
 
  heading7: {
    fontSize: 9,
    color: colors.grayAb,
    marginTop: 3,
  },
  // heading8white: {
  //   fontSize: 22,
  //   color: colors.purple,
  // },
  // heading8: {
  //   fontSize: 22,
  //   color: colors.white,
  // },
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
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.h1,
  },
  h1Purple: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.h1Purple,
    letterSpacing: 1.3,
  },
  h1Grey: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.h3Grey,
  },
  h2: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.h2,
   
  },
  para: {
    fontSize: 14,
    color: '#474747',
    fontWeight: '400',
  },
  listItems: {
    fontSize: 14,
    color: '#9E9E9E',
    fontWeight: '400',
  },
  textStatus: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: '#08A10D',
    borderRadius: 200,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },

  // colors
  white: {
    color: colors.white,
  },
  orange: {
    color: colors.orange,
  },
  lightGrey: {
    color: colors.lightGrey,
  },
  purple: {
    color: colors.h1Purple,
  },
  greyVLight: {
    color: '#c7c7c7',
  },
  greyRegular: {
    color: '#8B8B8B',
  },

  blackish: {
    color: colors.h3Grey,
  },

  //New Styles

  heading1: {
    fontSize: 22,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  heading1purple: {
    fontSize: 22,
    color: colors.purple,
    fontWeight: 'bold',
  },
  heading2: {
    fontWeight: '600',
    fontSize: 18,
    color: colors.purple,
  },
  heading2Gray: {
    fontSize: 16,
    fontWeight: '600', 
    color: colors.gray5d,
  },
  heading3: {
    fontWeight: '600',

    fontSize: 15,
    color: colors.inputBordercolor,
  },
  heading4: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.purple,
  },
   heading5: {
    fontSize: 12,
    color: colors.purple,
  },

  heading5white: {
    fontSize: 12,
    color: colors.white,
  },
});
