import { useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Takes in two objects, one for search params, and one for validatorObj
// returns object with each param in validate, and boolean if test passed
// only false if validator exists and validator failed

export const ENDPOINTS = {
    roles: "/api/roles",
    listings: "/api/listings"
}

export const mock = new MockAdapter(axios);

export function validateAll(params, validatorObj){

    let areValid = {};

    for (let key in params) {
        // Default is valid
        areValid[key] = true;

        // if validatorFn exists, value in areValid is based on validation
        if (key in validatorObj){
            let value = params[key];
            let validatorFn = validatorObj[key]
            areValid[key] = validatorFn(value);
        }
    }
    return areValid;
}

// TEST
// let params = {
//     email: "sean@.com",
//     number: "9150a089",
//     address: "hello"
// };

// let validateArr = {
//     email: input => input.includes("@"),
//     number: input => input.match(/^[0-9]+$/) ? true : false
// }

// console.log(validateAll(params, validateArr));
