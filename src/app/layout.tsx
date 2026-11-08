import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand";

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.brandName} - Luxury Pâtisserie`,
  description: `${BRAND_CONFIG.tagline} • Celebrate Sweet Moments`,
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
  themeColor: "#420F1D",
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
      className="h-full bg-[#2A0A13]"
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
        className="min-h-full flex flex-col items-center justify-start bg-[#2A0A13] text-[#2A0A13] antialiased"
      >
        {/* Constrain layout to mobile screen (max-w-md, 9:16 app frame) */}
        <div className="w-full max-w-md min-h-screen relative flex flex-col shadow-2xl bg-[#420F1D] overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
