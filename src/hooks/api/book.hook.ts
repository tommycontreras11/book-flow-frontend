import booksProvider from "@/providers/http/books";
import { useQuery } from "react-query";

export function useGetAllBook() {
    const queryInfo = useQuery({
        queryKey: ['books'],
        retry: 1,
        queryFn: () => booksProvider.getAll(),
    })

    return {
        ...queryInfo,
        data: queryInfo.data?.data
    }
}

export function useGetOneBook(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['book', uuid],
        retry: 1,
        queryFn: () => booksProvider.getOne(uuid)
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}