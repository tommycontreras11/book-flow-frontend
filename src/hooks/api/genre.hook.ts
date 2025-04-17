import genresProvider from "@/providers/http/genres";
import { useQuery } from "react-query";

export function useGetAllGenre() {
  const queryClient = useQuery({
    queryKey: ["genres"],
    retry: 1,
    queryFn: () => genresProvider.getAll(),
  });

  return {
    ...queryClient,
    data: queryClient?.data?.data,
  };
}

export function useGetOneGenre(uuid?: string) {
  const queryClient = useQuery({
    queryKey: ["genre", uuid],
    retry: 1,
    queryFn: () => genresProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...queryClient,
    data: queryClient?.data?.data,
  };
}
