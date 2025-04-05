import languagesProvider from "@/providers/http/languages";
import { ICreateLanguage } from "@/providers/http/languages/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateLanguage(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateLanguage) => languagesProvider.create(data),
    getMutationOptions(queryClient, "languages", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateLanguage(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: ICreateLanguage }) =>
      languagesProvider.update(uuid, data),
    getMutationOptions(queryClient, "languages", "language", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteLanguage(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => languagesProvider.destroy(uuid),
    getMutationOptions(queryClient, "languages", "language", {
      onSuccess: onSuccessCallback,
    })
  );
}
