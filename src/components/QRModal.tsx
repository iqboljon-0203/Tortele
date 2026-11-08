"use client";

import React from "react";
import { X, Sparkles, ShieldCheck, Copy, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice } from "@/utils/telegram";

export const QRModal: React.FC = () => {
  const { isQRModalOpen, closeQRModal, bonusBalance, userName } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!isQRModalOpen) return null;

  const customerId = "TL-84920";

  const handleCopy = () => {
    navigator.clipboard.writeText(customerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl relative border border-[#F0E1E6] animate-slide-up text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQRModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF6F4] text-[#301D24] flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Brand */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0F4] text-[#B85474] px-3 py-1 rounded-full text-xs font-bold mb-2">
            <span>💎</span>
            <span>{BRAND_CONFIG.brandName} Sodiqlik kartasi</span>
          </div>
          <h3 className="text-lg font-black text-[#2B1A21]">
            Bonus yig&apos;ish va yechish
          </h3>
          <p className="text-xs text-[#846B74] mt-1 max-w-[260px] mx-auto leading-relaxed">
            QR-kodni kassadagi skanerga ko&apos;rsating yoki kuryerga taqdim eting
          </p>
        </div>

        {/* Big QR Code Card */}
        <div className="bg-[#FAF6F4] p-5 rounded-3xl border border-[#F0E1E6] inline-block my-2 shadow-inner relative group">
          {/* Beautiful SVG QR Code Mockup */}
          <svg
            className="w-48 h-48 mx-auto"
            viewBox="0 0 198 198"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect width="198" height="198" rx="16" fill="white" />
            
            {/* Top-left locator */}
            <rect x="18" y="18" width="48" height="48" rx="8" fill="#2B1A21" />
            <rect x="26" y="26" width="32" height="32" rx="4" fill="white" />
            <rect x="34" y="34" width="16" height="16" rx="3" fill="#D47A96" />

            {/* Top-right locator */}
            <rect x="132" y="18" width="48" height="48" rx="8" fill="#2B1A21" />
            <rect x="140" y="26" width="32" height="32" rx="4" fill="white" />
            <rect x="148" y="34" width="16" height="16" rx="3" fill="#D47A96" />

            {/* Bottom-left locator */}
            <rect x="18" y="132" width="48" height="48" rx="8" fill="#2B1A21" />
            <rect x="26" y="140" width="32" height="32" rx="4" fill="white" />
            <rect x="34" y="148" width="16" height="16" rx="3" fill="#D47A96" />

            {/* Simulated Data Matrix Dots */}
            <circle cx="82" cy="30" r="4" fill="#2B1A21" />
            <circle cx="98" cy="30" r="4" fill="#2B1A21" />
            <circle cx="114" cy="30" r="4" fill="#2B1A21" />
            <circle cx="82" cy="46" r="4" fill="#2B1A21" />
            <circle cx="98" cy="46" r="4" fill="#D47A96" />
            <circle cx="114" cy="46" r="4" fill="#2B1A21" />

            <circle cx="30" cy="82" r="4" fill="#2B1A21" />
            <circle cx="46" cy="82" r="4" fill="#2B1A21" />
            <circle cx="82" cy="82" r="4" fill="#2B1A21" />
            <circle cx="98" cy="82" r="4" fill="#2B1A21" />
            <circle cx="114" cy="82" r="4" fill="#2B1A21" />
            <circle cx="150" cy="82" r="4" fill="#2B1A21" />
            <circle cx="166" cy="82" r="4" fill="#2B1A21" />

            {/* Center Logo Cake Stamp */}
            <rect x="79" y="79" width="40" height="40" rx="10" fill="#D47A96" />
            <text x="99" y="104" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">🎂</text>

            <circle cx="30" cy="98" r="4" fill="#2B1A21" />
            <circle cx="46" cy="98" r="4" fill="#D47A96" />
            <circle cx="150" cy="98" r="4" fill="#2B1A21" />
            <circle cx="166" cy="98" r="4" fill="#2B1A21" />

            <circle cx="30" cy="114" r="4" fill="#2B1A21" />
            <circle cx="82" cy="114" r="4" fill="#2B1A21" />
            <circle cx="98" cy="114" r="4" fill="#2B1A21" />
            <circle cx="114" cy="114" r="4" fill="#D47A96" />
            <circle cx="150" cy="114" r="4" fill="#2B1A21" />

            <circle cx="82" cy="138" r="4" fill="#2B1A21" />
            <circle cx="98" cy="138" r="4" fill="#2B1A21" />
            <circle cx="114" cy="138" r="4" fill="#2B1A21" />
            <circle cx="138" cy="138" r="4" fill="#2B1A21" />
            <circle cx="154" cy="138" r="4" fill="#D47A96" />

            <circle cx="82" cy="154" r="4" fill="#D47A96" />
            <circle cx="114" cy="154" r="4" fill="#2B1A21" />
            <circle cx="138" cy="154" r="4" fill="#2B1A21" />
            <circle cx="170" cy="154" r="4" fill="#2B1A21" />

            <circle cx="82" cy="170" r="4" fill="#2B1A21" />
            <circle cx="98" cy="170" r="4" fill="#2B1A21" />
            <circle cx="138" cy="170" r="4" fill="#2B1A21" />
            <circle cx="154" cy="170" r="4" fill="#2B1A21" />
          </svg>

          {/* Customer ID copy button */}
          <button
            onClick={handleCopy}
            className="mt-3 inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-xl border border-[#F0E1E6] text-xs font-mono font-bold text-[#2B1A21] shadow-2xs hover:bg-[#FAF6F4]"
          >
            <span>ID: {customerId}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#846B74]" />
            )}
          </button>
        </div>

        {/* User Stats Card */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-[#FAF6F4] p-3 rounded-2xl border border-[#F0E1E6] text-left">
            <span className="text-[10px] text-[#846B74] font-semibold block uppercase">
              Sizning balansingiz
            </span>
            <span className="text-base font-black text-[#D47A96] block">
              {formatPrice(bonusBalance)}
            </span>
          </div>

          <div className="bg-[#FAF6F4] p-3 rounded-2xl border border-[#F0E1E6] text-left">
            <span className="text-[10px] text-[#846B74] font-semibold block uppercase">
              Keshbek darajasi
            </span>
            <span className="text-base font-black text-amber-600 block">
              {BRAND_CONFIG.cashbackPercent}% (VIP)
            </span>
          </div>
        </div>

        <button
          onClick={closeQRModal}
          className="w-full mt-4 bg-[#2B1A21] text-white py-3 rounded-2xl text-xs font-bold active:scale-98 transition-transform"
        >
          Tushunarli, yopish
        </button>
      </div>
    </div>
  );
};

