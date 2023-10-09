import axios from 'axios';
import { ENDPOINTS } from '../../common/utilities';
import moment from 'moment';
import { IFormData } from './ListingForm';
import Listing from '../viewListings/Listing';

// mock?.onPost(ENDPOINTS.listings).reply(200, {
//   success: false
// });
// Form submit action


export async function createListingAction({ request, method = "post" }) {
  const formData = await request.formData();

  // copy of formData
  let body = { ...Object.fromEntries(formData) };

  // extract fields to prevent injection
  const { role_name, start_date, end_date, country, rep_manager_id } = body;
  body = {
    role_name,
    rep_manager_id,
    country,
    start_date: moment(start_date).format("YYYY-MM-DD"),
    end_date: moment(end_date).format("YYYY-MM-DD"),
  } as IFormData;

  console.table(body);

  const actionData = {
    time: moment(),
    success: false,
    message: ""
  };
  // Post form response to axios
  try {
    const createListingResponse = await axios(
      ENDPOINTS.listings,
      { method, ...body }
    );
    actionData.success = true;
    actionData.message = `${method == "post" ? "Submission" : "Edit"} of ${body.role_name} successful!`;

    return actionData;
  }
  catch (responseErr) {
    console.log(responseErr.message);
    actionData.message = `${method == "post" ? "Submission" : "Edit"} of ${body.role_name} failed: ${responseErr.message}!`;

    return actionData;
  }

}


export async function loadListingToEdit({ params }) {
  const id = params.id;

  // const response = await axios.get(ENDPOINTS.listings + "/" + id);
  console.log(id)

  // const listingToEdit = await response.data;

  const listingToEdit = {
    "id": 1,
    "role_name": "Database Administrator",
    "start_date": "2023-09-23",
    "end_date": "2023-10-23",
    "manager_id": 130002, // keep both name and id, id needed for other page
    "manager_name": "Arnold Tan",
    "dept": "HR",
    "country": "Vietnam",
    "role_desc": "Administers Database",
    "role_skills": ["SQL", "E-R diagramming"]
  }

  return listingToEdit;
}
