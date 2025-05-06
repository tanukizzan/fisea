"use client";

import { useSearch } from "../../SearchArea/SearchContext";
import { useCallback } from "react";

interface LinkProps {
  type: number;
  name: string;
  domain: string;
  subDomain?: string;
  directory?: string;
  queryBefore?: string;
  queryAfter?: string;
  queryAlt?: string;
}

export const LinkButton: React.FC<LinkProps> = ({
  type,
  name,
  domain,
  subDomain = "",
  directory = "",
  queryBefore = "",
  queryAfter = "",
  queryAlt = "",
}) => {
  const { wordInput } = useSearch();

  const wordInputEncoded = encodeURIComponent(
    wordInput.replace(/^[\p{C}\p{Z}]+|[\p{C}\p{Z}]+$/gu, "")
  );
  const wordInputEncodedHash = encodeURIComponent(
    wordInput.replace(/^#+|[\p{C}\p{Z}]/gu, "")
  );
  const wordInputEncodedAt = encodeURIComponent(
    wordInput.replace(/^@+|[\p{C}\p{Z}]/gu, "")
  );

  const searchQuery1 = wordInput
    ? `https://${domain}${queryBefore}${wordInputEncoded}`
    : `https://${domain}`;

  const searchQuery2 = wordInput
    ? `https://${domain}${queryBefore}${wordInputEncoded}${queryAfter}`
    : `https://${domain}${directory}`;

  const searchQuery3 = wordInput
    ? `https://${domain}${directory}${queryBefore}${wordInputEncoded}${queryAfter}`
    : `https://${domain}${directory}`;

  const searchQuery4 = wordInput
    ? `https://${subDomain}${domain}${queryBefore}${wordInputEncoded}`
    : `https://${domain}`;

  const searchQuery5 = wordInput
    ? `https://${domain}${queryBefore}${wordInputEncoded}${queryAfter}`
    : `https://${domain}`;

  const searchQuery6 = useCallback(() => {
    if (wordInput.match(/^#/)) {
      return `https://${domain}${queryAlt}${wordInputEncodedHash}`;
    } else if (wordInput.match(/^@/)) {
      return `https://${domain}${wordInputEncodedAt}`;
    } else if (wordInput) {
      return `https://${domain}${queryBefore}${wordInputEncoded}`;
    } else {
      return `https://${domain}`;
    }
  }, [domain, queryAlt, queryBefore, wordInputEncodedHash, wordInputEncodedAt, wordInputEncoded, wordInput]);

  // pixiv用の検索クエリ設定
  const searchQuery7 = useCallback(() => {
    if (wordInput.match(/^#/)) {
      return `https://${domain}${queryBefore}${wordInputEncodedHash}`;
    } else if (wordInput.match(/^@/)) {
      return `https://${domain}${queryAlt}${wordInputEncodedAt}`;
    } else if (wordInput) {
      return `https://${domain}${queryBefore}${wordInputEncoded}${queryAfter}`;
    } else {
      return `https://${domain}`;
    }
  }, [domain, queryAlt, queryBefore, queryAfter, wordInputEncodedHash, wordInputEncodedAt, wordInputEncoded, wordInput]);

  const searchUrl = useCallback(() => {
    switch (true) {
      case type === 1:
        return searchQuery1;
      case type === 2:
        return searchQuery2;
      case type === 3:
        return searchQuery3;
      case type === 4:
        return searchQuery4;
      case type === 5:
        return searchQuery5;
      case type === 6:
        return searchQuery6();
        case type === 7:
        return searchQuery7();
      default:
        console.log("No search query");
        return "";
    }
  }, [type, searchQuery1, searchQuery2, searchQuery3, searchQuery4, searchQuery5, searchQuery6, searchQuery7]);

  const handleClick = useCallback(() => {
    const url = searchUrl();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [searchUrl]);

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center w-auto min-w-18 h-auto bg-(--button-color) text-(--button-text-color) no-underline py-2.5 px-4 mr-2 rounded-md flex-shrink-0 transition-colors duration-200 cursor-pointer hover:text-(--button-text-color-hover)"
      type="button"
    >
      {name}
    </button>
  );
};
