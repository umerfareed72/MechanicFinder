import React, {Component} from 'react';
import {url} from './Routes';
import {AsyncStorage} from 'react-native';

export async function login(params) {
  var link = url.base + url.login;
  try {
    console.warn('------------------:', params);
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    let responseJson = await response.json();
    console.log('RESPONSE :', responseJson);
    return responseJson;
  } catch (error) {
    console.log('error:', error);
  }
}


export async function signup(params) {
  var link = url.base + url.signup;
  try {
    console.warn('------------------:', params);
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    let responseJson = await response.json();
    console.log('RESPONSE :', responseJson);
    return responseJson;
  } catch (error) {
    console.log('error:', error);
  }
}

export async function forgotPassword(params) {
  var link = url.base + url.forgotPassword;
  try {
    console.warn('------------------:', params);
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    let responseJson = await response.json();
    console.log('RESPONSE :', responseJson);
    return responseJson;
  } catch (error) {
    console.log('error:', error);
  }
}


export async function Logout(params) {
  var link = url.base + url.Logout;
  try {
    console.warn('------------------:', params);
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    let responseJson = await response.json();
    console.log('RESPONSE :', responseJson);
    return responseJson;
  } catch (error) {
    console.log('error:', error);
  }
}


//get all courses
export async function getAllCourses(params) {
  var link = url.base + url.getAllCourses;
  // console.warn(params);
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    // console.warn(response);
    var responseJson = await response.json();
    return responseJson;
  } catch (response) {
    console.log('error:', response.message);
  }
}

//course detail
export async function getAllLocalUpdate(params) {
  var link = url.base + url.getAllLocalUpdate;
  // console.warn(params);
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    // console.warn(response);
    var responseJson = await response.json();
    return responseJson;
  } catch (response) {
    console.log('error:', response.message);
  }
}


//update Profile
//update service provider profile
export async function updateProfile(params) {
  var link = url.base + url.updateProfile;
  let formData = new FormData();

  //image
  if (params.image != '') {
    let localUri = decodeURIComponent(params.image);
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);

    let type = match ? `image/${match[1]}` : `image`;
    formData.append(
      'image',
      typeof {uri: localUri, name: filename, type} != 'undefined'
        ? {uri: localUri, name: filename, type}
        : 0,
    );
  }
  //end

  formData.append('userId', params.userId);
  formData.append('email', params.email);
  formData.append('firstName', params.firstName);
  formData.append('lastName', params.lastName);
  formData.append('sessionId', params.sessionId);

  console.warn(formData);
  try {
    let response = await fetch(link, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    console.warn(response);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}


//chnge Passsword
export async function changePassword(params) {
  var link = url.base + url.updateProfile;
  // console.warn(params);
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    // console.warn(response);
    var responseJson = await response.json();
    return responseJson;
  } catch (response) {
    console.log('error:', response.message);
  }
}

