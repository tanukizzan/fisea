"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function ResetButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteIndexedDB = async () => {
    if (!window.confirm('データを削除しますか？この操作は取り消せません。')) {
      return;
    }

    setIsDeleting(true);
    try {
      const databases = await window.indexedDB.databases();
      for (const db of databases) {
        if (db.name) {
          await window.indexedDB.deleteDatabase(db.name);
        }
      }
      router.replace('/');
    } catch (error) {
      console.error('IndexedDBの削除中にエラーが発生しました:', error);
      alert('データの削除中にエラーが発生しました。');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteIndexedDB}
        disabled={isDeleting}
        className="px-4 py-2 text-sm font-bold rounded-md cursor-pointer bg-(--button-color) text-red-600 border-2 border-solid border-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        title="データをリセットします"
      >
        <span className="icon-[mdi--database-remove] w-4 h-4"></span>
        {isDeleting ? '削除中...' : 'リセットする'}
      </button>
    </>
  );
} 