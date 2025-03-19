import requestsProvider from "@/providers/http/requests";
import { useQuery } from "react-query";

export function useGetAllRequest() {
    const queryClient = useQuery({
        queryKey: ['requests'],
        retry: 1,
        queryFn: () => requestsProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneRequest(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['request', uuid],
        retry: 1,
        queryFn: () => requestsProvider.getOne(uuid)
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}