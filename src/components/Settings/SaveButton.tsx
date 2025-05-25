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
      className={`flex items-center px-6 py-3 bg-(--fisea-blue) text-white text-md font-bold rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200 ${className}`}
    >
      <span className="icon-[mdi--check-bold] mr-1"></span>
      保存
    </button>
  );
}
