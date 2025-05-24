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
  toggleButton: (categoryIndex: number, buttonIndex: number) => void;
  handleSave: () => Promise<void>;
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

  const handleSave = async () => {
    try {
      await saveButtonData(categories);
      // alert('設定を保存しました');
      router.replace('/');
    } catch (error) {
      console.error('設定保存エラー:', error);
      alert('設定の保存に失敗しました');
      router.replace('/');
    }
  };

  return (
    <SettingsContext.Provider value={{
      categories,
      loading,
      toggleCategory,
      toggleButton,
      handleSave
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