"use client";

import React from "react";
import { Sparkles, ArrowRight, Clock, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const PromoBanner: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useApp();

  const handleBannerClick = () => {
    setSelectedCategory("bento");
    setActiveTab("menu");
  };

  return (
    <div className="px-4 py-2">
      <div
        onClick={handleBannerClick}
        className="relative overflow-hidden rounded-3xl cursor-pointer active:scale-[0.99] transition-all shadow-[0_8px_24px_rgba(212,122,150,0.18)] border border-[#F0E1E6] group"
      >
        {/* Background Image with Rose/Cocoa Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B1A21]/95 via-[#4A1E2E]/80 to-transparent" />

        <div className="relative p-4 text-white flex flex-col justify-between min-h-[142px]">
          <div className="space-y-1.5 max-w-[72%]">
            <div className="inline-flex items-center gap-1.5 bg-[#D47A96]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-rose-50">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Tortel&apos;e Express</span>
            </div>
            <h3 className="text-base font-black leading-snug drop-shadow-sm">
              Bento-tortlar 2-3 soatda tayyor! 🎂
            </h3>
            <p className="text-xs text-rose-100/90 leading-relaxed">
              Shaxsiy tabrik yozuvi, bepul shamchalar va 5% keshbek.
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-rose-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Tezkor yetkazish</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-white text-[#2B1A21] px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md active:bg-[#FDF5F8]">
              <span>Buyurtma berish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
