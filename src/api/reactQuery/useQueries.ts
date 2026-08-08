import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function useQueries<T, P = void>(
  queryKey: unknown[],
  callback: (param?: P) => Promise<T>,
  options?: UseQueryOptions<T, Error, T, unknown[]>
) {
  return useQuery<T, Error, T, unknown[]>({
    queryKey,
    queryFn: async () => await callback(),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    retry: 0,
    staleTime: 1000 * 60,
    ...options,
  });
}
