"use client";

import React from 'react';
import ResetButton from './ResetButton';
import { useDefaultSearchSettings } from 'hooks/useDefaultSearchSettings';
import { useButtonList } from 'hooks/useButtonList';
import { DomainItem } from 'types';

export default function SelectorSettingsArea() {
  const { defaultSearch, saveDefaultSearch, isLoading } = useDefaultSearchSettings();
  const { buttonList } = useButtonList();

  const handleSearchSiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedButton = buttonList.find((button: DomainItem) => button.name === event.target.value);
    if (selectedButton) {
      saveDefaultSearch(selectedButton);
    }
  };

  return (
    <div className="rounded-lg p-4 mx-4 w-full max-w-2xl border-2 border-solid border-(--search-bar-border)">
      <h2 className="flex items-center mb-4 pb-4 w-full border-b-2 border-solid border-(--search-bar-border)">
        <span className="icon-[mdi--settings-outline] text-(--text-color) mr-1 w-7 h-7"></span>
        <span className="text-lg font-bold">設定</span>
      </h2>

      <div className="flex flex-col items-start justify-start w-full mt-6">
        <div className="flex items-center justify-start w-full">
          <h3 className="text-md font-bold mr-4">デフォルトの検索サイト</h3>
          <select
            value={defaultSearch?.name || ''}
            onChange={handleSearchSiteChange}
            className="border border-(--search-bar-border) rounded px-2 py-1 bg-(--background-color) text-(--text-color)"
            disabled={isLoading}
            aria-label="デフォルトの検索サイトを選択"
          >
            <option value="">選択してください</option>
            {buttonList.map((button: DomainItem) => (
              <option key={button.name} value={button.name}>
                {button.name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm mt-2">エンターキーを押したときの検索サイトを変更します。</p>
      </div>
      <div className="flex flex-col items-start justify-start w-full mt-6">
        <div className="flex items-center justify-start w-full">
          <h3 className="text-md font-bold mr-4">タブの開き方</h3>
          <p>ここにセレクトボタンを設置</p>
        </div>
        <p className="text-sm mt-2">新しいタブで開くか、現在のタブで開くかを選択します。</p>
      </div>
      <div className="flex flex-col items-start justify-start w-full mt-4">
        <div className="flex items-center justify-start w-full">
          <h3 className="text-md font-bold mr-4">保存データの初期化</h3>
          <ResetButton />
        </div>
        <p className="text-sm mt-2">データの初期化が完了すると、ボタン配置は初期状態にリセットされます。</p>
      </div>
    </div>
  );
}
