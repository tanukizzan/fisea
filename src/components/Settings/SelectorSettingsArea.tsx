"use client";

import React, { useState } from 'react';
import ResetButton from './ResetButton';
import { useDefaultSearchSettings } from 'hooks/useDefaultSearchSettings';
import { useButtonList } from 'hooks/useButtonList';
import { useTabOpenSettings } from 'hooks/useTabOpenSettings';
import { DomainItem } from 'types';

export default function SelectorSettingsArea() {
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false);
  const { defaultSearch, saveDefaultSearch, isLoading: isDefaultSearchLoading } = useDefaultSearchSettings();
  const { buttonList } = useButtonList();
  const { tabOpenType, saveTabOpenType, isLoading: isTabOpenLoading } = useTabOpenSettings();

  // カテゴリごとにボタンをグループ化
  const groupedButtons = buttonList.reduce((acc, button) => {
    const category = button.category || 'その他';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(button);
    return acc;
  }, {} as Record<string, DomainItem[]>);

  const handleSearchSiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedButton = buttonList.find((button: DomainItem) => button.name === event.target.value);
    if (selectedButton) {
      saveDefaultSearch(selectedButton);
    }
  };

  const handleTabOpenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveTabOpenType(event.target.value as 'new' | 'current');
  };

  return (
    <div className="rounded-lg p-4 mx-4 max-w-xl bg-(--search-bar-bg) border-2 border-solid border-(--search-bar-border)">
      <h2 className="flex items-center mb-4 pb-4 w-full border-b-2 border-solid border-(--search-bar-border)">
        <span className="icon-[mdi--settings-outline] text-(--text-color) mr-1 w-7 h-7"></span>
        <span className="text-lg font-bold">設定</span>
      </h2>

      <div className="flex flex-col items-start justify-start w-full mt-4">
        <div className="flex items-center justify-start w-full">
          <h3 className="text-md font-bold mr-4">デフォルトの検索サイト</h3>
        </div>
          <select
            value={defaultSearch?.name || ''}
            onChange={handleSearchSiteChange}
            className="border border-(--search-bar-border) rounded-md px-2 py-2 mt-2 bg-(--background-color) text-(--text-color)"
            disabled={isDefaultSearchLoading}
            aria-label="デフォルトの検索サイトを選択"
          >
            <option value="">選択してください</option>
            {Object.entries(groupedButtons).map(([category, buttons]) => (
              <optgroup key={category} label={category}>
                {buttons.map((button: DomainItem) => (
                  <option key={button.name} value={button.name}>
                    {button.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        <p className="text-sm mt-2">エンターキーを押したときと、矢印ボタンを押したときの検索サイトを選択します。</p>
      </div>
      <div className="flex flex-col items-start justify-start mt-6">
        <div className="flex flex-col items-start justify-start w-full">
          <h3 className="text-md font-bold mb-2">タブの開き方</h3>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="new"
                checked={tabOpenType === 'new'}
                onChange={handleTabOpenChange}
                className="mr-2"
                disabled={isTabOpenLoading}
              />
              <span>新しいタブで開く</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="current"
                checked={tabOpenType === 'current'}
                onChange={handleTabOpenChange}
                className="mr-2"
                disabled={isTabOpenLoading}
              />
              <span>現在のタブで開く</span>
            </label>
          </div>
        </div>
        <p className="text-sm mt-2">新しいタブで開くか、現在のタブで開くかを選択します。</p>
      </div>
      <div className="flex flex-col items-start justify-start w-full mt-4 p-4 rounded-md border-2 border-(--search-bar-border)">
        <button
          onClick={() => setIsAdvancedSettingsOpen(!isAdvancedSettingsOpen)}
          className="flex items-center justify-start w-full text-left cursor-pointer"
          type="button"
        >
          {isAdvancedSettingsOpen ? 
            <span className={`icon-[mdi--chevron-up] text-(--text-color) w-5 h-5`}></span>
          : <span className={`icon-[mdi--chevron-down] text-(--text-color) w-5 h-5`}></span>}
          <h3 className="text-md font-bold ml-2">高度な設定</h3>
        </button>
        {isAdvancedSettingsOpen && (
          <div className="w-full mt-4">
            <h3 className="text-md font-bold mb-2">保存データのリセット</h3>
            <ResetButton />
            <p className="text-sm mt-2">データのリセットが完了すると、ボタン配置と検索設定は初期状態に戻ります。</p>
          </div>
        )}
      </div>
    </div>
  );
}
