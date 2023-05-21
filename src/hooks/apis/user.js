import Cookies from "js-cookie";
import { request } from "../../helpers/axios-instance";

const fetchCaretaker = async () => {
    let profile = JSON.parse(Cookies.get('profile'));
    if (profile.role === 'caretaker') {
        return null;
    }
    const response = await request({
        method: 'GET',
        url: '/api/user/caretaker'
    })

    return response.data.data;
}

export { fetchCaretaker };