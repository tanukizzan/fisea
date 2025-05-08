'use client';

import SearchInput from "./SearchComponents/SearchInput";
import ClearButton from "./SearchComponents/ClearButton";
import SubmitButton from "./SearchComponents/SubmitButton";
import { useSearch } from "./SearchContext";

export default function SearchBar() {
  const { wordInput, setWordInput, searchInputRef } = useSearch();

  const handleClear = () => {
    setWordInput('');
    if (searchInputRef.current) {
      searchInputRef.current.style.height = 'auto';
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  return (
    <form className="relative flex justify-start items-center mx-auto p-0 w-9/10 h-auto rounded-md bg-(--search-bar-bg) border border-solid border-(--search-bar-border) transition-all duration-200 focus-within:shadow-[0_1px_10px_2px_rgba(10,10,10,0.1)] hover:shadow-[0_1px_10px_2px_rgba(10,10,10,0.1)] focus-within:border-(--search-bar-border-hover) hover:border-(--search-bar-border-hover)">
      <div className="w-8 h-auto ml-1 flex items-center justify-center text-(--search-bar-icon) shrink-0">
        <span className="icon-[octicon--search-24] bg-(--search-bar-icon)"></span>
      </div>
      <SearchInput value={wordInput} onChange={setWordInput} />
      <ClearButton wordInput={wordInput} onClear={handleClear} />
      <SubmitButton wordInput={wordInput} />
    </form>
  );
}
