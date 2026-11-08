"use client";

import React from "react";
import { Bike, Store, MapPin, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";

export const OrderTypeSwitch: React.FC = () => {
  const { orderType, setOrderType, deliveryAddress, openAddressModal } = useApp();

  return (
    <div className="px-4 py-1 space-y-2">
      {/* 2-Way Pill Switcher on Velvet */}
      <div className="bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/15 flex items-center">
        <button
          onClick={() => setOrderType("delivery")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            orderType === "delivery"
              ? "bg-white text-[#2A0A13] shadow-md"
              : "text-rose-200/80 hover:text-white"
          }`}
        >
          <Bike className={`w-4 h-4 ${orderType === "delivery" ? "text-[#631A30]" : "text-rose-200/70"}`} />
          <span>Yetkazib berish (40 daqiqa)</span>
        </button>

        <button
          onClick={() => setOrderType("pickup")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            orderType === "pickup"
              ? "bg-white text-[#2A0A13] shadow-md"
              : "text-rose-200/80 hover:text-white"
          }`}
        >
          <Store className={`w-4 h-4 ${orderType === "pickup" ? "text-[#631A30]" : "text-rose-200/70"}`} />
          <span>Olib ketish</span>
        </button>
      </div>

      {/* Address / Branch selector bar */}
      <button
        onClick={openAddressModal}
        className="w-full bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15 text-left active:scale-[0.99] transition-transform flex items-center justify-between text-white"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-amber-300 flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-rose-200/70 block uppercase tracking-wider">
              {orderType === "delivery" ? "Yetkazish manzili" : "Tanlangan filial"}
            </span>
            <span className="text-xs font-semibold text-white truncate block">
              {orderType === "delivery" ? deliveryAddress : BRAND_CONFIG.branches[0].name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-amber-300 flex-shrink-0 ml-2">
          <span>O&apos;zgartirish</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
