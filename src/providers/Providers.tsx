"use client"

import { SearchProvider } from "../contexts/search-context";
import { ThemeProvider } from "../contexts/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </ThemeProvider>
  );
}
