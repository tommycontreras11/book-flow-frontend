import commentsProvider from "@/providers/http/comments";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateComment(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: FormData) => commentsProvider.create(data),
    getMutationOptions(queryClient, "comments", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateComment(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: FormData }) =>
      commentsProvider.update(data, uuid),
    getMutationOptions(queryClient, "comments", "comment", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteComment(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid?: string) => commentsProvider.destroy(uuid),
    getMutationOptions(queryClient, "comments", "comment", {
      onSuccess: onSuccessCallback,
    })
  );
}
