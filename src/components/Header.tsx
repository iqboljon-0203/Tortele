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
    <header className="px-4 pt-3 pb-2.5 flex items-center justify-between bg-[#420F1D]/90 sticky top-0 z-30 border-b border-white/10 backdrop-blur-md text-white">
      {/* Brand vector logo in white/gold theme */}
      <div className="flex items-center gap-2">
        <TorteleLogo variant="horizontal" theme="dark" size={36} />
      </div>

      {/* Action buttons & Bonus Pill */}
      <div className="flex items-center gap-2">
        {/* Quick Bonus Pill (Screen 3 style) */}
        <button
          onClick={openQRModal}
          className="flex items-center gap-1.5 bg-[#F5A623] hover:bg-[#E09418] px-3 py-1.5 rounded-full text-xs font-black text-[#2A0A13] active:scale-95 transition-all shadow-md"
          title="Bonus QR kod"
        >
          <span>💎</span>
          <span>{formatPrice(bonusBalance).replace(" so'm", "")}</span>
        </button>

        <button
          onClick={() => setActiveTab("menu")}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center active:scale-90 transition-transform"
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
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Sozlamalar"
        >
          <Settings className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </header>
  );
};
