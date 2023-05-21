import { request } from "../../helpers/axios-instance";

const fetchAllReminders = async () => {
    const response = await request({
        method: 'GET',
        url: '/api/reminder'
    })

    return response.data.data;
}

const fetchAllRemindersCaretaker = async () => {
    const response = await request({
        method: 'GET',
        url: '/api/reminder/all'
    })

    return response.data.data;
}

export { fetchAllReminders, fetchAllRemindersCaretaker };