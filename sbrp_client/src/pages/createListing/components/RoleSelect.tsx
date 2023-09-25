import { useState, useEffect } from 'react';

import { ENDPOINTS } from '../../../common/utilities';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

// Type Definitions ||
type Role = {
  role_name: string;
  role_desc: string;
} | {}

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

const mock = new MockAdapter(axios);
mock.onGet(ENDPOINTS.roles).reply(200, fakeData)

// Data Fetching ||
function fetchRoles(): Promise<any> {
  return axios.get(ENDPOINTS.roles)
}

// Component ||
export default function RoleSelect({ filterString }) {
  const [data, setData] = useState<Role[] | []>([]);
  const [selectedRole, setSelectedRole] = useState<Role>({});

  useEffect(() => {
    fetchRoles()
      .then((response) => {
        setData(response.data.roles);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // 
  function onSelectChange(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    // Set selected role state to selected option
    setSelectedRole({
      role_name: event.target.value,
      role_desc: selectedOption.getAttribute("data-desc")
    })
  }

  return (
    <>
      <select
        name="role_name"
        id="role_name"
        className='form-control'
        onChange={event => { onSelectChange(event) }}
        defaultValue="Select Role">

        <option value="Select Role" disabled></option>

        {data && data
        // Filter by string
        .filter((role) => role.role_name.toLowerCase().includes(filterString))
        // iterate filtered data
        .map((role) => (
          <option key={role.role_name} value={role.role_name} data-desc={role.role_desc}>
            {role.role_name}
          </option>
        )
        )}

      </select>

      <p>{selectedRole.role_desc}</p>

    </>
  )
}
