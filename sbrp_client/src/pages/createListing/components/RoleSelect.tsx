import React from 'react';
import { useState, useEffect } from 'react';
import Select, {components} from 'react-select';
// import { defaultProps } from 'react-select/dist/declarations/src/Select';

import { ENDPOINTS } from '../../../common/utilities';

import axios from 'axios';
import { mock } from '../../../common/utilities';

import { RoleDesc } from './RoleDesc';
// Type Definitions ||
type Role = {
  role_name: string;
  role_desc: string;
};

type Data = {
  roles: Role[];
}

// Testing Mock
const fakeData: Data = {
  roles: [
    {
      role_name: "Manager",
      role_desc: "Administrator role with full access"
    },
    {
      role_name: "Engineer",
      role_desc: "Standard user role with limited access"
    },
    {
      role_name: "Designer",
      role_desc: "Role responsible for creating visual designs"
    },
    {
      role_name: "Developer",
      role_desc: "Role responsible for coding and implementing features"
    },
    {
      role_name: "Tester",
      role_desc: "Role responsible for testing and quality assurance"
    },
    {
      role_name: "Support",
      role_desc: "Role responsible for providing customer support"
    },
    {
      role_name: "Analyst",
      role_desc: "Role responsible for analyzing data and making recommendations"
    }
  ]
}

mock.onGet(ENDPOINTS.roles).reply(200, fakeData)

// Data Fetching ||
function fetchRoles(): Promise<Role[]> {
  return axios.get(ENDPOINTS.roles)
    .then(response => response.data.roles);
}

// Component ||
export default function RoleSelect({ selectedRole, setSelectedRole }) {
  const [data, setData] = useState<Role[] | []>([]);

  // Fetch roles upon component mount
  useEffect(() => {
    fetchRoles()
      .then((roles) => {
        setData(roles);
        console.table(roles)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const customOption = (props) => {
    const {data, label} = props;
    return (
      <components.Option
        {...props}
        data-desc={data.role_desc}>
        {label}
      </components.Option>
    )
  }

  return (
    <>
      {data &&
        <Select
        className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        placeholder="Select Role..."
        name="role_name"
        id="role_name"
        options={data}
        getOptionLabel={role => role.role_name}
        getOptionValue={role => role.role_name}
        components={{ Option: customOption }}
        onChange={value => setSelectedRole(value)}
        />}

      <RoleDesc selectedRole={selectedRole} />
    </>
  )
}
