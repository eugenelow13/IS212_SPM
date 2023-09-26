import React from 'react';
import { useState, useEffect } from 'react';

import { ENDPOINTS } from '../../../common/utilities';

import axios from 'axios';
import { mock } from '../../../common/utilities';

import { Card } from 'react-bootstrap';

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
export default function RoleSelect({ filterString }) {
  const [data, setData] = useState<Role[] | []>([]);
  const [selectedRole, setSelectedRole] = useState<Role>({
    role_name: "",
    role_desc: "No role selected."
  });

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

  // Ensure selectedRole changes when filterString applied
  useEffect(() => {
    const select = document.querySelector("#role_name") as HTMLSelectElement
    // Update Selected Option
    updateSelect(select);
  }, [filterString])

  function updateSelect(target) {
    const selectedOption = target.options[target.selectedIndex];

    // Set selected role state to selected option
    setSelectedRole({
      role_name: target.value,
      role_desc: selectedOption.getAttribute("data-desc") ?? "No role selected."
    })
  }

  return (
    <>
      <select
        name="role_name"
        id="role_name"
        className='form-control'
        onChange={event => { updateSelect(event.target) }}
        defaultValue="Select Role">

        <option value="Select Role" disabled>Select Role</option>

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


      <Card className="my-3">
        <Card.Header>Description</Card.Header>
        <Card.Body>
          <Card.Title>{selectedRole.role_name}</Card.Title>
          <Card.Text>
            {selectedRole.role_desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
