export const useDefaultSearch = () => {
  const performSearch = (searchWord: string) => {
    const encodedQuery = encodeURIComponent(
      searchWord.replace(/^[\p{C}\p{Z}]+|[\p{C}\p{Z}]+$/gu, "")
    );
    const url = searchWord
      ? `https://www.google.co.jp/search?q=${encodedQuery}`
      : "https://www.google.co.jp/";

    window.open(url, '_blank');
  };

  return { performSearch };
};