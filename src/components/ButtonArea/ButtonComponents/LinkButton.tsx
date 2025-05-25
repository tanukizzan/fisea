"use client";

import { useSearch } from "../../SearchArea/SearchContext";
import { useCallback } from "react";
import { DomainItem } from 'types';
import { generateSearchUrl } from 'utils/searchUrlGenerator';
import { useTabOpenSettings } from 'hooks/useTabOpenSettings';

export const LinkButton: React.FC<DomainItem> = ({
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
  const { tabOpenType } = useTabOpenSettings();

  const handleClick = useCallback(() => {
    const url = generateSearchUrl(wordInput, {
      type,
      name,
      domain,
      subDomain,
      directory,
      queryBefore,
      queryAfter,
      queryAlt,
    });
    if (url) {
      window.open(url, tabOpenType === 'new' ? '_blank' : '_self', "noopener,noreferrer");
    }
  }, [type, name, domain, subDomain, directory, queryBefore, queryAfter, queryAlt, wordInput, tabOpenType]);

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
