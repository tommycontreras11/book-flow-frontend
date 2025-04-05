import booksProvider from "@/providers/http/books";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateBook(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: FormData) => booksProvider.create(data),
    getMutationOptions(queryClient, "books", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateBook(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: FormData }) =>
      booksProvider.update(uuid, data),
    getMutationOptions(queryClient, "books", "book", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteBook(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => booksProvider.destroy(uuid),
    getMutationOptions(queryClient, "books", "book", {
      onSuccess: onSuccessCallback,
    })
  );
}