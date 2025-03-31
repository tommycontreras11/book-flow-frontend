import countryProvider from "@/providers/http/countries";
import { useQuery } from "react-query";

export function useGetAllCountry() {
    const queryClient = useQuery({
        queryKey: ['countries'],
        retry: 1,
        queryFn: () => countryProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneCountry(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['country', uuid],
        retry: 1,
        queryFn: () => countryProvider.getOne(uuid),
        enabled: !!uuid
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}