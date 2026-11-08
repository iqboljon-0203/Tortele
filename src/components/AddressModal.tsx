"use client";

import React, { useState } from "react";
import { X, MapPin, Check, Store } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";

export const AddressModal: React.FC = () => {
  const {
    isAddressModalOpen,
    closeAddressModal,
    orderType,
    setOrderType,
    deliveryAddress,
    setDeliveryAddress,
  } = useApp();

  const [tempAddress, setTempAddress] = useState(deliveryAddress);

  if (!isAddressModalOpen) return null;

  const popularAddresses = [
    "Toshkent sh., Mirobod tumani, Nukus ko'chasi, 24-uy",
    "Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi, 18-uy",
    "Toshkent sh., Yunusobod tumani, Amir Temur shoh ko'chasi, 45-uy",
    "Toshkent sh., Yakkasaroy tumani, Shota Rustaveli ko'chasi, 52-uy",
  ];

  const handleSave = () => {
    if (tempAddress.trim()) {
      setDeliveryAddress(tempAddress.trim());
    }
    closeAddressModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-t-[32px] p-5 shadow-2xl relative border border-[#F0E1E6] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F0E1E6]">
          <h3 className="text-base font-black text-[#2B1A21]">
            Yetkazish va Filial sozlamalari
          </h3>
          <button
            onClick={closeAddressModal}
            className="w-8 h-8 rounded-full bg-[#FAF6F4] text-[#301D24] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="my-4 bg-[#FAF6F4] p-1 rounded-2xl flex items-center">
          <button
            onClick={() => setOrderType("delivery")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              orderType === "delivery"
                ? "bg-white text-[#2B1A21] shadow-xs"
                : "text-[#846B74]"
            }`}
          >
            🛵 Yetkazib berish (40-60 daqiqa)
          </button>
          <button
            onClick={() => setOrderType("pickup")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              orderType === "pickup"
                ? "bg-white text-[#2B1A21] shadow-xs"
                : "text-[#846B74]"
            }`}
          >
            🏪 Olib ketish
          </button>
        </div>

        {orderType === "delivery" ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#2B1A21] block mb-1">
                Yetkazib berish manzilingiz:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  placeholder="Ko'cha, uy raqami, xonadon..."
                  className="w-full bg-[#FAF6F4] pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#F0E1E6] text-xs font-semibold text-[#2B1A21] focus:bg-white focus:outline-none focus:border-[#D47A96]"
                />
                <MapPin className="w-4 h-4 text-[#D47A96] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#846B74] block mb-1.5 uppercase">
                Tezkor manzillar:
              </span>
              <div className="space-y-1.5">
                {popularAddresses.map((addr) => (
                  <button
                    key={addr}
                    onClick={() => setTempAddress(addr)}
                    className="w-full text-left text-xs p-2.5 rounded-xl border border-[#F0E1E6] hover:bg-[#FAF6F4] text-[#301D24] font-medium truncate flex items-center justify-between"
                  >
                    <span className="truncate">{addr}</span>
                    {tempAddress === addr && (
                      <Check className="w-3.5 h-3.5 text-[#D47A96] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2B1A21] block mb-1">
              Olib ketish uchun filialni tanlang:
            </span>
            {BRAND_CONFIG.branches.map((branch) => (
              <div
                key={branch.name}
                className="p-3 rounded-2xl border border-[#F0E1E6] bg-[#FAF6F4] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Store className="w-4 h-4 text-[#D47A96]" />
                  <div>
                    <span className="text-xs font-bold text-[#2B1A21] block">
                      {branch.name}
                    </span>
                    <span className="text-[11px] text-[#846B74]">
                      {branch.address} • {branch.distance}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Ochiq
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full mt-5 bg-[#D47A96] hover:bg-[#B85474] text-white py-3 rounded-2xl text-xs font-black active:scale-98 transition-all shadow-md"
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  );
};

