import { request } from "../../helpers/axios-instance";

const fetchAllReminders = async () => {
    const response = await request({
        method: 'GET',
        url: '/api/reminder'
    })
    console.log(response.data.data);
    return response.data.data;
}

export { fetchAllReminders };