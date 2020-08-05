import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import { colors, screenHeight, screenWidth, images } from '../../config/Constant';
export default StyleSheet.create({
  // all images  style here


  tiny: {
    height: 10,
    width: 10,
    resizeMode: "contain",
    alignSelf: "center"
  },

  insidebox: {
    height: 25,
    width: 20,
    resizeMode: 'contain',
    marginHorizontal: 10,
    alignSelf: "flex-end",
    marginVertical: 10,


  },
  centerimage: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  Size50: {
    height: 45,
    width: 45,
    alignSelf: "center",
    resizeMode:"stretch"

  },
  Size57: {
    height: 45,
    width: 45,
    alignSelf: "center",
    resizeMode:"stretch"

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
    marginVertical:5,
   
    
  },
  largeovalcontainer: {
    height: 150,
    width: 150,
    borderRadius: 150,
    backgroundColor: colors.lightgray,
    borderColor: colors.gray,
    justifyContent: 'center',
    marginVertical:5,
   
    
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
  attachtextimageleft: {
    flex:1,
    flexDirection:"row",
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    // paddingHorizontal: 20
  },
  attachtextimageright: {
    flex:1,
    flexDirection:"row",
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
   
  },

  drawerIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
    resizeMode: "contain"


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
    justifyContent: "center"
  },
  largeimagestyle: {
    height: 35,
    width: 45,
    alignSelf: 'center',
    justifyContent: "center"
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
  },
  InputImage: {
    marginRight: 15,
    height: 15,
    width: 24,
    resizeMode: 'contain',
  },
  username: {

    marginRight: 15,
    height: 25,

    width: 24, resizeMode: 'contain'
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
    width: screenWidth.width100 - 170,
    height: screenHeight.height13,
    borderRadius: 4,
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

  locationIcon: {
    height: 14,
    width: 10,
    resizeMode: 'contain',
  },
  locationIconSmall: {
    height: 10,
    width: 9,
    resizeMode: 'contain',
    marginRight: 5
  },
  galleryImg: {
    width: screenWidth.width100 / 2 - 10,
    height: screenHeight.height100 / 6, resizeMode: 'contain',
    marginHorizontal: 5,
    borderRadius: 4
  },
  plusImg: {
    height: 17,
    width: 17,
    resizeMode: 'contain'
  },
  savedImage: {
    width: '100%', height: screenWidth.width100 / 3
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
    marginRight:15,
    resizeMode: 'contain'
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
    resizeMode: 'contain'
  },
  drawerIconmedium: {
    height: 19,
    width: 19,
    resizeMode: 'contain'
  },
  drawerIconlarge: {
    height: 22,
    width: 22,
    resizeMode: 'contain'
  },
  backArrow: {
    width: 10,
    height: 14,
    resizeMode: 'contain'
  },
  headerBackArrow: {
    position:"absolute",
    top: 30,
    left: 10,
    padding: 10,
  },

});
