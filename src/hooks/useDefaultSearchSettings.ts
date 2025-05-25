import { useState, useEffect } from 'react';
import { DomainItem } from 'types';
import { openDB } from 'utils/indexedDB';

const STORE_NAME = 'defaultSearch';
const KEY = 'default-search-settings';

export const useDefaultSearchSettings = () => {
  const [defaultSearch, setDefaultSearch] = useState<DomainItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(KEY);

        getRequest.onsuccess = () => {
          setDefaultSearch(getRequest.result || null);
          setIsLoading(false);
        };

        getRequest.onerror = () => {
          console.error('設定の読み込みに失敗しました');
          setIsLoading(false);
        };
      } catch (error) {
        console.error('IndexedDBの初期化に失敗しました:', error);
        setIsLoading(false);
      }
    };

    initDB();
  }, []);

  const saveDefaultSearch = async (search: DomainItem) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.put(search, KEY);
      setDefaultSearch(search);
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    }
  };

  return { defaultSearch, saveDefaultSearch, isLoading };
}; 