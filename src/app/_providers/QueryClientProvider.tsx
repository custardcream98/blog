import { getQueryClient } from "src/request/queryClient";

import { QueryClientProvider as RQQueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useMemo } from "react";

export function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = useMemo(() => {
    return getQueryClient();
  }, []);

  return <RQQueryClientProvider client={queryClient}>{children}</RQQueryClientProvider>;
}
