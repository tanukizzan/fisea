"use client"

import React from 'react';
import { useSettings } from 'contexts/SettingsContext';

// カテゴリアイコンのマッピング
const categoryIconMap: Record<string, string> = {
  "Google": "icon-[cib--google]",
  "Search": "icon-[octicon--search-16]",
  "AI": "icon-[octicon--light-bulb-16]",
  "Shopping": "icon-[mdi--shopping-cart]",
  "Social": "icon-[octicon--hash-16]",
  "Other": "icon-[mdi--folder]"
};

export default function SettingsArea() {
  const { categories, loading, toggleCategory, toggleButton } = useSettings();

  if (loading) {
    return <div className="flex justify-center items-center my-8">読み込み中...</div>;
  }

  return (
    <div className="flex flex-col justify-center mx-auto my-4 mb-8 overflow-x-scroll max-md:w-full">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className={`flex items-center mt-3 max-md:ml-5 ${!category.isActive && 'opacity-50'}`}>
          <button
            onClick={() => toggleCategory(categoryIndex)}
            className="flex items-center justify-center w-[2.7em] h-[2.7em] mr-2 text-base font-bold text-(--button-text-color) bg-(--button-color) rounded-full flex-shrink-0 cursor-pointer border-solid border-2 border-(--search-bar-border-hover)"
            title={category.name}
          >
            <span className={`${categoryIconMap[category.name] || "mdi:folder-outline"} w-5 h-5`}></span>
          </button>
          <div className="flex align-center gap-2">
            {category.list.map((button, buttonIndex) => (
              <button
                key={buttonIndex}
                onClick={() => toggleButton(categoryIndex, buttonIndex)}
                className={`px-3 py-2 rounded-md shrink-0 cursor-pointer bg-(--button-color) text-(--button-text-color) border-2 border-(--search-bar-border-hover) ${
                  button.isActive ? 'border-solid' : 'border-dashed border-2 opacity-60'
                }`}
                disabled={!category.isActive}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}