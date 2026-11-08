"use client";

import React from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { OrderType } from "@/types";

const OPTIONS: { id: OrderType; label: string }[] = [
  { id: "delivery", label: "Yetkazib berish" },
  { id: "pickup", label: "Olib ketish" },
];

export const OrderTypeSwitch: React.FC = () => {
  const { orderType, setOrderType, deliveryAddress, openAddressModal, t } = useApp();

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-2 gap-1 bg-line/70 p-1 rounded-[14px]" role="group" aria-label={t("Buyurtma turi")}>
        {OPTIONS.map((option) => {
          const isActive = orderType === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setOrderType(option.id)}
              aria-pressed={isActive}
              className={`h-10 rounded-[11px] text-[13px] font-bold transition-colors ${
                isActive ? "bg-solid text-white" : "text-muted"
              }`}
            >
              {t(option.label)}
            </button>
          );
        })}
      </div>

      <button onClick={openAddressModal} className="w-full h-9 flex items-center justify-center gap-1 text-[13px] text-muted">
        <MapPin className="w-4 h-4 text-rose flex-shrink-0" />
        <span className="truncate font-medium">
          {orderType === "delivery"
            ? deliveryAddress.replace("Toshkent sh., ", "")
            : t(BRAND_CONFIG.branches[0].name)}
        </span>
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
      </button>
    </div>
  );
};
