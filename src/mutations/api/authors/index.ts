import { useMutation, useQueryClient } from "react-query";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import authorsProvider from "@/providers/http/authors";
import { ICreateAuthor, IUpdateAuthor } from "@/providers/http/authors/interface";

export function useCreateAuthor() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: ICreateAuthor) => authorsProvider.create(data),
    getMutationOptions(queryClient, "authors")
  );
}

export function useUpdateAuthor() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateAuthor }) =>
      authorsProvider.update(uuid, data),
    getMutationOptions(queryClient, "authors")
  );
}

export function useDeleteAuthor() {
  const queryClient = useQueryClient();
  return useMutation(
    (uuid: string) =>
      authorsProvider.destroy(uuid),
    getMutationOptions(queryClient, "authors")
  );
}
