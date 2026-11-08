import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: `${BRAND_CONFIG.brandName} - Shaxsiy qandolat ustasi`,
  description: BRAND_CONFIG.tagline,
  applicationName: BRAND_CONFIG.brandName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: BRAND_CONFIG.brandName,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F8F5F3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning className={`${manrope.variable} h-full`}>
      <head>
        {/* Telegram WebApp SDK */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col items-center justify-start antialiased">
        <div className="w-full max-w-md min-h-screen relative flex flex-col bg-page overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
