"use client"

import React from 'react';
import { useSettings } from 'contexts/SettingsContext';

interface SaveButtonProps {
  className?: string;
}

export default function SaveButton({ className = '' }: SaveButtonProps) {
  const { handleSave } = useSettings();

  return (
    <button
      onClick={handleSave}
      className={`flex items-center px-4 py-2 bg-(--fisea-blue) text-(--bg-color) text-sm font-bold rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200 ${className}`}
    >
      <span className="icon-[mdi--check-bold] mr-1"></span>
      保存
    </button>
  );
}
