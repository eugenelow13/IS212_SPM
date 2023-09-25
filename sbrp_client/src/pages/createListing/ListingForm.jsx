import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RoleSelect from './components/RoleSelect';
import { ENDPOINTS } from '../../common/utilities';

// Form submit action
// Dummy data generated with GPT 3.5
let data = {
  staff: [
    {
      staff_id: '123',
      staff_fname: 'john',
      staff_lname: 'doe',
      dept: 'engineering',
      country: 'usa',
      email: 'john.doe@example.com',
      access_role: 'admin'
    },
    {
      staff_id: '456',
      staff_fname: 'jane',
      staff_lname: 'smith',
      dept: 'marketing',
      country: 'canada',
      email: 'jane.smith@example.com',
      access_role: 'user'
    },
    {
      staff_id: '789',
      staff_fname: 'alex',
      staff_lname: 'brown',
      dept: 'finance',
      country: 'uk',
      email: 'alex.brown@example.com',
      access_role: 'user'
    }
  ]
};


export async function createListingAction({ request }) {
  const formData = await request.formData();

  let errors = {};

  // Post form response to axios
  try {
    const createListingResponse = await axios.post(
      "/api/listings",
      formData,
    )
    return true;
  }
  catch (resErr) {
    console.log(resErr.message);
    return resErr;
  }

}

export default function ListingForm() {
  const [formData, setformData] = useState({
    role_name: ""

  })

  const [filterString, setFilterString] = useState("");

  return (
    <>
      <h1>Create Listing</h1>
      <input
        type="text"
        name="filterString"
        id="filterString"
        onKeyUp={event => {setFilterString(event.target.value.toLowerCase())}}/>

      <Form action="/listings/new" method="post">
        <RoleSelect
          filterString={filterString}
        // formData={formData}
        // setRoleName={setformData}
        >
        </RoleSelect>

      </Form>
    </>
  )
}
