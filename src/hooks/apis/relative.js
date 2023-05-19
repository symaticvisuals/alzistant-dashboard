import { request } from "../../helpers/axios-instance";

const fetchAllRelatives = async () => {
    const response = await request({
        method: 'GET',
        url: '/api/relative'
    })

    return response.data.data;
}

export { fetchAllRelatives };