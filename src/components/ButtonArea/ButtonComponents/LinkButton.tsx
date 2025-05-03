"use client";

import { useSearch } from "../../SearchArea/SearchContext";

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

  const searchQuery6 = () => {
    if (wordInput.match(/^#/)) {
      return `https://${domain}${queryAlt}${wordInputEncodedHash}`;
    } else if (wordInput.match(/^@/)) {
      return `https://${domain}${wordInputEncodedAt}`;
    } else if (wordInput) {
      return `https://${domain}${queryBefore}${wordInputEncoded}`;
    } else {
      return `https://${domain}`;
    }
  };

  const searchUrl = () => {
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
      default:
        console.log("No search query");
        return "";
    }
  };

  return (
    <a
      href={searchUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-auto min-w-18 h-auto bg-(--button-color) text-(--button-text-color) no-underline py-2.5 px-4 mr-2 rounded-md flex-shrink-0 transition-colors duration-200 hover:text-(--button-text-color-hover)"
    >
      {name}
    </a>
  );
};
