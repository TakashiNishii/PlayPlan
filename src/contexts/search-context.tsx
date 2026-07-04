import { createContext, useContext, useState } from "react";

interface SearchContextProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedThemes: string[]
  setSelectedThemes: (themes: string[]) => void
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

interface SearchProviderProps {
  children: React.ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const contextValue: SearchContextProps = {
    searchTerm,
    setSearchTerm,
    selectedThemes,
    setSelectedThemes
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
