import { Form } from 'react-router-dom';
import axios from 'axios';

// Form submit action


export async function createListingAction({ request }){
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

function ListingForm() {
  return (
    <Form action="/listings/new" method="post">
      <RoleDropdown></RoleDropdown>
      <RoleDesc></RoleDesc>
      
    </Form>
  )
}
