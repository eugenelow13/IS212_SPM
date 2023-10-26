import axios from "axios";
import { ENDPOINTS, useFetchedDataWithParams } from "../../common/utilities";
import moment from "moment";


export default async function applyToListing({ params, request }) {

    const formData = await request.formData();

    const body = { ...Object.fromEntries(formData) }

    const actionData = {
        time: moment(),
        success: false,
        message: ""
    };

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

export async function fetchStaffApplications({ staff_id, id }) {
    // array of staff applications
    try {
        const response = await axios.get(ENDPOINTS.staffs + "/" + staff_id + "/applications");
        const applications = response.data.applications;
        if (applications.find((application) => application.id === id) !== undefined) {
            return true;
        }
    }
    catch (error){
        return false;
    }   

    // console.log("Applied for", applications);



}

