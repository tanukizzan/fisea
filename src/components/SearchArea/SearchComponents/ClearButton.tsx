interface ClearButtonProps {
  wordInput: string;
  onClear: () => void;
}

export default function ClearButton({ wordInput, onClear }: ClearButtonProps) {
  const clearInput = () => {
    onClear();
    const searchArea = document.getElementById('window') as HTMLTextAreaElement;
    if (searchArea) {
      setTimeout(() => searchArea.focus(), 0);
    }
  };

  return (
    <>
      {wordInput && wordInput.length > 0 && (
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center border-none bg-transparent cursor-pointer p-1 mr-2 text-(--search-bar-icon) transition-opacity duration-200"
          onClick={clearInput}
          aria-label="検索をクリア"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </>
  );
}