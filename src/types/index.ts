import { RefObject } from 'react';

export interface ProcessEnv {
  NEXT_PUBLIC_SITE_URL: string;
}

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

export const categoryIconMap: Record<string, string> = {
  Search: "icon-[octicon--search-16]",
  Website: "icon-[octicon--light-bulb-16]",
  Shopping: "icon-[mdi--shopping-cart]",
  Social: "icon-[octicon--hash-16]",
  Other: "icon-[mdi--folder]",
};