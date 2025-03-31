import employeesProvider from "@/providers/http/employees";
import { useQuery } from "react-query";

export function useGetAllEmployee() {
    const queryClient = useQuery({
        queryKey: ['employees'],
        retry: 1,
        queryFn: () => employeesProvider.getAll()
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}

export function useGetOneEmployee(uuid: string) {
    const queryClient = useQuery({
        queryKey: ['employee', uuid],
        retry: 1,
        queryFn: () => employeesProvider.getOne(uuid),
        enabled: !!uuid
    })

    return {
        ...queryClient,
        data: queryClient.data?.data
    }
}