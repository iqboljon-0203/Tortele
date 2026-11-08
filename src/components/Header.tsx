"use client";

import React from "react";
import { Search, Bell, Settings } from "lucide-react";
import { TorteleLogo } from "./TorteleLogo";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice } from "@/utils/telegram";

export const Header: React.FC = () => {
  const { openSettingsModal, setActiveTab, bonusBalance, openQRModal } = useApp();

  return (
    <header className="px-4 pt-3 pb-2.5 flex items-center justify-between bg-[#FAF6F4] sticky top-0 z-30 border-b border-[#F0E1E6]/60 backdrop-blur-md">
      {/* Brand vector logo */}
      <div className="flex items-center gap-2">
        <TorteleLogo variant="horizontal" size={36} />
      </div>

      {/* Action buttons & Bonus Pill */}
      <div className="flex items-center gap-2">
        {/* Quick Bonus Pill (Exact Smorodina screen 3 element) */}
        <button
          onClick={openQRModal}
          className="flex items-center gap-1 bg-[#FDF0F4] border border-[#F0E1E6] hover:border-[#D47A96] px-2.5 py-1.5 rounded-full text-xs font-black text-[#B85474] active:scale-95 transition-all shadow-2xs"
          title="Bonus QR kod"
        >
          <span className="text-xs">💎</span>
          <span>{formatPrice(bonusBalance).replace(" so'm", "")}</span>
        </button>

        <button
          onClick={() => setActiveTab("menu")}
          className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#F0E1E6] flex items-center justify-center text-[#301D24] active:scale-90 transition-transform"
          aria-label="Qidiruv"
        >
          <Search className="w-4 h-4 stroke-[2.2]" />
        </button>

        <a
          href={`https://instagram.com/${BRAND_CONFIG.instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Instagram"
          title={`${BRAND_CONFIG.followersCount} obunachi`}
        >
          <InstagramIcon className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={openSettingsModal}
          className="w-8 h-8 rounded-full bg-white shadow-xs border border-[#F0E1E6] flex items-center justify-center text-[#301D24] active:scale-90 transition-transform"
          aria-label="Sozlamalar"
        >
          <Settings className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </header>
  );
};
