import axios from "axios";
import { URL } from "../Config/Contants";
import SetAuthorizationtoken from "../Config/SetAututhorizationtoken";
import { Set_CurrentUser, google_Login, Set_Rate } from "../actions/Types";
import jwt from "jsonwebtoken";

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("usertoken");
    SetAuthorizationtoken(false);
    dispatch(set_CurrentUser({}));
  };
}

export function set_CurrentUser(user) {
  return {
    type: Set_CurrentUser,
    user,
  };
}

export function login(data) {
  return (dispatch) => {
    return axios.post(URL.Url + "mechanicsignin", data).then((res) => {
      if (res.data.message === "blocked") {
      } else {
        const token = res.data.token;
        localStorage.setItem("usertoken", token);
        SetAuthorizationtoken(token);
        dispatch(set_CurrentUser(jwt.decode(token)));
      }
    });
  };
}

export function userlogin(data) {
  return (dispatch) => {
    return axios.post(URL.Url + "usersignin", data).then((res) => {
      const token = res.data.token;
      localStorage.setItem("usertoken", token);
      SetAuthorizationtoken(token);
      dispatch(set_CurrentUser(jwt.decode(token)));
    });
  };
}

export function adminlogin(data) {
  return (dispatch) => {
    return axios.post(URL.Url + "adminsignin", data).then((res) => {
      const token = res.data.atoken;
      localStorage.setItem("usertoken", token);
      SetAuthorizationtoken(token);
      console.log(res.data);
      dispatch(set_CurrentUser(jwt.decode(token)));
    });
  };
}

export function googlelogin(data) {
  console.log(data);
  return {
    type: google_Login,
    data,
    flag: true,
  };
}

export function SetRate(users) {
  console.log(users);
  return {
    type: Set_Rate,
    users,
  };
}
