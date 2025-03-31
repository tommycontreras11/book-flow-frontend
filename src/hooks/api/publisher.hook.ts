import publishersProvider from "@/providers/http/publishers";
import { useQuery } from "react-query";

export function useGetAllPublisher() {
    const queryClient = useQuery({
        queryKey: ['publishers'],
        retry: 1,
        queryFn: () => publishersProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOnePublisher(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['publisher', uuid],
        retry: 1,
        queryFn: () => publishersProvider.getOne(uuid),
        enabled: !!uuid
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}