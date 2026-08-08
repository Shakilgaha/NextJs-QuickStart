import { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export type QueryOptions<T> = Omit<UseQueryOptions<T, Error, T, unknown[]>, "queryKey" | "queryFn">;
export type MutationOptions<TResponse, TInput> = Omit<UseMutationOptions<TResponse, Error, TInput>, "mutationKey" | "mutationFn">;
