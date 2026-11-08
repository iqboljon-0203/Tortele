"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { TorteleLogo } from "./TorteleLogo";
import { BRAND_CONFIG } from "@/config/brand";

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [fade, setFade] = useState(false);

  const handleStart = () => {
    setFade(true);
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#1C0D12] via-[#2D141C] to-[#160A0E] text-white transition-opacity duration-500 ${
        fade ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D47A96]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Tag */}
      <div className="pt-8 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-rose-200 border border-white/10">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Toshkent • 21.2K obunachi</span>
      </div>

      {/* Center Brand Identity (Exact Smorodina Splash style) */}
      <div className="flex flex-col items-center justify-center my-auto animate-fade-in text-center relative z-10 px-4">
        {/* Glow halo around logo */}
        <div className="p-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs mb-4 shadow-[0_0_50px_rgba(212,122,150,0.3)]">
          <TorteleLogo variant="full" theme="dark" size={88} />
        </div>

        <p className="text-xs text-rose-200/80 max-w-[240px] leading-relaxed mt-4 font-medium">
          Har bir tort — san&apos;at asari.
          <br />
          Bento-tortlar 2-3 soatda yangi pishirib yetkaziladi.
        </p>

        {/* 3 Key Brand Features */}
        <div className="grid grid-cols-3 gap-2 mt-6 max-w-xs w-full">
          <div className="bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-base block mb-0.5">⏱️</span>
            <span className="text-[10px] font-bold text-white block">2-3 soat</span>
            <span className="text-[8px] text-rose-200/60 block">Bento</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-base block mb-0.5">🍓</span>
            <span className="text-[10px] font-bold text-white block">100%</span>
            <span className="text-[8px] text-rose-200/60 block">Tabiiy</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-base block mb-0.5">💎</span>
            <span className="text-[10px] font-bold text-white block">25 000</span>
            <span className="text-[8px] text-rose-200/60 block">Bonus sovg&apos;a</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="w-full max-w-xs pb-6 space-y-3 relative z-10">
        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-[#D47A96] to-[#B85474] text-white py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(212,122,150,0.4)] active:scale-[0.98] transition-all hover:brightness-110"
        >
          <span>Menyuni ko&apos;rish</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-center text-rose-200/50">
          Telegram WebApp • {BRAND_CONFIG.brandName}
        </p>
      </div>
    </div>
  );
};
