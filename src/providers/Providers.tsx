"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "../contexts/search-context";
import { ThemeProvider } from "../contexts/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          {children}
        </SearchProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
