"use client";

import React from "react";
import Image from "next/image";
import { Search, Bell, Settings } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";

export const Header: React.FC = () => {
  const { userName, openSettingsModal, setActiveTab } = useApp();

  return (
    <header className="px-4 pt-3 pb-2.5 flex items-center justify-between bg-[#FAF6F4] sticky top-0 z-30 border-b border-[#F0E1E6]/60 backdrop-blur-md">
      {/* Brand logo & Greeting */}
      <div className="flex items-center gap-2.5">
        <div className="w-11 h-11 rounded-2xl bg-white p-0.5 border border-[#F0E1E6] shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={BRAND_CONFIG.logoUrl}
            alt={BRAND_CONFIG.brandName}
            width={44}
            height={44}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-extrabold text-[#2B1A21] tracking-tight">
              Salom, {userName}!
            </span>
            <span className="text-sm">🌸</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-[#846B74]">
              {BRAND_CONFIG.city} • Bento 2-3 soatda! 🎂
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setActiveTab("menu")}
          className="w-9 h-9 rounded-2xl bg-white shadow-sm border border-[#F0E1E6] flex items-center justify-center text-[#301D24] active:scale-90 transition-transform"
          aria-label="Qidiruv"
        >
          <Search className="w-4 h-4 stroke-[2.2]" />
        </button>

        <a
          href={`https://instagram.com/${BRAND_CONFIG.instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Instagram"
          title={`${BRAND_CONFIG.followersCount} obunachi`}
        >
          <InstagramIcon className="w-4 h-4" />
        </a>

        <button
          onClick={openSettingsModal}
          className="w-9 h-9 rounded-2xl bg-white shadow-sm border border-[#F0E1E6] flex items-center justify-center text-[#301D24] active:scale-90 transition-transform"
          aria-label="Sozlamalar"
        >
          <Settings className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </header>
  );
};
