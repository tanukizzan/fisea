"use client"

import React, { useState, useEffect } from 'react';
import { CategoryItem } from 'types';
import buttonListData from '../ButtonArea/ButtonComponents/buttonList.json';
import { getButtonData, saveButtonData } from '../../utils/indexedDB';

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
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // データの初期化
  useEffect(() => {
    const initializeData = async () => {
      try {
        const dbData = await getButtonData();
        // buttonList.jsonの順序を維持するために、dbDataをbuttonListDataの順序に合わせて並び替え
        const orderedData = buttonListData.map(buttonCategory => {
          const dbCategory = dbData.find(cat => cat.name === buttonCategory.name);
          return dbCategory || buttonCategory;
        });
        setCategories(orderedData);
      } catch (error) {
        console.error('データ初期化エラー:', error);
        setCategories(buttonListData as CategoryItem[]);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // カテゴリの有効/無効を切り替え
  const toggleCategory = (categoryIndex: number) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex] = {
        ...newCategories[categoryIndex],
        isActive: !newCategories[categoryIndex].isActive
      };
      return newCategories;
    });
  };

  // ボタンの有効/無効を切り替え
  const toggleButton = (categoryIndex: number, buttonIndex: number) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.map((category, idx) => {
        if (idx === categoryIndex) {
          return {
            ...category,
            list: category.list.map((button, btnIdx) => {
              if (btnIdx === buttonIndex) {
                return {
                  ...button,
                  isActive: !button.isActive
                };
              }
              return button;
            })
          };
        }
        return category;
      });
      return newCategories;
    });
  };

  // 設定を保存
  const handleSave = async () => {
    try {
      await saveButtonData(categories);
      alert('設定を保存しました');
    } catch (error) {
      console.error('設定保存エラー:', error);
      alert('設定の保存に失敗しました');
    }
  };

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
      <div className="flex justify-end mt-4">
        {/* 保存ボタン（仮置き） TODO: 保存ボタンを外に出す */}
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-(--button-color) text-(--button-text-color) rounded-md hover:opacity-80 transition-opacity duration-200"
        >
          <span className="icon-[mdi--check] mr-1"></span>
          保存
        </button>
      </div>
    </div>
  );
}