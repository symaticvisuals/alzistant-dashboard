
import { useQuery } from "@tanstack/react-query";
import { GET_ALL_RELATIVES } from "./Constants";
import { fetchAllRelatives } from "./apis/relative";

export const useRelatives = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        [GET_ALL_RELATIVES], fetchAllRelatives
    );

    return { data, isLoading, isError, refetch };
}