import loansManagementProvider from "@/providers/http/loans-management";
import { ICreateLoanManagement } from "@/providers/http/loans-management/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateLoanManagement(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateLoanManagement) => loansManagementProvider.create(data),
    getMutationOptions(queryClient, "requests", null, {
      onSuccess: onSuccessCallback,
    })
  );
}
