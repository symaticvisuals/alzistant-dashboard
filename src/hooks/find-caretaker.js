
import { useQuery } from "@tanstack/react-query";
import { GET_CARETAKER } from "./Constants";
import { fetchCaretaker } from "./apis/user";

export const useCareTaker = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        [GET_CARETAKER], fetchCaretaker
    );

    return { data, isLoading, isError, refetch };
}