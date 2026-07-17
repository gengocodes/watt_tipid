"use client";

import { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // Fresh for 5 minutes
            gcTime: 10 * 60 * 1000, // Remove unused cache after 10 minutes
            retry: 1, // Retry transient failures once
            refetchOnWindowFocus: false, // Don't refetch just because the user switched tabs
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
