import { DomainItem } from 'types';

export const generateSearchUrl = (searchWord: string, domainItem: DomainItem): string => {
  const wordInputEncoded = encodeURIComponent(
    searchWord.replace(/^[\p{C}\p{Z}]+|[\p{C}\p{Z}]+$/gu, "")
  );
  const wordInputEncodedHash = encodeURIComponent(
    searchWord.replace(/^#+|[\p{C}\p{Z}]/gu, "")
  );
  const wordInputEncodedAt = encodeURIComponent(
    searchWord.replace(/^@+|[\p{C}\p{Z}]/gu, "")
  );

  switch (domainItem.type) {
    case 1:
      return searchWord
        ? `https://${domainItem.domain}${domainItem.queryBefore}${wordInputEncoded}`
        : `https://${domainItem.domain}`;
    case 2:
      return searchWord
        ? `https://${domainItem.domain}${domainItem.queryBefore}${wordInputEncoded}${domainItem.queryAfter}`
        : `https://${domainItem.domain}${domainItem.directory}`;
    case 3:
      return searchWord
        ? `https://${domainItem.domain}${domainItem.directory}${domainItem.queryBefore}${wordInputEncoded}${domainItem.queryAfter}`
        : `https://${domainItem.domain}${domainItem.directory}`;
    case 4:
      return searchWord
        ? `https://${domainItem.subDomain}${domainItem.domain}${domainItem.queryBefore}${wordInputEncoded}`
        : `https://${domainItem.domain}`;
    case 5:
      return searchWord
        ? `https://${domainItem.domain}${domainItem.queryBefore}${wordInputEncoded}${domainItem.queryAfter}`
        : `https://${domainItem.domain}`;
    case 6:
      if (searchWord.match(/^#/)) {
        return `https://${domainItem.domain}${domainItem.queryAlt}${wordInputEncodedHash}`;
      } else if (searchWord.match(/^@/)) {
        return `https://${domainItem.domain}${wordInputEncodedAt}`;
      } else if (searchWord) {
        return `https://${domainItem.domain}${domainItem.queryBefore}${wordInputEncoded}`;
      }
      return `https://${domainItem.domain}`;
    case 7:
      if (searchWord.match(/^#/)) {
        return `https://${domainItem.domain}${domainItem.queryBefore}${wordInputEncodedHash}`;
      } else if (searchWord.match(/^@/)) {
        return `https://${domainItem.domain}${domainItem.queryAlt}${wordInputEncodedAt}`;
      } else if (searchWord) {
        return `https://${domainItem.domain}${domainItem.queryBefore}${wordInputEncoded}${domainItem.queryAfter}`;
      }
      return `https://${domainItem.domain}`;
    default:
      // デフォルトはGoogle検索
      const encodedQuery = encodeURIComponent(
        searchWord.replace(/^[\p{C}\p{Z}]+|[\p{C}\p{Z}]+$/gu, "")
      );
      return searchWord
        ? `https://www.google.co.jp/search?q=${encodedQuery}`
        : "https://www.google.co.jp/";
  }
}; 