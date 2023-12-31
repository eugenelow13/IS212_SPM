import axios from 'axios';
import { ENDPOINTS } from '../../common/utilities';
import moment from 'moment';
import { IFormData } from './ListingForm';
import Listing from '../viewListings/Listing';
import { useEffect } from 'react';

// mock?.onPost(ENDPOINTS.listings).reply(200, {
//   success: false
// });
// Form submit action


export async function createListingAction({ params, request, method = "post" }) {
  const formData = await request.formData();

  // copy of formData
  let body = { ...Object.fromEntries(formData) };

  // extract fields to prevent injection
  const { role_name, start_date, end_date, country, manager_id } = body;
  body = {
    role_name,
    manager_id,
    country,
    start_date: moment(start_date).format("YYYY-MM-DD"),
    end_date: moment(end_date).format("YYYY-MM-DD"),
  } as IFormData;

  if (method === "put") {
    body.id = params.id

  }

  const actionData = {
    time: moment(),
    success: false,
    message: ""
  };
  // Post form response to axios

  console.table(body)

  try {

    let idParam;

    if (method == "put") {
      idParam = "/" + body.id;
    } else {
      idParam = ""
    }

    const createListingResponse = await axios({
      url: ENDPOINTS.listings + idParam,
      method,
      data: body
    });

    actionData.success = true;
    actionData.message = `${method == "post" ? "Submission" : "Edit"} of ${body.role_name} successful!`;

    return actionData;
  }
  catch (responseErr) {
    console.log(responseErr.message);
    actionData.message = `Submission of ${body.role_name} failed: ${responseErr.response?.data?.message || responseErr.message}!`;

    return actionData;
  }

}

export async function loadListing({ params }) {
  const id = params.id;
  const response = await axios.get(ENDPOINTS.listings + "/" + id);

  const listing = await response.data;
  return listing;
}


export function findValueInSelect(options, key, queryVal) {
  let value;

  try {
    value = options.find(option => option[key] === queryVal);
    console.log("Found", value)
    return value;
  }
  catch {
    return value;
  }
}

export function useFoundValue(setState, options, key, queryVal) {
  useEffect(() => {

    if (options && queryVal) {
      const foundValue = findValueInSelect(options, key, queryVal)
      foundValue && setState(foundValue)
    }

  }, [options])

}