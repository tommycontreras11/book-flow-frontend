import { toast } from "@/hooks/use-toast";
import { QueryClient } from "react-query";

export function getMutationOptions(
  queryClient: QueryClient,
  keyToInvalidate: string
) {
  return {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(keyToInvalidate);
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
        duration: 3000,
      });
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
        duration: 3000,
      });
    },
  };
}
