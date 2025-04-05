import usersProvider from "@/providers/http/users";
import { ICreateUser } from "@/providers/http/users/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateUser(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateUser) => usersProvider.create(data),
    getMutationOptions(queryClient, "users", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateUser(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: ICreateUser }) =>
      usersProvider.update(uuid, data),
    getMutationOptions(queryClient, "users", "user", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteUser(onSuccessCallback?: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => usersProvider.destroy(uuid),
    getMutationOptions(queryClient, "users", "user", {
      onSuccess: onSuccessCallback,
    })
  );
}
