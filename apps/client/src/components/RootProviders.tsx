"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState, type PropsWithChildren } from "react";

export function RootProviders({ children }: PropsWithChildren) {
  const [queryClient, setQueryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { staleTime: 5_000 } } }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
