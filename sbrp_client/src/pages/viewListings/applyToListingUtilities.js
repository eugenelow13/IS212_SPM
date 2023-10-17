// import axios from "axios";
// import { ENDPOINTS } from "../../common/utilities";

// export default async function applyToListing(id, appDesc) {
//     let actionData = {};

//     let body = {
//         id,
//         app_desc: appDesc
//     }

//     try {
//         await axios({
//             url: ENDPOINTS.listings + `/${id}` + "/applications",
//             method: "post",
//             data: body
//         });

//         actionData.success = true;
//         actionData.message = `Submission of application for ${body.id} successful!`;
//         return actionData;
//     }
//     catch (responseErr) {
//         console.log(responseErr.message);
//         actionData.message = `Submission of ${body.id} failed: ${responseErr.response?.data?.message || responseErr.message}!`;

//         return actionData;
//     } 
// }


// export default async function applyToListing({ params, request }) {
//     const staff_id = window.sessionStorage.getItem("user");
    
//     const formData = await request.formData();
//     const id = await formData.id;
//     const app_desc = await formData?.app_desc;

//     console.log("PARAMS", formData);

//     const body = {
//         id,
//         staff_id,
//         app_desc
//     };

//     let actionData = {};

//     try {
//         await axios({
//             url: ENDPOINTS.listings + `/${id}` + "/applications",
//             method: "post",
//             data: body
//         });

//         actionData.success = true;
//         actionData.message = `Submission of application for ${body.id} successful!`;
//         return actionData;
//     }
//     catch (responseErr) {
//         console.log(responseErr.message);
//         actionData.message = `Submission of ${body.id} failed: ${responseErr.response?.data?.message || responseErr.message}!`;

//         return actionData;
//     }
// }

