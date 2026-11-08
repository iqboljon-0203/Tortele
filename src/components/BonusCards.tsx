"use client";

import React from "react";
import { QrCode, ArrowUpRight, Sparkles, ChevronRight, History, Send } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice } from "@/utils/telegram";

export const BonusCards: React.FC = () => {
  const { bonusBalance, openQRModal } = useApp();

  return (
    <div className="px-4 pt-2.5 pb-2 text-white">
      {/* 2 Bonus Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Left Card: Bonus Balance & QR Code trigger */}
        <button
          onClick={openQRModal}
          className="relative text-left bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md p-3.5 rounded-3xl border border-white/20 shadow-lg active:scale-[0.98] transition-all group overflow-hidden"
        >
          {/* Subtle gold ambient glow */}
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[#F5A623]/25 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 bg-white/20 text-rose-100 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <span>💎</span>
              <span>T-bonus</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-[#F5A623] group-hover:text-[#2A0A13] transition-colors">
              <QrCode className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-1">
            <span className="text-xl font-black text-white tracking-tight block">
              {formatPrice(bonusBalance).replace(" so'm", "")}
            </span>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block -mt-0.5">
              SO&apos;M BONUS
            </span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-rose-200">
            <span>Kassada ishlatish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Right Card: Cashback % */}
        <div className="relative text-left bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md p-3.5 rounded-3xl border border-white/20 shadow-lg overflow-hidden">
          {/* Subtle amber ambient glow */}
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <span>🎁</span>
              <span>Keshbek</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="mt-1">
            <span className="text-xl font-black text-white tracking-tight block">
              {BRAND_CONFIG.cashbackPercent}%
            </span>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block -mt-0.5">
              HAR BUYURTMADAN
            </span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/10 text-[11px] font-medium text-rose-200/80 truncate">
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
          className="flex items-center justify-between bg-white/10 hover:bg-white/15 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/15 text-xs font-semibold text-white active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>Kanal: @tortele</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-rose-200/60" />
        </a>

        <button
          onClick={() => alert("Sizda avvalgi 2 ta yetkazib berilgan buyurtma mavjud.\nOxirgi buyurtma: Bento-tort 'Love & Rose' (Yetkazildi)")}
          className="flex items-center justify-between bg-white/10 hover:bg-white/15 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/15 text-xs font-semibold text-white active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-amber-300" />
            <span>Buyurtmalar tarixi</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-rose-200/60" />
        </button>
      </div>
    </div>
  );
};
