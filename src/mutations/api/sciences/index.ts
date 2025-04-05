import sciencesProvider from "@/providers/http/sciences";
import { ICreateScience } from "@/providers/http/sciences/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateScience(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateScience) => sciencesProvider.create(data),
    getMutationOptions(queryClient, "sciences", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateScience(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: ICreateScience }) =>
      sciencesProvider.update(uuid, data),
    getMutationOptions(queryClient, "sciences", "science", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteScience(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => sciencesProvider.destroy(uuid),
    getMutationOptions(queryClient, "sciences", "science", {
      onSuccess: onSuccessCallback,
    })
  );
}
