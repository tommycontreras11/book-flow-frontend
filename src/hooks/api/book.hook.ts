import booksProvider from "@/providers/http/books";
import { useQuery } from "react-query";

export function useGetAllBook(search?: string | null) {
    const queryInfo = useQuery({
        queryKey: ['books', search],
        retry: 1,
        queryFn: () => booksProvider.getAll(search),
    })

    return {
        ...queryInfo,
        data: queryInfo.data?.data
    }
}

export function useGetAllBookStat(enabled: boolean) {
    const queryClient = useQuery({
        queryKey: ['books-stats'],
        retry: 1,
        queryFn: () => booksProvider.getStats(),
        enabled
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneBook(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['book', uuid],
        retry: 1,
        queryFn: () => booksProvider.getOne(uuid),
        enabled: !!uuid
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}