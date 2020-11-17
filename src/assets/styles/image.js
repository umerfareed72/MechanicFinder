import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');
import {colors, screenHeight, screenWidth, images} from '../../config/Constant';
export default StyleSheet.create({
  //All Sizes
  tiny: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  xsmall: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  small: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },
  medium: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  large: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  // all images  style here

  backArrow2: {
    width: 20,
    height: 25,
    top: 5,
    resizeMode: 'contain',
  },
  forward: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },

  userImg: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 130 / 2,
  },
  imageCard: {
    width: screenWidth.width50 - 20,
    margin: 10,
  },

  insidebox: {
    height: 25,
    width: 20,
    resizeMode: 'contain',
    marginHorizontal: 10,
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  centerimage: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  Size50: {
    height: 45,
    width: 45,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  Image30:{
    height:30,width:30,borderRadius:30,resizeMode:'cover'
  },
  image35:{
    height:35,
    width:35,
    resizeMode:"contain",
    borderRadius:13


  },
  Size57: {
    height: 45,
    width: 45,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  smallovalcontainer: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: colors.darkBlue,

    marginLeft: 10,
    borderColor: colors.white,
    justifyContent: 'center',
  },
  ovalcontainer: {
    height: 90,
    width: 90,
    borderRadius: 90,
    backgroundColor: colors.lightgray,
    borderColor: colors.gray,
    justifyContent: 'center',
    marginVertical: 5,
  },
  largeovalcontainer: {
    height: 150,
    width: 150,
    borderRadius: 150,
    backgroundColor: colors.lightgray,
    borderColor: colors.gray,
    justifyContent: 'center',
    marginVertical: 5,
  },
  largeovalcontainerupload: {
    height: 150,
    width: 150,
    borderRadius: 150,
    backgroundColor: colors.lightgray,
    borderColor: colors.gray,
    justifyContent: 'center',
  },
  ovalcontainerupload: {
    height: 90,
    width: 90,
    borderRadius: 90,
    backgroundColor: colors.lightgray,
    borderColor: colors.gray,
    justifyContent: 'center',
  },
  mediumovalcontainerupload: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: colors.lightgray,
    borderColor: colors.gray,
    justifyContent: 'center',
  },

  attachtextimageleft: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    // paddingHorizontal: 20
  },
  attachtextimageright: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconAdd: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.0,
    elevation: 6,
  },
  drawerIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  smallimagestyle: {
    height: 18,
    width: 18,
    marginRight: 10,
    resizeMode: 'contain',
  },
  mediumimagestyle: {
    height: 26,
    width: 33,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  largeimagestyle: {
    height: 35,
    width: 45,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  leftimage: {
    height: 13,
    width: 7,
    left: -10,
  },
  rightimage: {
    height: 13,
    width: 7,
    right: -10,
  },
  splashImg: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  InputImage: {
    marginRight: 15,
    height: 15,
    width: 24,
    tintColor: colors.black2B,
    resizeMode: 'contain',
  },
  dashboardImg: {
    width: '100%',
    height: screenWidth.width35 - 25,

    borderRadius: 15,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
    elevation: 6,

    resizeMode: 'cover',
    justifyContent: 'space-evenly',
  },
  dashboardCard2: {
    width: screenWidth.width45 - 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },

  username: {
    marginRight: 15,
    height: 25,
    width: 24,
    tintColor: colors.black2B,
    resizeMode: 'contain',
  },
  searchIcon: {
    height: 18,
    width: 20,
    resizeMode: 'contain',
    marginHorizontal: 15,
  },

  homeImgLarge: {
    width: screenWidth.width100 - 80,
    height: screenHeight.height25,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  homeCategoryImg: {
    marginHorizontal: 20,
    height: screenHeight.height20,
    borderRadius: 10,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  homerecommendImg: {
    width: screenWidth.width100 - 150,
    height: screenHeight.height20,
    borderRadius: 4,
    resizeMode: 'contain',
    justifyContent: 'center',
  },

  locationIconSmall: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  galleryImg: {
    width: screenWidth.width100 / 2 - 12,
    height: screenHeight.height100 / 6,
    resizeMode: 'contain',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  plusImg: {
    height: 17,
    width: 17,
    resizeMode: 'contain',
  },
  savedImage: {
    width: '100%',
    height: screenWidth.width100 / 3,
  },
  crossImg: {
    position: 'absolute',
    right: 0,
    top: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor:'red',
  },
  emailIcon: {
    width: 20,
    height: 13,
    marginRight: 15,
    resizeMode: 'contain',
  },
  circleTick: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  clockIcon: {
    width: 18,
    height: 15,
    resizeMode: 'contain',
    // marginRight:2,
  },
  drawerIconsmall: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  icon40: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  drawerIconmedium: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
  },
  drawerIconlarge: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  backArrow: {
    width: 10,
    height: 14,
    resizeMode: 'contain',
  },
  headerBackArrow: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },

  storeImg: {
    // height:"80%",
    width: '100%',
    height: screenWidth.width45 - 30,

    borderRadius: 4,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
  },
  //Mechanic Side Styling
  boxContainer: {
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.lightgray,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderWidth: 5,
    borderColor: colors.darkyellow,
  },
  //tin colors
  Orange: {
    tintColor: colors.orange,
  },
});
