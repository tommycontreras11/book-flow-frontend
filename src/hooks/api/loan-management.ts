import loansManagementProvider from "@/providers/http/loans-management";
import { ILoanManagementFilter } from "@/providers/http/loans-management/interface";
import { useQuery } from "react-query";

export function useGetAllLoanManagement(filters?: ILoanManagementFilter) {
  const queryClient = useQuery({
    queryKey: ["loans-management", filters],
    retry: 1,
    queryFn: () => loansManagementProvider.getAll(filters)
  });

  return {
    ...queryClient,
    data: queryClient.data?.data,
  };
}

export function useGetOneLoanManagement(uuid?: string) {
  const queryClient = useQuery({
    queryKey: ["loans-management", uuid],
    retry: 1,
    queryFn: () => loansManagementProvider.getOne(uuid),
    enabled: !!uuid
  });

  return {
    ...queryClient,
    data: queryClient.data?.data,
  };
}
