import { CategoryItem, DomainItem } from 'types';

const DB_NAME = 'fiseaDB';
const DB_VERSION = 2;
const BUTTON_STORE = 'buttonData';
const DEFAULT_SEARCH_STORE = 'defaultSearch';

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
      if (db.objectStoreNames.contains(DEFAULT_SEARCH_STORE)) {
        db.deleteObjectStore(DEFAULT_SEARCH_STORE);
      }
      
      // ストアを新規作成
      db.createObjectStore(BUTTON_STORE, { keyPath: 'name' });
      db.createObjectStore(DEFAULT_SEARCH_STORE);
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

// デフォルト検索サイトの設定を取得
export const getDefaultSearch = async (): Promise<DomainItem | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DEFAULT_SEARCH_STORE, 'readonly');
    const store = transaction.objectStore(DEFAULT_SEARCH_STORE);
    const request = store.get('default-search-settings');
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result || null);
  });
};

// デフォルト検索サイトの設定を保存
export const saveDefaultSearch = async (data: DomainItem): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(DEFAULT_SEARCH_STORE, 'readwrite');
  const store = transaction.objectStore(DEFAULT_SEARCH_STORE);
  
  store.put(data, 'default-search-settings');
  
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
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
