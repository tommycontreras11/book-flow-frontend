import bibliographyTypesProvider from "@/providers/http/bibliography-types";
import { useQuery } from "react-query";

export function UseGetAllBibliographyType() {
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