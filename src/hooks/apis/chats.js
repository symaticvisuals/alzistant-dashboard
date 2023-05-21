import Cookies from "js-cookie";
import { request } from "../../helpers/axios-instance";

const fetchAllChats = async () => {
    const profile = JSON.parse(Cookies.get('profile'));
    const url = profile.role === 'caretaker' ? '/api/chat/patient' : '/api/chat';
    const response = await request({
        method: 'GET',
        url: url,
    })

    return response.data.data;
}

export { fetchAllChats };