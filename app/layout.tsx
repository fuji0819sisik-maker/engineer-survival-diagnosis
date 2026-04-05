import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "エンジニア生存診断 | あなたのIT業界での寿命とキャリアを判定",
  description: "あなたのスキルや経験から、IT業界での「生存寿命」をAIが診断。2026年以降のエンジニア市場で生き残るための強みと課題を可視化し、キャリア形成のアドバイスを提示します。",
  keywords: ["エンジニア診断", "キャリア診断", "ITエンジニア", "市場価値", "生存戦略"],
  verification: {
    google: "4T2hxXFv5760-Tj3gN7aG82uzPokgjGT5gWraRcnvec",
  },
  openGraph: {
    title: "エンジニア生存診断",
    description: "あなたのエンジニアとしての寿命、あと何年？",
    url: "https://engineer-survival-diagnosis.vercel.app",
    siteName: "エンジニア生存診断",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "エンジニア生存診断",
    description: "あなたのエンジニアとしての寿命、あと何年？",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="impact-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7160988-a0a1-489a-8bf9-ab47a5d6cdcb1.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
