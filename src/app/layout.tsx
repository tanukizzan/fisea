import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "fisea | ファイシ―",
  description: "ファイシ―はよく使うサイトをまとめて検索できるポータルサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
