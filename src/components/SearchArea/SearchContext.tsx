'use client';

import React, { createContext, useState, useContext, useRef, RefObject } from 'react';

interface SearchContextType {
  wordInput: string;
  setWordInput: (value: string) => void;
  searchInputRef: RefObject<HTMLTextAreaElement | null>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [wordInput, setWordInput] = useState('');
  const searchInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <SearchContext.Provider value={{ wordInput, setWordInput, searchInputRef }}>
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