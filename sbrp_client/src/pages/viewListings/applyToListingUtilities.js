import axios from "axios";
import { ENDPOINTS } from "../../common/utilities";


export default async function applyToListing({ params, request }) {
    
    const formData = await request.formData();

    const body = {...Object.fromEntries(formData)}

    let actionData = {};

    try {
        await axios({
            url: ENDPOINTS.listings + `/${body.id}` + "/applications",
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

