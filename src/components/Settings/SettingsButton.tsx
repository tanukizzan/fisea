"use client"

import { useRouter } from 'next/navigation';

export default function SettingsButton() {
  const router = useRouter()
  return (
    <div className="group hover:opacity-80 text-(--text-color) text-sm">
      <button type="button" onClick={() => router.replace('/settings')} className="flex items-center">
        <span className="icon-[mdi--settings-outline] text-(--text-color) mr-1"></span>
        設定
      </button>
    </div>
  );
}
