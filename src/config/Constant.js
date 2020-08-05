import {Dimensions} from 'react-native';
import React, {Component} from 'react';

//Size

export const screenHeight = {
  height5: Math.round((5 / 100) * Dimensions.get('window').height),

  height10: Math.round((10 / 100) * Dimensions.get('window').height),
  height13: Math.round((13 / 100) * Dimensions.get('window').height),
  height20: Math.round((20 / 100) * Dimensions.get('window').height),
  height25: Math.round((25 / 100) * Dimensions.get('window').height),
  height30: Math.round((30 / 100) * Dimensions.get('window').height),
  height35: Math.round((35 / 100) * Dimensions.get('window').height),
  height40: Math.round((40 / 100) * Dimensions.get('window').height),
  height45: Math.round((45 / 100) * Dimensions.get('window').height),

  height50: Math.round((50 / 100) * Dimensions.get('window').height),

  height55: Math.round((55 / 100) * Dimensions.get('window').height),

  height60: Math.round((60 / 100) * Dimensions.get('window').height),
  height65: Math.round((65 / 100) * Dimensions.get('window').height),
  height70: Math.round((70 / 100) * Dimensions.get('window').height),
  height75: Math.round((75 / 100) * Dimensions.get('window').height),
  height80: Math.round((80 / 100) * Dimensions.get('window').height),
  height100: Math.round(Dimensions.get('window').height),
};

export const screenWidth = {
  width100: Math.round(Dimensions.get('window').width),
  width50: Math.round((50 / 100) * Dimensions.get('window').width),
  width45: Math.round((45 / 100) * Dimensions.get('window').width),
  width40: Math.round((40 / 100) * Dimensions.get('window').width),
  width35: Math.round((35 / 100) * Dimensions.get('window').width),
  width25: Math.round((25 / 100) * Dimensions.get('window').width),
  width20: Math.round((20 / 100) * Dimensions.get('window').width),
  width65: Math.round((65 / 100) * Dimensions.get('window').width),
};

//colors
export const colors = {
  orange: '#F59E52',
  whiteLayer: 'rgba(255, 255, 255, 0.2)',
  orablu: ['#F59E52', '#482C6D'],
  orangeGradient: ['#F59E52', '#DB883F'],
  inboxBarInActive: ['#fff', '#fff'],
  inboxBarActive: ['#6B379D', '#2B2F92'],
  inputBordercolor: '#9B9B9B',
  darkBlue: '#321755',
  purple: '#381C5C',
  white: '#FFFFFF',
  shadowColor: '#707070',
  gray: '#9B9B9B',
  link: 'rgba(57,62,70,0.6)',
  gray5d: '#5d5d5d',
  link: 'rgba(57,62,70,0.6)',
  fadewhite: 'rgba(255,255,255,0.3)',
  dullBlack: 'rgba(0,0,0,0.4)',
  darkyellow: '#F59E52',
  black: 'black',
  lightblue: '#0C233C',
  Black323: '#323643',
  gray666: '#676666',
  black2B: '#2B2B2B',
  lightgray: '#F5F5F5',
  grayd7: '#d7d7d7',
};

//Images
export const images = {
  // local1: require('../assets/images/other/local1.jpg'),
  logoDark: require('../assets/images/logoDark.png'),
  email: require('../assets/images/mail.png'),
  key: require('..//assets/images/key.png'),
  camera: require('../assets/images/photo-camera.png'),
  timing: require('../assets/images/clock.png'),
  lock: require('../assets/images/clock.png'),
  dollar: require('../assets/images/dollar.png'),
  plus: require('../assets/images/plus.png'),
  camerdark: require('../assets/images/cameradark.png'),
  leftarrow: require('../assets/images/left-arrow.png'),
  LegalPaper: require('../assets/images/legal-paper.png'),
  logoSmall: require('../assets/images/logo-small.png'),
  logout: require('../assets/images/logout.png'),
  HomeImg: require('../assets/images/other/HomeImg.png'),
  HomeImg2: require('../assets/images/other/HomeImg2.png'),
  category1: require('../assets/images/other/category1.png'),
  category2: require('../assets/images/other/category2.png'),

  arrowright: require('../assets/images/arrow-right.png'),
  mic: require('../assets/images/mic.png'),
  percent: require('../assets/images/percent.png'),
  picture: require('../assets/images/picture.png'),
  location: require('../assets/images/location.png'),
  setting: require('../assets/images/settings.png'),
  success: require('../assets/images/success.png'),
  serach: require('../assets/images/search.png'),
  beef: require('../assets/images/other/beef-cooked-cuisine-1268549.png'),
  leftarrow: require('../assets/images/left-arrow.png'),
  rightarrow: require('../assets/images/right-arrow.png'),
  qrCode: require('../assets/images/qr-code.png'),
  cross: require('../assets/images/cross.png'),
  circleTick: require('../assets/images/circleTick.png'),
  username: require('../assets/images/username.png'),
  clock: require('../assets/images/clock.png'),
  Subject:require('../assets/images/subject.png'),
  Question:require('../assets/images/question.png'),
  
  calendar: require('../assets/images/calendar.png'),
  user: require('../assets/images/user.png'),
  member: require('../assets/images/other/Group.png'),
  support: require('../assets/images/support.png'),
  saved: require('../assets/images/bookmark.png'),
  searchBottom: require('../assets/images/searchBottom.png'),
  backArrow: require('../assets/images/backArrow.png'),
  date: require('../assets/images/calendarOrange.png'),
};
