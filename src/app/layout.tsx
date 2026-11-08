import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.brandName} - Telegram WebApp`,
  description: `${BRAND_CONFIG.tagline} • Eng shirin tortlar va yangi pishiriqlar`,
  applicationName: BRAND_CONFIG.brandName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: BRAND_CONFIG.brandName,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F7F3F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="h-full bg-[#F7F3F0]">
      <head>
        {/* Telegram WebApp script */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col items-center justify-start bg-[#F7F3F0] text-[#2D1E16] antialiased">
        {/* Wrapper to constrain layout to mobile screen (max-w-md, 9:16 app frame) */}
        <div className="w-full max-w-md min-h-screen relative flex flex-col shadow-2xl bg-[#F7F3F0]">
          {children}
        </div>
      </body>
    </html>
  );
}
