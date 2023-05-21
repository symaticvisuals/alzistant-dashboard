import { request } from "../../helpers/axios-instance";

const fetchAllChats = async () => {
    const response = await request({
        method: 'GET',
        url: '/api/chat'
    })

    return response.data.data;
}

export { fetchAllChats };