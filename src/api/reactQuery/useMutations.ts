import { useMutation, useQueryClient, type InvalidateQueryFilters, type QueryKey, type UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { STATUS, STORAGE_KEYS } from "@/constants";
import { setToast } from "@/utils";

export function useMutations<TInput, TResponse>(
  mutationKey: QueryKey,
  callback: (input: TInput) => Promise<TResponse>,
  options?: UseMutationOptions<TResponse, Error, TInput>
) {
  const q = useQueryClient();
  const router = useRouter();

  return useMutation<TResponse, Error, TInput>({
    mutationKey,
    mutationFn: callback,
    ...options,
    onSuccess: (data, variables, context) => {
      // Custom implementation: auto-invalidate related query keys if any
      for (let i = 1; i < mutationKey.length; i++) {
        const key = mutationKey[i];
        if (key) {
          q.invalidateQueries({ queryKey: [key] } as InvalidateQueryFilters);
        }
      }
      if (options?.onSuccess) {
        const onSuccessCallback = options.onSuccess as (d: TResponse, v: TInput, c: unknown) => void;
        onSuccessCallback(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const message = error?.message || "Something went wrong";
      setToast({ message, type: "error" });
      
      // If unauthorized, redirect to login page
      const errorStatus = (error as { status?: number })?.status;
      if (errorStatus === STATUS.UNAUTHORIZED) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          router.push("/login");
        }
      }
      if (options?.onError) {
        const onErrorCallback = options.onError as (e: Error, v: TInput, c: unknown) => void;
        onErrorCallback(error, variables, context);
      }
    },
  });
}
