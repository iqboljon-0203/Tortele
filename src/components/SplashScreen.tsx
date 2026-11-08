"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Cake } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

interface SplashScreenProps {
  onEnter: () => void;
  onSelectCategory?: (category: string) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter, onSelectCategory }) => {
  const [fade, setFade] = useState(false);

  const handleStart = (category: string = "all") => {
    setFade(true);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    setTimeout(() => {
      onEnter();
    }, 350);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#420F1D] via-[#631A30] to-[#3B0D19] text-white transition-opacity duration-400 overflow-hidden ${
        fade ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#D47A96]/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <div className="w-full pt-4 flex flex-col items-center text-center relative z-10">
        <span
          className="text-2xl font-normal tracking-wide text-rose-100 italic"
          style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
        >
          Tortel&apos;e Qandolat Uyi
        </span>
        <span className="text-[10px] tracking-[0.25em] uppercase text-rose-200/70 font-bold mt-0.5">
          SHAXSIY QANDOLAT USTASI
        </span>

        {/* Headline */}
        <h1
          className="text-3xl font-normal text-white mt-3 tracking-tight drop-shadow-md"
          style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
        >
          Shirin Lahzalar Zavqi
        </h1>
        <p className="text-xs text-rose-200/80 mt-1 max-w-[260px] leading-relaxed">
          Toshkent bo&apos;ylab 2-3 soatda yangi pishgan bento-tortlar va art-desertlar
        </p>
      </div>

      {/* Hero Showcase Cake on Pedestal Stand */}
      <div className="relative my-auto flex flex-col items-center justify-center z-10 animate-float">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <div className="absolute bottom-6 w-48 h-8 bg-black/40 rounded-full blur-md" />

          <div className="relative w-56 h-56 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/20">
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80"
              alt="Tortel'e Bayram Torti"
              fill
              priority
              sizes="260px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
          </div>

          <div className="absolute -bottom-1 bg-white text-[#420F1D] px-3.5 py-1.5 rounded-full shadow-lg border border-rose-100 flex items-center gap-1.5 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>2-3 soatda Bento 🎂</span>
          </div>
        </div>
      </div>

      {/* Bottom Dual Action Buttons */}
      <div className="w-full max-w-sm pb-4 space-y-3 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleStart("all")}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
          >
            <Cake className="w-4 h-4 text-rose-300" />
            <span>Barcha tortlar</span>
          </button>

          <button
            onClick={() => handleStart("bento")}
            className="bg-[#F5A623] hover:bg-[#E09418] text-[#2A0A13] py-3.5 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_4px_20px_rgba(245,166,35,0.4)]"
          >
            <span>Bento buyurtma</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Bonus Note */}
        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-rose-200">
            <span>💎</span>
            <span className="font-semibold">Boshlang&apos;ich sovg&apos;a:</span>
          </div>
          <span className="font-black text-amber-300">25 000 so&apos;m bonus</span>
        </div>
      </div>
    </div>
  );
};
