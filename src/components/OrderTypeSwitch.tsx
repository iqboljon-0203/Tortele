"use client";

import React from "react";
import { Bike, Store, MapPin, ChevronRight, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";

export const OrderTypeSwitch: React.FC = () => {
  const { orderType, setOrderType, deliveryAddress, openAddressModal } = useApp();

  return (
    <div className="px-4 py-1 space-y-2">
      {/* 2-Way Pill Switcher */}
      <div className="bg-[#EAE2DA] p-1 rounded-2xl flex items-center">
        <button
          onClick={() => setOrderType("delivery")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            orderType === "delivery"
              ? "bg-white text-[#2D1E16] shadow-sm"
              : "text-[#7D6E65] hover:text-[#2D1E16]"
          }`}
        >
          <Bike className={`w-4 h-4 ${orderType === "delivery" ? "text-[#9C6B4E]" : "text-[#7D6E65]"}`} />
          <span>Yetkazib berish ({BRAND_CONFIG.deliveryTime})</span>
        </button>

        <button
          onClick={() => setOrderType("pickup")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            orderType === "pickup"
              ? "bg-white text-[#2D1E16] shadow-sm"
              : "text-[#7D6E65] hover:text-[#2D1E16]"
          }`}
        >
          <Store className={`w-4 h-4 ${orderType === "pickup" ? "text-[#9C6B4E]" : "text-[#7D6E65]"}`} />
          <span>Olib ketish</span>
        </button>
      </div>

      {/* Address / Branch selector bar */}
      <button
        onClick={openAddressModal}
        className="w-full bg-white px-3.5 py-2.5 rounded-2xl border border-[#EDE6E0] shadow-sm flex items-center justify-between text-left active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#F2ECE7] flex items-center justify-center text-[#9C6B4E] flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-[#8C5738] block uppercase tracking-wider">
              {orderType === "delivery" ? "Yetkazish manzili" : "Tanlangan filial"}
            </span>
            <span className="text-xs font-medium text-[#2D1E16] truncate block">
              {orderType === "delivery" ? deliveryAddress : BRAND_CONFIG.branches[0].name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-[#9C6B4E] flex-shrink-0 ml-2">
          <span>O&apos;zgartirish</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
