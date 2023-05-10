
import { useQuery } from "@tanstack/react-query";
import { fetchAllReminders } from "./apis/reminders";
import { GET_ALL_REMINDERS } from "./Constants";

export const useReminders = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        [GET_ALL_REMINDERS], fetchAllReminders
    );

    return { data, isLoading, isError, refetch };
}