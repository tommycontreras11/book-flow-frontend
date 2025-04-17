import genresProvider from "@/providers/http/genres";
import { ICreateGenre, IUpdateGenre } from "@/providers/http/genres/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateGenre(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateGenre) => genresProvider.create(data),
    getMutationOptions(queryClient, "genres", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateGenre(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateGenre }) =>
      genresProvider.update(uuid, data),
    getMutationOptions(queryClient, "genres", "genre", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteGenre(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => genresProvider.destroy(uuid),
    getMutationOptions(queryClient, "genres", "genre", {
      onSuccess: onSuccessCallback,
    })
  );
}
