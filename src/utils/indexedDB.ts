import { CategoryItem, DomainItem } from 'types';

const DB_NAME = 'fiseaDB';
const DB_VERSION = 2; // バージョンを上げて、ストアの変更をトリガー
const BUTTON_STORE = 'buttonData';
const SETTINGS_STORE = 'settingsData';

type SettingsData = {
  defaultSearch?: DomainItem;
  tabOpenType?: 'new' | 'current';
};

// IndexedDBへの接続を開く
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      
      // 既存のストアを削除
      if (db.objectStoreNames.contains(BUTTON_STORE)) {
        db.deleteObjectStore(BUTTON_STORE);
      }
      if (db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.deleteObjectStore(SETTINGS_STORE);
      }
      
      // ストアを新規作成
      db.createObjectStore(BUTTON_STORE, { keyPath: 'name' });
      db.createObjectStore(SETTINGS_STORE);
    };
  });
};

// ボタンデータをIndexedDBから取得
export const getButtonData = async (): Promise<CategoryItem[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(BUTTON_STORE, 'readonly');
    const store = transaction.objectStore(BUTTON_STORE);
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// ボタンデータをIndexedDBに保存
export const saveButtonData = async (data: CategoryItem[]): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(BUTTON_STORE, 'readwrite');
  const store = transaction.objectStore(BUTTON_STORE);
  
  data.forEach(category => {
    store.put(category);
  });
  
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

// 設定データを取得
export const getSettingsData = async (): Promise<SettingsData> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readonly');
    const store = transaction.objectStore(SETTINGS_STORE);
    const request = store.get('settings');
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || {});
  });
};

// 設定データを保存
export const saveSettingsData = async (data: Partial<SettingsData>): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readwrite');
    const store = transaction.objectStore(SETTINGS_STORE);
    
    // 既存の設定を取得
    const getRequest = store.get('settings');
    
    getRequest.onsuccess = () => {
      // 新しい設定と既存の設定をマージ
      const existingSettings = getRequest.result || {};
      const updatedSettings = {
        ...existingSettings,
        ...data
      };
      
      // 更新された設定を保存
      const putRequest = store.put(updatedSettings, 'settings');
      
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };
    
    getRequest.onerror = () => reject(getRequest.error);
    
    transaction.onerror = () => reject(transaction.error);
  });
};

// サーバーデータとIndexedDBデータを比較して更新
export const syncButtonData = async (serverData: CategoryItem[]): Promise<CategoryItem[]> => {
  try {
    const dbData = await getButtonData();
    
    // IndexedDBにデータがなければ、サーバーデータをそのまま保存して返す
    if (dbData.length === 0) {
      await saveButtonData(serverData);
      return serverData;
    }
    
    // 既存のカテゴリとボタンを更新
    const updatedData = serverData.map(serverCategory => {
      const existingCategory = dbData.find(cat => cat.name === serverCategory.name);
      
      // カテゴリが存在する場合
      if (existingCategory) {
        // 既存のリストにサーバーの新しいボタンを追加
        const updatedList = [...existingCategory.list];
        
        serverCategory.list.forEach(serverButton => {
          if (!updatedList.some(btn => btn.name === serverButton.name)) {
            updatedList.push(serverButton);
          }
        });
        
        return {
          ...existingCategory,
          list: updatedList
        };
      }
      
      // カテゴリが存在しない場合は新規追加
      return serverCategory;
    });
    
    // サーバーデータにないカテゴリを追加
    dbData.forEach(dbCategory => {
      if (!updatedData.some(cat => cat.name === dbCategory.name)) {
        updatedData.push(dbCategory);
      }
    });
    
    // 更新されたデータを保存
    await saveButtonData(updatedData);
    return updatedData;
  } catch (error) {
    console.error('IndexedDB同期エラー:', error);
    return serverData; // エラー時はサーバーデータを返す
  }
};
