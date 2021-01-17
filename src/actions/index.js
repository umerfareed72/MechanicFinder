import axios from 'axios';
import { URL } from '../config/Constant';
import { Set_CurrentUser } from '../actions/Types';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid } from "react-native"

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
export function adminlogin(data) {
  return (dispatch) => {
    return axios.post(URL.Url + "adminsignin", data).then((res) => {
      const token = res.data.atoken;
      AsyncStorage.setItem("usertoken", token);
      dispatch(set_CurrentUser(jwt(token)));
      console.log(jwt(token))
    });
  };
}

export function userlogin(data) {
  return (dispatch) => {
    return axios.post(URL.Url + 'usersignin', data).then((res) => {
      if (res.data.message === "blocked") {
        dispatch(set_CurrentUser(res.data))
        ToastAndroid.show(
          'Blocked By Admin',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      } else if (res.data.message == "new") {
        dispatch(set_CurrentUser(res.data))
        ToastAndroid.show(
          'Please Verify Your Email',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      }
      else {
        console.log(jwt(res.data.token), 'uerdata');
        const token = res.data.token;
        AsyncStorage.setItem('usertoken', token);
        dispatch(set_CurrentUser(jwt(token)));
        ToastAndroid.show(
          'Successfully Login',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      }
    });
  };
}

export function mechaniclogin(data) {
  return (dispatch) => {
    return axios.post(URL.Url + 'mechanicsignin', data).then((res) => {
      if (res.data.message === "blocked") {
        dispatch(set_CurrentUser(res.data))
        ToastAndroid.show(
          'Blocked By Admin',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      } else if (res.data.message == "new") {
        dispatch(set_CurrentUser(res.data))
        ToastAndroid.show(
          'Please Verify Your Email',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      } else {
        const token = res.data.token;
        AsyncStorage.setItem('usertoken', token);
        dispatch(set_CurrentUser(jwt(token)));
        ToastAndroid.show(
          'Successfully Login',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      }
    });
  };
}
