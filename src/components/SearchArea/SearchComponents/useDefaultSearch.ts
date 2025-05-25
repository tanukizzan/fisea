import { useDefaultSearchSettings } from 'hooks/useDefaultSearchSettings';
import { useTabOpenSettings } from 'hooks/useTabOpenSettings';
import { generateSearchUrl } from 'utils/searchUrlGenerator';

export const useDefaultSearch = () => {
  const { defaultSearch } = useDefaultSearchSettings();
  const { tabOpenType } = useTabOpenSettings();

  const performSearch = (searchWord: string) => {
    if (!defaultSearch) {
      // デフォルト検索サイトが設定されていない場合はGoogle検索を使用
      const encodedQuery = encodeURIComponent(
        searchWord.replace(/^[\p{C}\p{Z}]+|[\p{C}\p{Z}]+$/gu, "")
      );
      const url = searchWord
        ? `https://www.google.co.jp/search?q=${encodedQuery}`
        : "https://www.google.co.jp/";
      window.open(url, tabOpenType === 'new' ? '_blank' : '_self');
      return;
    }

    const searchUrl = generateSearchUrl(searchWord, defaultSearch);
    window.open(searchUrl, tabOpenType === 'new' ? '_blank' : '_self');
  };

  return { performSearch };
};