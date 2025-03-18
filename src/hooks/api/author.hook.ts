import authorsProvider from "@/providers/http/authors";
import { useQuery } from "react-query";

export function useGetAllAuthor() {
    const queryClient = useQuery({
        queryKey: ['authors'],
        retry: 1,
        queryFn: () => authorsProvider.getAll()
    })

    return { 
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneAuthor(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['author', uuid],
        retry: 1,
        queryFn: () => authorsProvider.getOne(uuid)
    })

    return { 
        ...queryClient,
        data: queryClient.data?.data
    }
}