import { ENDPOINTS } from "../../common/utilities";
import axios from "axios";

export async function loadApplicationDetail({ params }) {
    const id = params.id;
    const response = await axios.get(`${ENDPOINTS.applications}/${id}?detail=true`);

    const application = await response.data;
    return application;
}
