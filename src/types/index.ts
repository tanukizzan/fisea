import { RefObject } from 'react';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SearchContextType {
  wordInput: string;
  setWordInput: (value: string) => void;
  searchInputRef: RefObject<HTMLTextAreaElement | null>;
}

export interface ClearButtonProps {
  wordInput: string;
  onClear: () => void;
}

export interface DomainItem {
  type: number;
  name: string;
  domain: string;
  subDomain?: string;
  directory?: string;
  queryBefore?: string;
  queryAfter?: string;
  queryAlt?: string;
  category?: string;
}

export interface ButtonItem {
  name: string;
  isActive: boolean;
  id: string;
}

export interface CategoryItem {
  name: string;
  isActive: boolean;
  list: ButtonItem[];
}
