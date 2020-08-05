import React from 'react';
import {AsyncStorage} from 'react-native';
//import CookieManager from 'react-native-cookies';

async function verifySession() {
  let userSession = await AsyncStorage.getItem('user');
  let nav = 'Login';
  console.log(nav);
  if (userSession != null) {
    nav = 'Dashboard';
  }
  return nav;
}

async function getSession() {
  let userSession = await AsyncStorage.getItem('user');
  let user = JSON.parse(userSession);
  return user;
}
async function logout() {
  let userSession = await AsyncStorage.getItem('user');
  let nav = 'Login';
  console.log(nav);
  if (userSession != null) {
    nav = 'Login';
  }
  await AsyncStorage.removeItem('user');
  return true;
}

{/*async function logout() {
  CookieManager.clearAll().then(res => {
    console.log('CookieManager.clearAll =>', res);
  });
  await AsyncStorage.removeItem('user');
  return true;
}*/}

export {verifySession};
export {getSession};
export {logout};
