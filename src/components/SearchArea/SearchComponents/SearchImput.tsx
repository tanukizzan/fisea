"use client";

import { useDefaultSearch } from './useDefaultSearch';
import { useSearch } from '../SearchContext';
import './SearchInterface.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const { performSearch } = useDefaultSearch();
  const { searchInputRef } = useSearch();

  const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      performSearch(value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  return (
    <textarea
      ref={searchInputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      name="検索エリア"
      title="検索エリア"
      id="window"
      inputMode="search"
      rows={1}
    />
  );
}
