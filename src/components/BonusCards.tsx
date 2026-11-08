"use client";

import React from "react";
import { QrCode, ArrowUpRight, Sparkles, ChevronRight, History, Users, Send } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice } from "@/utils/telegram";

export const BonusCards: React.FC = () => {
  const { bonusBalance, openQRModal } = useApp();

  return (
    <div className="px-4 pt-2.5 pb-2">
      {/* 2 Bonus Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Left Card: Bonus Balance & QR Code trigger */}
        <button
          onClick={openQRModal}
          className="relative text-left bg-gradient-to-br from-white via-white to-[#FDF5F8] p-3.5 rounded-3xl border border-[#F0E1E6] shadow-[0_4px_16px_rgba(212,122,150,0.08)] active:scale-[0.98] transition-all group overflow-hidden"
        >
          {/* Subtle rose ambient glow */}
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[#D47A96]/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 bg-[#FDF0F4] text-[#B85474] px-2.5 py-0.5 rounded-full text-xs font-bold">
              <span>💎</span>
              <span>T-bonus</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#FDF0F4] flex items-center justify-center text-[#D47A96] group-hover:bg-[#D47A96] group-hover:text-white transition-colors">
              <QrCode className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-1">
            <span className="text-xl font-black text-[#2B1A21] tracking-tight block">
              {formatPrice(bonusBalance).replace(" so'm", "")}
            </span>
            <span className="text-[10px] font-bold text-[#B85474] uppercase tracking-wider block -mt-0.5">
              SO&apos;M BONUS
            </span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#F0E1E6] flex items-center justify-between text-[11px] font-semibold text-[#D47A96]">
            <span>Kassada ishlatish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Right Card: Cashback % */}
        <div className="relative text-left bg-gradient-to-br from-white via-white to-[#FFF9F5] p-3.5 rounded-3xl border border-[#F0E1E6] shadow-[0_4px_16px_rgba(212,122,150,0.08)] overflow-hidden">
          {/* Subtle amber/rose ambient glow */}
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 bg-[#FFF4E5] text-[#B45309] px-2.5 py-0.5 rounded-full text-xs font-bold">
              <span>🎁</span>
              <span>Keshbek</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#FFF4E5] flex items-center justify-center text-[#B45309]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-1">
            <span className="text-xl font-black text-[#2B1A21] tracking-tight block">
              {BRAND_CONFIG.cashbackPercent}%
            </span>
            <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-wider block -mt-0.5">
              HAR BUYURTMADAN
            </span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#F0E1E6] text-[11px] font-medium text-[#846B74] truncate">
            Har xariddan 5% qaytadi
          </div>
        </div>
      </div>

      {/* Quick Action Badges */}
      <div className="grid grid-cols-2 gap-2 mt-2.5">
        <a
          href="https://t.me/tortele"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white px-3 py-2 rounded-2xl border border-[#F0E1E6] text-xs font-semibold text-[#301D24] active:scale-[0.98] transition-transform shadow-xs"
        >
          <div className="flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-[#2AABEE]" />
            <span>Kanal: @tortele</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#C4B2B8]" />
        </a>

        <button
          onClick={() => alert("Sizda avvalgi 2 ta yetkazib berilgan buyurtma mavjud.\nOxirgi buyurtma: Bento-tort 'Love & Rose' (Yetkazildi)")}
          className="flex items-center justify-between bg-white px-3 py-2 rounded-2xl border border-[#F0E1E6] text-xs font-semibold text-[#301D24] active:scale-[0.98] transition-transform shadow-xs"
        >
          <div className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-[#D47A96]" />
            <span>Buyurtmalar tarixi</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#C4B2B8]" />
        </button>
      </div>
    </div>
  );
};
