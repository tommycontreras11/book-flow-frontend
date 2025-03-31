import sciencesProvider from "@/providers/http/sciences";
import { useQuery } from "react-query";

export function useGetAllScience() {
    const queryClient =  useQuery({
        queryKey: ['sciences'],
        retry: 1,
        queryFn: () => sciencesProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneScience(uuid: string) {
    const queryClient =  useQuery({
        queryKey: ['science', uuid],
        retry: 1,
        queryFn: () => sciencesProvider.getOne(uuid),
        enabled: !!uuid
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}