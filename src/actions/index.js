import axios from 'axios';
import {URL} from '../config/Constant';
import {Set_CurrentUser} from '../actions/Types';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

export function logout() {
  return (dispatch) => {
    AsyncStorage.removeItem('googleData');
    AsyncStorage.removeItem('usertoken');
    dispatch(set_CurrentUser({}));
   
  };
}

export function set_CurrentUser(user) {
  return {
    type: Set_CurrentUser,
    user,
  };
}

export function userlogin(data) {
  return (dispatch) => {
    return axios.post(URL.Url + 'usersignin', data).then((res) => {
      console.log(jwt(res.data.token), 'uerdata');
      const token = res.data.token;
      AsyncStorage.setItem('usertoken', token);
      dispatch(set_CurrentUser(jwt(token)));
    });
  };
}

export function mechaniclogin(data) {
  return (dispatch) => {
    return axios.post(URL.Url + 'mechanicsignin', data).then((res) => {
      console.log(jwt(res.data.token), 'userdata');
      const token = res.data.token;
      AsyncStorage.setItem('usertoken', token);
      dispatch(set_CurrentUser(jwt(token)));
    });
  };
}
