import React from 'react';
import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { ENDPOINTS } from '../../common/utilities';
import { mock } from '../../common/utilities';

import RoleSelect from './components/RoleSelect';

interface IFormData {
  role_name: string;


}

mock.onPost('/api/listings').reply(200, {
  success: true
})

// Form submit action
export async function createListingAction({ request }) {
  const formData = await request.formData();

  // copy of formData
  let body = {...Object.fromEntries(formData)};
  
  // extract fields to prevent injection
  const {role_name, } = body;

  body = {role_name} as IFormData;

  console.table(body);

  let errors = {};

  // Post form response to axios
  try {
    const createListingResponse = await axios.post(
      "/api/listings",
      body,
    )
    return true;
  }
  catch (responseErr) {
    console.log(responseErr.message);
    return responseErr;
  }

}

export default function ListingForm() {
  const [formData, setformData] = useState({
    role_name: ""

  })

  const [filterString, setFilterString] = useState("");
  const [selectedRole, setSelectedRole] = useState({
    role_name: "",
    role_desc: "No role selected."
  }); 

  return (
    <>
      <h3>Create Listing</h3>

      <Form action="/listings/new" method="post">
        <RoleSelect
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        // formData={formData}
        // setRoleName={setformData}
        />
        


        <input type="submit" className="btn btn-primary" value="Submit" />

      </Form>
    </>
  )
}


