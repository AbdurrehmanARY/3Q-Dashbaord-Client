import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      // 30s cuts redundant background refetches; correctness after a write doesn't rely on
      // this — mutations call invalidateQueries, which refetches regardless of staleTime.
      staleTime: 30 * 1000,
    },
  },
});
