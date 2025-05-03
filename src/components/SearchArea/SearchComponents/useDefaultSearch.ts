export const useDefaultSearch = () => {
  const performSearch = (searchWord: string) => {
    const encodedQuery = encodeURIComponent(
      searchWord.replace(/^[\p{C}\p{Z}]+|[\p{C}\p{Z}]+$/gu, "")
    );
    const url = searchWord
      ? `https://www.google.com/search?q=${encodedQuery}`
      : "https://www.google.com/";

    window.open(url, '_blank');
  };

  return { performSearch };
};