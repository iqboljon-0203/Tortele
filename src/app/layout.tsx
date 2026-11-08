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
  themeColor: "#FAF6F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      suppressHydrationWarning
      className="h-full bg-[#FAF6F4]"
    >
      <head>
        {/* Telegram WebApp SDK */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col items-center justify-start bg-[#FAF6F4] text-[#2B1A21] antialiased"
      >
        {/* Wrapper to constrain layout to mobile screen (max-w-md, 9:16 app frame) */}
        <div className="w-full max-w-md min-h-screen relative flex flex-col shadow-2xl bg-[#FAF6F4]">
          {children}
        </div>
      </body>
    </html>
  );
}
