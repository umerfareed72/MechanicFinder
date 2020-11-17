import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
import text from './text';

export default StyleSheet.create({
  Headre1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  smallbox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: colors.lightblue,
    marginHorizontal: 40,
  },
  safeContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  chatcontainerleft: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  chatcontainerright: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  editbordercontainer: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.5,
    marginVertical: 1,
  },

  ObjectAlign: {
    alignSelf: 'center',
    paddingBottom: 10,
  },
  CalanderbodyContainer: {
    height: height - screenHeight.height40 - 15,
  },
  safeAreaHeight: {
    backgroundColor: '#fff',
    height: screenHeight.height100,
  },
  bodyTop: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    marginVertical: 10,
  },
  headingLayout: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bodyContainerLayout: {
    paddingLeft: 20,
    paddingVertical: 20,
  },
  bodyHeight20: {
    height: screenHeight.height100 - screenHeight.height20 + 15,
  },
  bodyHeight30: {
    height: screenHeight.height100 - screenHeight.height30 + 15,
  },
  bodyHeight35: {
    height: screenHeight.height100 - screenHeight.height35 + 15,
  },
  bodyHeight45: {
    height: screenHeight.height100 - screenHeight.height45 + 15,
  },

  bodyHeight60: {
    height: screenHeight.height100 - screenHeight.height60 + 15,
  },
  bodyHeight50: {
    height: screenHeight.height100 - screenHeight.height50 + 15,
  },
  bodyBg: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -15,
  },
  inputTheme1: {
    color: colors.white,
    marginRight: 10,
  },
  rowBtw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowEven: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBg: {
    borderRadius: 20,
    height: 40,
    width: screenWidth.width100 - 50,
    alignSelf: 'center',
    backgroundColor: colors.fadewhite,
  },
  headInner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  popularInnerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10,
  },
  slotCard: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 10,
    // width: screenWidth.width100/3-20,
    shadowColor: colors.shadowColor,
    marginHorizontal: 1,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
    elevation: 6,
  },

  bodyLayout: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  bottomBorder: {
    width: '100%',
    height: 1,
    backgroundColor: colors.shadowColor,
  },

  bodyShadowTop: {
    shadowColor: colors.shadowColor,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
    elevation: 3,
  },
  colRight: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderColor: colors.grayd7,
    borderWidth: 1,
  },
  colCenter: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  colLeft: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderWidth: 1,
    borderColor: colors.grayd7,
  },
  bookingShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  bodyShadowBottom: {
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
    elevation: 6,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  listImg: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    resizeMode: 'cover',
  },
  dNone: {
    display: 'none',
  },
  dFlex: {
    display: 'flex',
  },
  CalenderContainer: {
    marginVertical: 10,
    paddingVertical: 10,
    borderTopColor: colors.gray,
    borderTopWidth: 0.2,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.2,
  },
  borderContainer: {
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.2,
  },
  DiscoverHeaderHeight: {
    height: screenHeight.height20 - 25,
  },

  safeAreaHeight: {
    backgroundColor: '#fff',
    height: screenHeight.height100,
  },

  bodyContainerLayout: {
    paddingLeft: 20,
    paddingVertical: 20,
  },
  bodyHeight35: {
    height: screenHeight.height100 - screenHeight.height35 + 15,
  },
  bodyHeight60: {
    height: screenHeight.height100 - screenHeight.height60 + 15,
  },
  bodyBg: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -15,
  },

  rowJustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBg: {
    borderRadius: 20,
    height: 40,
    width: screenWidth.width100 - 50,
    alignSelf: 'center',
    backgroundColor: colors.fadewhite,
  },
  headInner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 15,
  },
  popularInnerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10,
  },
  categoryLayer: {
    height: screenHeight.height13 / 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    backgroundColor: colors.lightblue,
  },
  categoryLayer2: {
    height: screenHeight.height13 / 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.lightblue,
  },
  saveImgHMargin: {
    marginLeft: 10,
    marginRight: 5,
  },
  modalBg: {
    backgroundColor: colors.white,
    width: screenWidth.width100 / 2 + 30,
    alignContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 4,
  },
  textareaBorder: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.grayd7,
    paddingHorizontal: 5,
  },
  tickCenter: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  smallWidth: {
    flexDirection: 'row',
    width: screenWidth.width100 / 5,
    alignItems: 'center',
  },
  BookingsmallWidth: {
    flexDirection: 'row',
    width: screenWidth.width65 / 3,
    alignItems: 'center',
  },
  curvedContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -15,
    borderRadius: 15,
  },
  overviewStarsContainer: {
    backgroundColor: colors.white,
    width: 120,
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: 5,
  },
  //Big Crads
  bigdashboardCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 6,
    width: screenWidth.width100 / 2.2 - 20,
    shadowColor: colors.shadowColor,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
    elevation: 6,
  },
  DashboardslotCard: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    shadowColor: colors.shadowColor,
    marginHorizontal: 25,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.0,
    elevation: 1,
  },
});
