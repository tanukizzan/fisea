import React from 'react';

interface ResetButtonProps {
  isDeleting: boolean;
  onDelete: () => void;
}

export default function ResetButton({ isDeleting, onDelete }: ResetButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onDelete}
        disabled={isDeleting}
        className="px-4 py-2 rounded-md cursor-pointer bg-red-500 text-white border-2 border-solid border-red-600 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        title="IndexedDBのデータを削除します"
      >
        <span className="icon-[mdi--database-remove] w-5 h-5"></span>
        {isDeleting ? '削除中...' : 'リセットする'}
      </button>
    </div>
  );
} 