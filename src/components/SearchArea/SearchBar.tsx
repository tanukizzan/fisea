'use client';

import SearchInput from "./SearchComponents/SearchImput";
import ClearButton from "./SearchComponents/ClearButton";
import SubmitButton from "./SearchComponents/SubmitButton";
import { useSearch } from "./SearchContext";

export default function SearchBar() {
  const {wordInput, setWordInput } = useSearch();

  const handleClear = () => {
    setWordInput('');
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
