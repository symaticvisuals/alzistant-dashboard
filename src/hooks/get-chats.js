
import { useQuery } from "@tanstack/react-query";
import { GET_ALL_CHATS } from "./Constants";
import { fetchAllChats } from "./apis/chats";

export const useChats = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        [GET_ALL_CHATS], fetchAllChats
    );

    return { data, isLoading, isError, refetch };
}