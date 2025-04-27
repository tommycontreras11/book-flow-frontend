import commentsProvider from "@/providers/http/comments";
import { useQuery } from "react-query";

export function useGetAllComment() {
    const queryClient = useQuery({
        queryKey: ["comments"],
        retry: 1,
        queryFn: () => commentsProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data,
    }
}

export function useGetOneComment(uuid?: string) {
    const queryClient = useQuery({
        queryKey: ["comment", uuid],
        retry: 1,
        queryFn: () => commentsProvider.getOne(uuid),
        enabled: !!uuid,
    })

    return {
        ...queryClient,
        data: queryClient.data?.data,
    }
}