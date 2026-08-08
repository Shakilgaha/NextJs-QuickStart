import { Get } from "./methods";
import { useQueries } from "./reactQuery";
import { API_URLS, QUERY_KEYS } from "@/constants";

export const Queries = {
  useCurrentUser: () =>
    useQueries<{ user: { name: string; email: string; role: string } }>([QUERY_KEYS.ME], () =>
      Get(API_URLS.ME),
    ),
};
