import commentsProvider from "@/providers/http/comments";
import { useQuery } from "react-query";

export function useGetAllComment(bookUUID?: string) {
  const queryClient = useQuery({
    queryKey: ["comments", bookUUID],
    retry: 1,
    queryFn: () => commentsProvider.getAll(bookUUID),
    enabled: !!bookUUID,
  });

  return {
    ...queryClient,
    data: queryClient.data?.data.comments,
    totalComments: queryClient.data?.data.totalComments,
  };
}

export function useGetOneComment(uuid?: string) {
  const queryClient = useQuery({
    queryKey: ["comment", uuid],
    retry: 1,
    queryFn: () => commentsProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...queryClient,
    data: queryClient.data?.data,
  };
}

export function useGetOneCommentByBook(uuid?: string) {
  const queryClient = useQuery({
    queryKey: ["comment-by-book", uuid],
    retry: 1,
    queryFn: () => commentsProvider.getOneByBook(uuid),
    enabled: !!uuid,
  });

  return {
    ...queryClient,
    data: queryClient.data?.data,
  };
}
