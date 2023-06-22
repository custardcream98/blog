import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

const DEFAULT_QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      cacheTime: 60_000_000,
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 60_000,
    },
  },
};

export const getQueryClient = () => new QueryClient(DEFAULT_QUERY_CLIENT_CONFIG);
