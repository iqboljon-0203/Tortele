"use client";

import React, { useState } from "react";
import { Check, Store, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { useOverlay } from "@/utils/useOverlay";
import { OrderType } from "@/types";

const POPULAR_ADDRESSES = [
  "Toshkent sh., Mirobod tumani, Nukus ko'chasi, 24-uy",
  "Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi, 18-uy",
  "Toshkent sh., Yunusobod tumani, Amir Temur shoh ko'chasi, 45-uy",
  "Toshkent sh., Yakkasaroy tumani, Shota Rustaveli ko'chasi, 52-uy",
];

const TYPES: { id: OrderType; label: string }[] = [
  { id: "delivery", label: "Yetkazib berish" },
  { id: "pickup", label: "Olib ketish" },
];

export const AddressModal: React.FC = () => {
  const { closeAddressModal, orderType, setOrderType, deliveryAddress, setDeliveryAddress, t } = useApp();
  const [tempAddress, setTempAddress] = useState(deliveryAddress);
  useOverlay(closeAddressModal);

  const handleSave = () => {
    if (tempAddress.trim()) setDeliveryAddress(tempAddress.trim());
    closeAddressModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 animate-fade-in" onClick={closeAddressModal}>
      <div
        role="dialog"
        aria-label={t("Manzil")}
        className="w-full max-w-md bg-surface rounded-t-[28px] px-4 pt-3 pb-safe max-h-[88vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink">{t("Qanday olasiz?")}</h2>
          <button onClick={closeAddressModal} aria-label={t("Yopish")} className="w-11 h-11 -mr-2 flex items-center justify-center text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1 bg-page p-1 rounded-[14px] my-2">
          {TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setOrderType(type.id)}
              aria-pressed={orderType === type.id}
              className={`h-10 rounded-[11px] text-[13px] font-bold transition-colors ${
                orderType === type.id ? "bg-solid text-white" : "text-muted"
              }`}
            >
              {t(type.label)}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto no-scrollbar py-2 space-y-2">
          {orderType === "delivery" ? (
            <>
              <input
                type="text"
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                placeholder={t("Ko'cha, uy, xonadon")}
                aria-label={t("Yetkazish manzili")}
                className="w-full h-12 px-3.5 rounded-[14px] border-[1.5px] border-line bg-surface text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-rose"
              />
              {POPULAR_ADDRESSES.map((address) => (
                <button
                  key={address}
                  onClick={() => setTempAddress(address)}
                  className="w-full min-h-11 flex items-center justify-between gap-2 text-left text-[13px] text-ink"
                >
                  <span>{address.replace("Toshkent sh., ", "")}</span>
                  {tempAddress === address && <Check className="w-4 h-4 text-rose flex-shrink-0" />}
                </button>
              ))}
            </>
          ) : (
            BRAND_CONFIG.branches.map((branch) => (
              <div key={branch.name} className="min-h-14 flex items-center gap-3 py-1.5">
                <Store className="w-5 h-5 text-rose flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="block text-[13px] font-bold text-ink">{t(branch.name)}</span>
                  <span className="block text-xs text-muted">
                    {branch.address} · {branch.distance}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button onClick={handleSave} className="btn-primary w-full mt-2">
          {t("Tasdiqlash")}
        </button>
      </div>
    </div>
  );
};
