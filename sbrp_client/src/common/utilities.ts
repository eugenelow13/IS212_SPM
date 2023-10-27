import { useState, useEffect } from 'react';

import { useNavigation } from 'react-router-dom';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import moment from 'moment';

// Takes in two objects, one for search params, and one for validatorObj
// returns object with each param in validate, and boolean if test passed
// only false if validator exists and validator failed

export const ENDPOINTS = {
    roles: "/api/roles/",
    listings: "/api/listings",
    openListings: "/api/listings?open=true",
    staffs: "/api/staffs",
    managers: "/api/staffs?role=manager",
    applications: "/api/applications"
}

// export const mock = new MockAdapter(axios, { delayResponse: 1000 });
export const mock = null;

export function validateAll(params, validatorObj) {

    let areValid = {};

    for (let key in params) {
        // Default is valid
        areValid[key] = true;

        // if validatorFn exists, value in areValid is based on validation
        if (key in validatorObj) {
            let value = params[key];
            let validatorFn = validatorObj[key]
            areValid[key] = validatorFn(value); o
        }
    }
    return areValid;
}

export function useNow() {
    const [now, setNow] = useState(moment());
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(moment())
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return now;
}

export function useIsLoading() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "submitting"

    return isLoading;
}

// function for fetching data and setting to State variable
export function useFetchedData({ fetchFn, setState }) {
    useEffect(() => {
        fetchFn()
            .then((data) => {
                setState(data);
                // console.table(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
}

export function useFetchedDataWithParams({ fetchFn, setState, params }) {
    useEffect(() => {
        fetchFn(params)
            .then((data) => {
                console.log("data",data);
                setState(data);
                // console.table(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
}

function fetchFnFactory(url) {
    return () => {
        // append params to url using urlSearchParams
        return axios.get(url)
            .then(response => response.data.staffs);
    }
}

export const fetchStaffs = fetchFnFactory(ENDPOINTS.staffs)
export const fetchManagers = fetchFnFactory(ENDPOINTS.managers)
export const fetchApplications = fetchFnFactory(ENDPOINTS.applications)

export function getRoleSkillMatchNo(roleSkills, currentSkills) {
    const roleSkillsSet = new Set([...roleSkills]);
    const matchingSkills = getAcquiredSkills(currentSkills, roleSkills);
    return (matchingSkills.length / roleSkillsSet.size * 100).toFixed(0);
}

export function getAcquiredSkills(currentSkills, roleSkills) {
    const roleSkillsSet = new Set([...roleSkills]);
    const matchingSkills = currentSkills.filter(skill => roleSkillsSet.has(skill));
    return matchingSkills;
}

export function getLackingSkills(currentSkills, roleSkills) {
    const roleSkillsSet = new Set([...roleSkills]);
    const lackingSkills = currentSkills.filter(skill => !roleSkillsSet.has(skill));
    return lackingSkills;
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
