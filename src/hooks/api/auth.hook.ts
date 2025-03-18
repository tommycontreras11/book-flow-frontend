import authProvider from "@/providers/http/auth";
import { useQuery } from "react-query";

export function useMe() {
    const queryClient = useQuery({
        queryKey: ['me'],
        retry: 1,
        queryFn: () => authProvider.me()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}