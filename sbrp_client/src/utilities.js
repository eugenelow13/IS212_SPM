import { useState, useEffect } from 'react';
import axios from 'axios';

// Takes in two objects, one for search params, and one for validatorObj
// returns object with each param in validate, and boolean if test passed
// only false if validator exists and validator failed

function validateAll(params, validatorObj){

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

async function fetchData(url, params, validatorObj){
    // validatorObj takes in 

    return await axios.get(url, {params:params})
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
