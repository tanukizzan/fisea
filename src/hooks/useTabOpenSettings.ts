import { useState, useEffect } from 'react';
import { openDB } from 'utils/indexedDB';

const TAB_OPEN_KEY = 'tabOpenType';

type TabOpenType = 'new' | 'current';

export const useTabOpenSettings = () => {
  const [tabOpenType, setTabOpenType] = useState<TabOpenType>('new');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction('settings', 'readonly');
        const store = transaction.objectStore('settings');
        const request = store.get(TAB_OPEN_KEY);

        request.onerror = () => {
          console.error('設定の読み込みに失敗しました:', request.error);
          setIsLoading(false);
        };

        request.onsuccess = () => {
          const savedType = request.result;
          if (savedType) {
            setTabOpenType(savedType);
          }
          setIsLoading(false);
        };
      } catch (error) {
        console.error('設定の読み込みに失敗しました:', error);
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveTabOpenType = async (type: TabOpenType) => {
    try {
      const db = await openDB();
      const transaction = db.transaction('settings', 'readwrite');
      const store = transaction.objectStore('settings');
      
      store.put(type, TAB_OPEN_KEY);
      
      return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => {
          setTabOpenType(type);
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    }
  };

  return { tabOpenType, saveTabOpenType, isLoading };
}; 