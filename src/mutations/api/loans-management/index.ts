import loansManagementProvider from "@/providers/http/loans-management";
import {
  ICreateLoanManagement,
  IUpdateLoanManagement,
} from "@/providers/http/loans-management/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateLoanManagement(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<ICreateLoanManagement>) => loansManagementProvider.create(data),
    getMutationOptions(queryClient, "requests", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateLoanManagement(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: Partial<IUpdateLoanManagement> }) =>
      loansManagementProvider.update(uuid, data),
    getMutationOptions(queryClient, "loans-management", "loan-management", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteLoanManagement(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => loansManagementProvider.destroy(uuid),
    getMutationOptions(queryClient, "loans-management", "loan-management", {
      onSuccess: onSuccessCallback,
    })
  );
}
