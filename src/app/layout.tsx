import type { Metadata } from "next";
import { SearchProvider } from "components/SearchArea/SearchContext";

import "./globals.css";

const SITE_TITLE = "fisea | ファイシ―";
const SITE_TITLE_SHORT = "fisea";
const SITE_DESCRIPTION = "ファイシ―はよく使うサイトをまとめて検索できるポータルサイトです。複数のサイトを一度に検索し、効率的に情報を収集できます。";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE_SHORT}`,
  },
  description: SITE_DESCRIPTION,
  keywords: "検索, ポータル, マルチ検索, 効率的, 情報収集",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head />
      <body>
        <SearchProvider>
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
