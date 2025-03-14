import usersProvider from "@/providers/http/users";
import { useQuery } from "react-query";

export function useGetAllUser() {
    const queryClient = useQuery({
        queryKey: ['users'],
        retry: 1,
        queryFn: () => usersProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneUser(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['user', uuid],
        retry: 1,
        queryFn: () => usersProvider.getOne(uuid)
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}