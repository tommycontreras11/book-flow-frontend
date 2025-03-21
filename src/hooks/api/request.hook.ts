import { StatusRequestEnum } from "@/enums/request.enum";
import requestsProvider from "@/providers/http/requests";
import { useQuery } from "react-query";

export function useGetAllRequest(enabled: boolean, status?: StatusRequestEnum[]) {
    const queryClient = useQuery({
        queryKey: ['requests', status],
        retry: 1,
        queryFn: () => requestsProvider.getAll(status),
        enabled
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