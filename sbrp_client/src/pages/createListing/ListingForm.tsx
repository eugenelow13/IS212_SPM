import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { ENDPOINTS } from '../../common/utilities';
import { mock } from '../../common/utilities';

import RoleSelect from './components/RoleSelect';

mock.onPost('/api/listings').reply(200, {
  success: true
})

// Form submit action
export async function createListingAction({ request }) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData)

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
      <h3>Create Listing</h3>
      <input
        type="text"
        className='form-control my-3'
        placeholder='Filter role...'
        id="filterString"
        onKeyUp={event => {setFilterString(event.target.value.toLowerCase())}}/>

      <Form action="/listings/new" method="post">
        <RoleSelect
          filterString={filterString}
        // formData={formData}
        // setRoleName={setformData}
        >
        </RoleSelect>

        <input type="submit" className="btn btn-primary" value="Submit" />

      </Form>
    </>
  )
}


