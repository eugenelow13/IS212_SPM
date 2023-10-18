import axios from "axios";
import { ENDPOINTS } from "../../common/utilities";


export default async function applyToListing({ params, request }) {
    
    const formData = await request.formData();

    const body = {...Object.fromEntries(formData)}

    let actionData = {};

    try {
        await axios({
            url: ENDPOINTS.applications + `/${body.id}`,
            method: "post",
            data: body
        });

        actionData.success = true;
        actionData.message = `Submission of application for ${body.id} successful!`;
        return actionData;
    }
    catch (responseErr) {
        console.log(responseErr.message);
        actionData.message = `Submission of ${body.id} failed: ${responseErr.response?.data?.message || responseErr.message}!`;

        return actionData;
    }
}

export async function fetchStaffApplications(staff_id, id) {
    // id is listing_id
    // const axios.get(ENDPOINTS.)
}