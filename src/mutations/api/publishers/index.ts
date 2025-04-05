import publishersProvider from "@/providers/http/publishers";
import { ICreatePublisher } from "@/providers/http/publishers/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreatePublisher(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreatePublisher) => publishersProvider.create(data),
    getMutationOptions(queryClient, "publishers", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdatePublisher(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: ICreatePublisher }) =>
      publishersProvider.update(uuid, data),
    getMutationOptions(queryClient, "publishers", "publisher", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeletePublisher(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => publishersProvider.destroy(uuid),
    getMutationOptions(queryClient, "publishers", "publisher", {
      onSuccess: onSuccessCallback,
    })
  );
}
