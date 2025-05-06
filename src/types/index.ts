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
  name: string;
  type: number;
  domain: string;
  subDomain?: string;
  directory?: string;
  queryBefore?: string;
  queryAfter?: string;
  queryAlt?: string;
}

export interface ButtonItem {
  name: string;
  isActive: boolean;
}

export interface CategoryItem {
  name: string;
  isActive: boolean;
  list: ButtonItem[];
}
