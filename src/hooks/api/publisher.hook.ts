import publishersProvider from "@/providers/http/publishers";
import { useQuery } from "react-query";

export function UseGetAllPublisher() {
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