import bibliographyTypesProvider from "@/providers/http/bibliography-types";
import { useQuery } from "react-query";

export function useGetAllBibliographyType() {
    const queryClient = useQuery({
        queryKey: ['bibliography-types'],
        retry: 1,
        queryFn: () => bibliographyTypesProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneBibliographyType(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['bibliography-type', uuid],
        retry: 1,
        queryFn: () => bibliographyTypesProvider.getOne(uuid),
        enabled: !!uuid
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}