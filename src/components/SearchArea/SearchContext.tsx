"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  wordInput: string;
  setWordInput: (value: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [wordInput, setWordInput] = useState('');

  return (
    <SearchContext.Provider value={{ wordInput, setWordInput }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}