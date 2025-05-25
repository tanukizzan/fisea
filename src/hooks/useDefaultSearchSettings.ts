import { useState, useEffect } from 'react';
import { getSettingsData, saveSettingsData } from 'utils/indexedDB';
import { DomainItem } from 'types';

export const useDefaultSearchSettings = () => {
  const [defaultSearch, setDefaultSearch] = useState<DomainItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getSettingsData();
        if (settings.defaultSearch) {
          setDefaultSearch(settings.defaultSearch);
        }
      } catch (error) {
        console.error('設定の読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveDefaultSearch = async (data: DomainItem) => {
    try {
      await saveSettingsData({ defaultSearch: data });
      setDefaultSearch(data);
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    }
  };

  return { defaultSearch, saveDefaultSearch, isLoading };
}; 