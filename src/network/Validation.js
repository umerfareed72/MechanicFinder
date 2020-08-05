
import React, { Component } from 'react';
async function required(params) {
    var isValid = true;
    Object.keys(params).map((key) => {
        if (params[key] == '') {
            isValid = false;
        }
    });
    return isValid;
}
export { required };