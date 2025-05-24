"use client";

import React, { useState } from "react";
import { useSettings } from "contexts/SettingsContext";
import { useRouter } from "next/navigation";

// カテゴリアイコンのマッピング
const categoryIconMap: Record<string, string> = {
  Google: "icon-[cib--google]",
  Search: "icon-[octicon--search-16]",
  AI: "icon-[octicon--light-bulb-16]",
  Shopping: "icon-[mdi--shopping-cart]",
  Social: "icon-[octicon--hash-16]",
  Other: "icon-[mdi--folder]",
};

export default function SettingsArea() {
  const { categories, loading, toggleCategory, toggleButton } = useSettings();
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center my-8">読み込み中...</div>
    );
  }

  const toggleExpanded = (categoryIndex: number) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryIndex)) {
        newSet.delete(categoryIndex);
      } else {
        newSet.add(categoryIndex);
      }
      return newSet;
    });
  };

  const handleDeleteIndexedDB = async () => {
    if (!window.confirm('IndexedDBのデータを削除しますか？この操作は取り消せません。')) {
      return;
    }

    setIsDeleting(true);
    try {
      const databases = await window.indexedDB.databases();
      for (const db of databases) {
        if (db.name) {
          await window.indexedDB.deleteDatabase(db.name);
        }
      }
      router.replace('/');
    } catch (error) {
      console.error('IndexedDBの削除中にエラーが発生しました:', error);
      alert('データの削除中にエラーが発生しました。');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center mx-auto my-4 mb-8 max-md:overflow-x-scroll max-md:w-full">
      {categories.map((category, categoryIndex) => {
        const inactiveButtons = category.list.filter((button) => !button.isActive);
        const hasInactiveButtons = inactiveButtons.length > 0;
        const isExpanded = expandedCategories.has(categoryIndex);

        return (
          <div key={categoryIndex} className="flex flex-col">
            <div className={`flex items-start mt-3 max-md:ml-5 ${
              !category.isActive && "opacity-50"
            }`}>
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="flex items-center justify-center w-[2.7em] h-[2.7em] mr-2 text-base font-bold text-(--button-text-color) bg-(--button-color) rounded-full flex-shrink-0 cursor-pointer border-solid border-2 border-(--search-bar-border-hover)"
                title={category.name}
              >
                <span
                  className={`${
                    categoryIconMap[category.name] || "mdi:folder-outline"
                  } w-5 h-5`}
                ></span>
              </button>
              <div className="flex align-center gap-2">
                {category.list
                  .filter((button) => button.isActive)
                  .map((button) => (
                    <div key={button.id} className="relative group">
                      <button
                        className="min-w-18 px-3 py-2 rounded-md whitespace-nowrap bg-(--button-color) text-(--button-text-color) border-2 border-solid border-(--search-bar-border-hover)"
                        disabled={!category.isActive}
                      >
                        {button.name}
                      </button>
                      <button
                        onClick={() => toggleButton(button.id)}
                        className="absolute cursor-pointer -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-(--search-bar-bg) border-solid border-2 border-(--search-bar-border-hover) text-(--button-text-color) rounded-full group-hover:opacity-100 transition-opacity duration-200"
                        title={`${button.name}を無効にする`}
                      >
                        <span className="icon-[mdi--close] w-3 h-3"></span>
                      </button>
                    </div>
                  ))}
              </div>
              {hasInactiveButtons && category.isActive && (
                <button
                  onClick={() => toggleExpanded(categoryIndex)}
                  className="ml-2 flex items-center justify-center w-[2.7em] h-[2.7em] text-base font-bold text-(--button-text-color) bg-(--button-color) rounded-full flex-shrink-0 border-solid border-2 border-(--search-bar-border-hover) cursor-pointer"
                  title={isExpanded ? "無効のボタンを隠す" : "無効のボタンを表示"}
                >
                  {isExpanded ? 
                    <span className={`icon-[mdi--check] w-5 h-5`}></span>
                  : <span className={`icon-[mdi--plus] w-5 h-5`}></span>}
                </button>
              )}
            </div>
            {isExpanded && hasInactiveButtons && category.isActive && (
              <div className="flex flex-wrap max-md:flex-nowrap rounded-md max-w-xl w-full gap-2 mt-2 max-md:ml-5">
                <div className="flex justify-center items-center w-[2.7em] h-[2.7em] text-base font-bold text-(--button-text-color) rounded-full flex-shrink-0">
                  <span className="icon-[mdi--favorite-add-outline] w-6 h-6"></span>
                </div>
                {inactiveButtons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => toggleButton(button.id)}
                    className="px-3 py-2 rounded-md whitespace-nowrap cursor-pointer bg-(--button-color) text-(--button-text-color) border-2 border-dashed border-(--search-bar-border-hover) hover:border-solid"
                    title={`${button.name}を有効にする`}
                  >
                    {button.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleDeleteIndexedDB}
          disabled={isDeleting}
          className="px-4 py-2 rounded-md cursor-pointer bg-red-500 text-white border-2 border-solid border-red-600 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          title="IndexedDBのデータを削除します"
        >
          <span className="icon-[mdi--database-remove] w-5 h-5"></span>
          {isDeleting ? '削除中...' : 'リセットする'}
        </button>
      </div>
    </div>
  );
}
