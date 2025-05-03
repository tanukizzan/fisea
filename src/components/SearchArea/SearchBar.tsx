import SearchInput from "./SearchComponents/SearchImput";
import ClearButton from "./SearchComponents/ClearButton";
import SubmitButton from "./SearchComponents/SubmitButton";

export default function SearchBar() {
  return (
    <form className="relative flex justify-start items-center mx-auto p-0 w-9/10 h-auto rounded-md bg-(--search-bar-bg) border border-solid border-(--search-bar-border) transition-all duration-200 focus-within:shadow-[0_1px_10px_2px_rgba(10,10,10,0.1)] hover:shadow-[0_1px_10px_2px_rgba(10,10,10,0.1)] focus-within:border-(--search-bar-border-hover) hover:border-(--search-bar-border-hover)">
      <div className="w-10 h-auto min-h-[2.5em] flex items-center justify-center text-(--search-bar-icon) shrink-0">
        <span className="icon-[octicon--search-24] bg-(--search-bar-icon)"></span>
      </div>
      <SearchInput />
      <ClearButton />
      <SubmitButton />
    </form>
  );
}
