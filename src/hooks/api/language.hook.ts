import languagesProvider from "@/providers/http/languages";
import { useQuery } from "react-query";

export function useGetAllLanguage() {
    const queryClient = useQuery({
        queryKey: ['languages'],
        retry: 1,
        queryFn: () => languagesProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneLanguage(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['language', uuid],
        retry: 1,
        queryFn: () => languagesProvider.getOne(uuid),
        enabled: !!uuid
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}