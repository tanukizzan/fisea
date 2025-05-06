import Link from 'next/link'

export default function SettingsButton() {
  return (
    <div className="group hover:opacity-80 text-(--text-color) text-sm">
      <Link href="/settings" className="flex items-center">
        <span className="icon-[mdi--settings-outline] text-(--text-color) mr-1"></span>
        設定
      </Link>
    </div>
  );
}
