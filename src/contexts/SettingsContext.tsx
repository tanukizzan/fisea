"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryItem } from 'types';
import buttonListData from 'components/ButtonArea/ButtonComponents/buttonList.json';
import { getButtonData, saveButtonData } from 'utils/indexedDB';

interface SettingsContextType {
  categories: CategoryItem[];
  loading: boolean;
  toggleCategory: (categoryIndex: number) => void;
  toggleButton: (buttonId: string) => void;
  handleSave: () => Promise<void>;
  updateButtonOrder: (categoryIndex: number, oldIndex: number, newIndex: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const initializeData = async () => {
      try {
        const dbData = await getButtonData();
        const orderedData = buttonListData.map(buttonCategory => {
          const dbCategory = dbData.find(cat => cat.name === buttonCategory.name);
          if (dbCategory) {
            return {
              ...dbCategory,
              list: dbCategory.list.map(button => ({
                ...button,
                id: `${buttonCategory.name}-${button.name}`
              }))
            };
          }
          return {
            ...buttonCategory,
            list: buttonCategory.list.map(button => ({
              ...button,
              id: `${buttonCategory.name}-${button.name}`
            }))
          };
        });
        setCategories(orderedData);
      } catch (error) {
        console.error('データ初期化エラー:', error);
        const dataWithIds = buttonListData.map(category => ({
          ...category,
          list: category.list.map(button => ({
            ...button,
            id: `${category.name}-${button.name}`
          }))
        }));
        setCategories(dataWithIds as CategoryItem[]);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

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

  const toggleButton = (buttonId: string) => {
    setCategories(prevCategories => {
      return prevCategories.map(category => {
        const buttonIndex = category.list.findIndex(button => button.id === buttonId);
        if (buttonIndex === -1) return category;

        const button = category.list[buttonIndex];
        const newIsActive = !button.isActive;

        // ボタンの状態を更新
        const updatedButton = {
          ...button,
          isActive: newIsActive
        };

        // リストを更新
        const newList = [...category.list];
        newList[buttonIndex] = updatedButton;

        // 有効化された場合は最後に移動
        if (newIsActive) {
          newList.splice(buttonIndex, 1);
          newList.push(updatedButton);
        }

        return {
          ...category,
          list: newList
        };
      });
    });
  };

  const handleSave = async () => {
    try {
      await saveButtonData(categories);
      router.replace('/');
    } catch (error) {
      console.error('設定保存エラー:', error);
      alert('設定の保存に失敗しました');
      router.replace('/');
    }
  };

  const updateButtonOrder = (categoryIndex: number, oldIndex: number, newIndex: number) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const category = { ...newCategories[categoryIndex] };
      const newList = [...category.list];
      const [movedItem] = newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, movedItem);
      category.list = newList;
      newCategories[categoryIndex] = category;
      return newCategories;
    });
  };

  return (
    <SettingsContext.Provider value={{
      categories,
      loading,
      toggleCategory,
      toggleButton,
      handleSave,
      updateButtonOrder
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 