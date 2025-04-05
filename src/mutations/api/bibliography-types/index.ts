import bibliographyTypesProvider from "@/providers/http/bibliography-types";
import {
  ICreateBibliographyType,
  IUpdateBibliographyType,
} from "@/providers/http/bibliography-types/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateBibliographyType(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateBibliographyType) => bibliographyTypesProvider.create(data),
    getMutationOptions(queryClient, "bibliography-types", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateBibliographyType(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateBibliographyType }) =>
      bibliographyTypesProvider.update(uuid, data),
    getMutationOptions(queryClient, "bibliography-types", "bibliography-type", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteBibliographyType(
  onSuccessCallback?: (data: any) => void
) {
  const queryClient = useQueryClient();
  
  return useMutation(
    (uuid: string) => bibliographyTypesProvider.destroy(uuid),
    getMutationOptions(queryClient, "bibliography-types", "bibliography-type", {
      onSuccess: onSuccessCallback,
    })
  );
}
