
import { useQuery } from "@tanstack/react-query";
import { fetchAllReminders, fetchAllRemindersCaretaker } from "./apis/reminders";
import { GET_ALL_REMINDERS, GET_ALL_REMINDERS_CARETAKER } from "./Constants";

export const useReminders = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        [GET_ALL_REMINDERS], fetchAllReminders
    );

    return { data, isLoading, isError, refetch };
}

export const useRemindersCaretaker = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        [GET_ALL_REMINDERS_CARETAKER], fetchAllRemindersCaretaker
    );

    return { data, isLoading, isError, refetch };
}