import React from 'react';
import { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
// import { defaultProps } from 'react-select/dist/declarations/src/Select';

import { ENDPOINTS } from '../../../common/utilities';

import axios from 'axios';
import { mock } from '../../../common/utilities';

// Type Definitions ||
import type { Role } from '../ListingForm';

type Data = {
  roles: Role[];
}

// Testing Mock
const fakeData: Data = {
  roles: [
    {
      role_name: "Manager",
      role_desc: "Administrator role with full access",
      role_skills: ["Skill1", "Skill2", "Skill3"]
    },
    {
      role_name: "Engineer",
      role_desc: "Standard user role with limited access",
      role_skills: ["JavaScript", "HTML", "CSS"]
    },
    {
      role_name: "Designer",
      role_desc: "Role responsible for creating visual designs",
      role_skills: ["Photoshop", "Illustrator", "UI/UX"]
    },
    {
      role_name: "Developer",
      role_desc: "Role responsible for coding and implementing features",
      role_skills: ["JavaScript", "React", "Node.js"]
    },
    {
      role_name: "Tester",
      role_desc: "Role responsible for testing and quality assurance",
      role_skills: ["Manual Testing", "Automated Testing", "Bug Tracking"]
    },
    {
      role_name: "Support",
      role_desc: "Role responsible for providing customer support",
      role_skills: ["Communication", "Problem Solving", "Empathy"]
    },
    {
      role_name: "Analyst",
      role_desc: "Role responsible for analyzing data and making recommendations",
      role_skills: ["Data Analysis", "Statistics", "Data Visualization"]
    }
  ]
}

mock.onGet(ENDPOINTS.roles).reply(200, fakeData)

// Data Fetching ||


// Component ||
export default function RoleSelect({ selectedRole, setSelectedRole, roleData }) {
  // Fetch roles upon component mount
  // useEffect(() => {
  //   fetchRoles()
  //     .then((roles) => {
  //       setRoleData(roles);
  //       console.table(roles)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  // const customOption = (props) => {
  //   const { data, label } = props;
  //   return (
  //     <components.Option
  //       {...props}
  //       >
  //       {label}
  //     </components.Option>
  //   )
  // }

  return (
    <>
      {roleData &&
        <Select
          className="basic-single"
          classNamePrefix="select"
          isSearchable={true}
          placeholder="Select Role..."
          name="role_name"
          id="role_name"
          options={roleData}
          getOptionLabel={role => role.role_name}
          getOptionValue={role => role.role_name}
          // components={{ Option: customOption }}
          onChange={value => {
            setSelectedRole(value)
          }}
          required
        />}

      {/* <label className="form-text">Filter roles by typing...</label> */}


    </>
  )
}
