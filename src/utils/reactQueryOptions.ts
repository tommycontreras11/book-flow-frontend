import { toast } from "@/hooks/use-toast";
import { QueryClient } from "react-query";

export function getMutationOptions(
  queryClient: QueryClient,
  keyToInvalidateAll?: string | null,  
  keyToInvalidateOne?: string | null,  
  overrides?: {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  }
) {
  return {
    onSuccess: (data: any, variables: any) => {
      variables?.uuid && queryClient.invalidateQueries([keyToInvalidateOne, variables?.uuid]);
      keyToInvalidateAll && queryClient.invalidateQueries(keyToInvalidateAll);
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
        duration: 3000,
      });
      overrides?.onSuccess?.(data);
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
        duration: 3000,
      });
      overrides?.onError?.(err);
    },
  };
}
