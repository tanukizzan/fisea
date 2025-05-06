import Link from 'next/link'

export default function SaveButton() {
  return (
    <div className="group hover:opacity-80 text-(--text-color) text-sm">
      <Link href="/" className="flex items-center">
        <span className="icon-[mdi--check] text-(--text-color) mr-1"></span>
        保存
      </Link>
    </div>
  );
}
