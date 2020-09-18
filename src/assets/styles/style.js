import {StyleSheet, Dimensions} from 'react-native';
const {height, WIDTH} = Dimensions.get('screen');
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import text from './text';

export default StyleSheet.create({
  // all styles here
  layoutReg: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  p0: {
    padding: 0,
  },
  m0: {
    margin: 0,
  },
  pl5: {
    paddingLeft: 5,
  },
  p5: {
    padding: 5,
  },
  p10: {
    padding: 10,
  },
  p20: {
    padding: 20,
  },
  pl10: {
    paddingLeft: 10,
  },
  pl20: {
    paddingLeft: 20,
  },
  pl30: {
    paddingLeft: 30,
  },
  pl40: {
    paddingLeft: 40,
  },
  pl15: {
    paddingLeft: 15,
  },
  pr5: {
    paddingRight: 5,
  },
  pr15: {
    paddingRight: 15,
  },
  pr20: {
    paddingRight: 20,
  },
  m5: {
    margin: 5,
  },
  m10: {
    margin: 10,
  },
  m20: {
    margin: 20,
  },
  m15: {
    margin: 15,
  },
  m25: {
    margin: 25,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mb50: {
    marginBottom: 50,
  },
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mt40: {
    marginTop: 40,
  },

  margin0: {
    margin: 0,
  },
  padding10: {
    padding: 10,
  },
  padding0: {
    padding: 0,
  },
  mv10: {
    marginVertical: 10,
  },
  mv40: {
    marginVertical: 40,
  },
  ml50: {
    marginLeft: 50,
  },
  pl60: {
    paddingLeft: 60,
  },
  picker: {
    width: WIDTH - 65,
    height: 35,

    fontSize: 40,
    paddingLeft: 20,
    backgroundColor: 'rgba(255,255,255,0.99)',
    color: 'black',
    marginHorizontal: 45,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  mh30r: {
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  mh15:{
marginHorizontal:15
  },
  mv5: {
    marginVertical: 5,
  },
  mv20: {
    marginVertical: 20,
  },
  mv30: {
    marginVertical: 30,
  },
  mr15: {
    marginRight: 15,
  },
  mr5: {
    marginRight: 5,
  },
  mr20: {
    marginRight: 20,
  },
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  pv5: {
    paddingVertical: 5,
  },
  pv20: {
    paddingVertical: 20,
  },
  pt5: {
    paddingTop: 5,
  },
  pt10: {
    paddingTop: 10,
  },
  pt15: {
    paddingTop: 15,
  },
  pt20: {
    paddingTop: 20,
  },
  pb10: {
    paddingBottom: 10,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv15: {
    paddingVertical: 15,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  ph30: {
    paddingHorizontal: 30,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh5: {
    marginHorizontal: 5,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mh25: {
    marginHorizontal: 25,
  },
  mh30: {
    marginHorizontal: 30,
  },
  mh40: {
    marginHorizontal: 40,
  },
  mh50: {
    marginHorizontal: 50,
  },
  mb15: {
    marginBottom: 15,
    marginHorizontal: 25,
  },
  mh30: {
    marginHorizontal: 30,
  },
  mb15: {
    marginBottom: 15,
  },

  //flex

  aiFlexStart: {
    alignItems: 'flex-start',
  },
  aiFlexEnd: {
    alignItems: 'flex-end',
  },
  aiCenter: {
    alignItems: 'center',
  },
  jcCenter: {
    justifyContent: 'center',
  },
  jcFlexStart: {
    justifyContent: 'flex-start',
  },
  jcFlexEnd: {
    justifyContent: 'flex-end',
  },
  jcSpaceBetween: {
    justifyContent: 'space-between',
  },
  jcSpaceEvenly: {
    justifyContent: 'space-evenly',
  },
  jcSpaceAround: {
    justifyContent: 'space-around',
  },
  asCenter: {
    alignSelf: 'center',
  },
  asFlexStart: {
    alignSelf: 'flex-start',
  },
  asFlexEnd: {
    alignSelf: 'flex-end',
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
  },
  rowBtw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dNone: {
    display: 'none',
  },
  bRadiusTheme: {
    borderRadius: 4,
  },
  bRadius50: {
    borderRadius: 50,
  },
  bRound: {
    borderRadius: 130 / 2,
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3.0,

    elevation: 6,
  },
  w100: {
    width: '100%',
  },
  w40:{
    width:'40%'
  },
  w45:{
    width:'45%'
  },
  w60:{
    width:'60%'
  },
  w50: {
    width: '50%',
  },
  border0: {
    borderWidth: 0,
  },
  borderRNone: {
    borderRightWidth: 0,
  },
  borderLNone: {
    borderLeftWidth: 0,
  },
  borderbottom: {
    borderBottomWidth: 1,
  },
  headerHeight1: {
    height: screenHeight.height45,
  },
  headerHeight2: {
    height: screenHeight.height35,
  },
  bottomborder:{
  borderBottomColor:colors.darkBlue,
  borderBottomWidth:1
  },
  headerHeight4: {
    height: screenHeight.height25,
  },
  HeaderHeight3: {
    height: screenHeight.height20 - 25,
  },

  padding2: {
    padding: 2,
  },
  padding5: {
    padding: 5,
  },
  headerStyle: {
    fontWeight: '600',
    fontSize: 22,
    paddingBottom: 10,
  },
  choiceLabelCol: {
    marginBottom: 10,

    padding: 2,
    // overflow: 'hidden',
    borderRadius: 100,
    // paddingVertical: 0,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  choiceLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontFamily: 'OpenSans-Bold',
    paddingBottom: 10,
  },

  bodycontainer: {
    height: height - screenHeight.height45 - 230,
  },
  bodycontainer2: {
    height: height - screenHeight.height35 - 180,
    backgroundColor: 'black',
  },
  bodycontainer2: {
    height: height - screenHeight.height35 - 180,
  },
  bodycontainer3: {
    height: height - screenHeight.height45 - 20,
  },
  bodycontainer4: {
    height: height - screenHeight.height65 - 60,
  },
  bodycontainer5: {
    height: height - screenHeight.height45 - 80,
  },
  bodycontainer6: {
    height: height - screenHeight.height40 - 90,
  },
  m40: {
    marginBottom: 40,
  },
  mb50: {
    marginBottom: 50,
  },
  fullheight: {
  flex:1,
  backgroundColor:colors.white
  },

  splashheight: {
    flex:1,
    backgroundColor: colors.white,

  },
  borderBottomNav:{
    height:0.5,width:'100%',backgroundColor:colors.purple,marginTop:8
  },
  bgOverlay:{
    backgroundColor:'rgba(6,8,10,0.7)',
    position:'absolute',
    top:0,
    bottom:0,right:0,left:0
  },
  dropBar:{
    borderWidth:1,
    borderColor:colors.darkBlue,
    borderRadius:8
  }
});
