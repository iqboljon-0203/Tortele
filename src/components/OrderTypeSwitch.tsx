"use client";

import React from "react";
import { Bike, Store, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";

export const OrderTypeSwitch: React.FC = () => {
  const { orderType, setOrderType, deliveryAddress, openAddressModal } = useApp();

  return (
    <div className="px-4 py-1.5 space-y-1.5">
      {/* Sleek Compact Delivery & Address Bar */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/15 flex items-center justify-between text-white">
        {/* Toggle between Delivery and Pickup */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl">
          <button
            onClick={() => setOrderType("delivery")}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              orderType === "delivery"
                ? "bg-white text-[#2A0A13] shadow-sm"
                : "text-rose-200/70 hover:text-white"
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Yetkazish</span>
          </button>

          <button
            onClick={() => setOrderType("pickup")}
            className={`py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              orderType === "pickup"
                ? "bg-white text-[#2A0A13] shadow-sm"
                : "text-rose-200/70 hover:text-white"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Olib ketish</span>
          </button>
        </div>

        {/* Clickable Address Pill */}
        <button
          onClick={openAddressModal}
          className="flex items-center gap-1.5 text-left px-2.5 py-1 text-xs font-medium text-white hover:text-amber-200 transition-colors truncate max-w-[190px]"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
          <span className="truncate text-[11px]">
            {orderType === "delivery" ? deliveryAddress.replace("Toshkent sh., ", "") : "Nukus filiali"}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-rose-200/60 flex-shrink-0" />
        </button>
      </div>

      {/* Mini Info Strip: Bento 2-3 soatda & 5% Keshbek */}
      <div className="px-1 flex items-center justify-between text-[11px] text-rose-200/80">
        <div className="flex items-center gap-1 font-medium">
          <span className="text-amber-300">✨</span>
          <span>Bento-tortlar 2-3 soatda yetkaziladi</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-amber-300">
          <Sparkles className="w-3 h-3" />
          <span>5% keshbek</span>
        </div>
      </div>
    </div>
  );
};
