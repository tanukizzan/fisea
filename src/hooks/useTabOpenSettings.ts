import { useState, useEffect } from 'react';
import { getSettingsData, saveSettingsData } from 'utils/indexedDB';

type TabOpenType = 'new' | 'current';

export const useTabOpenSettings = () => {
  const [tabOpenType, setTabOpenType] = useState<TabOpenType>('new');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getSettingsData();
        if (settings.tabOpenType) {
          setTabOpenType(settings.tabOpenType);
        }
      } catch (error) {
        console.error('設定の読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveTabOpenType = async (type: TabOpenType) => {
    try {
      await saveSettingsData({ tabOpenType: type });
      setTabOpenType(type);
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    }
  };

  return { tabOpenType, saveTabOpenType, isLoading };
}; 