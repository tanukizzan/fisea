"use client"

import React, { useMemo, useState, useEffect } from 'react';
import { LinkButton } from './ButtonComponents/LinkButton';
import domainList from './ButtonComponents/domainList.json';
import buttonListData from './ButtonComponents/buttonList.json';
import { syncButtonData } from '../../utils/indexedDB';
import { DomainItem, CategoryItem, categoryIconMap } from 'types';

export default function ButtonArea() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // データの初期化とIndexedDBとの同期
  useEffect(() => {
    const initializeData = async () => {
      try {
        // サーバーデータとIndexedDBを比較・同期して最新データを取得
        const syncedData = await syncButtonData(buttonListData as CategoryItem[]);
        setCategories(syncedData);
      } catch (error) {
        console.error('データ初期化エラー:', error);
        // エラー時はサーバーデータを使用
        setCategories(buttonListData as CategoryItem[]);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // domainList をマップとして準備
  const domainMap = useMemo(() => {
    const map = new Map<string, DomainItem>();
    (domainList as DomainItem[]).forEach(item => {
      map.set(item.name, item);
    });
    return map;
  }, []);

  // アクティブなカテゴリをステート経由で取得
  const activeCategories = useMemo(() => {
    return categories.filter(category => category.isActive);
  }, [categories]);

  if (loading) {
    return <div className="flex justify-center items-center my-8">読み込み中...</div>;
  }

  return (
    <div className="flex flex-col justify-center mx-auto pt-4 pb-12 sm:overflow-x-visible overflow-x-auto max-sm:w-full">
      {activeCategories.map((category, index) => (
        <div key={index} className="flex justify-start items-center mt-3 max-sm:ml-5">
          <div className="flex justify-center items-center w-[2.7em] h-[2.7em] mr-2 text-base font-bold text-(--button-text-color) bg-(--button-color) border-1 border-(--button-color) rounded-full flex-shrink-0">
            <span className={`${categoryIconMap[category.name] || "mdi:folder-outline"} w-5 h-5`}></span>
          </div>
          <div className="flex justify-center items-center">
            <ul className="flex flex-nowrap sm:flex-wrap max-w-[34rem] whitespace-nowrap list-none p-0 m-0 gap-2">
              {category.list
                .filter(button => button.isActive)
                .map((button, buttonIndex) => {
                  if (domainMap.has(button.name)) {
                    const domainItem = domainMap.get(button.name)!;
                    return (
                      <li key={buttonIndex}>
                        <LinkButton
                          type={domainItem.type}
                          name={domainItem.name}
                          domain={domainItem.domain}
                          subDomain={domainItem.subDomain}
                          directory={domainItem.directory}
                          queryBefore={domainItem.queryBefore}
                          queryAfter={domainItem.queryAfter}
                          queryAlt={domainItem.queryAlt}
                        />
                      </li>
                    );
                  }
                  return null;
                })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
