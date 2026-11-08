"use client";

import React from "react";
import { Coins, Search, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { OrderTypeSwitch } from "./OrderTypeSwitch";
import { CategoryBar } from "./CategoryBar";
import { ProductGrid } from "./ProductGrid";

export const MenuView: React.FC = () => {
  const { searchQuery, setSearchQuery, bonusBalance, openQRModal, price, t } = useApp();

  return (
    <div className="flex-1 pb-nav">
      <div className="px-4 pt-4">
        <OrderTypeSwitch />
      </div>

      <div className="sticky top-0 z-20 bg-page px-4 pt-2 pb-3 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-[18px] h-[18px] text-muted absolute left-3.5 top-3.5" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Shirinlik qidirish")}
              aria-label={t("Shirinlik qidirish")}
              className="w-full h-[46px] bg-surface pl-10 pr-10 rounded-[14px] text-[15px] font-medium text-ink placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label={t("Qidiruvni tozalash")}
                className="absolute right-0 top-0 w-11 h-[46px] flex items-center justify-center text-muted"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            )}
          </div>
          <button
            onClick={openQRModal}
            aria-label={t("Bonus balansi")}
            className="h-[46px] px-3 rounded-[14px] bg-rose text-white text-[13px] font-bold flex items-center gap-1.5 tabular-nums flex-shrink-0"
          >
            <Coins className="w-4 h-4" />
            {price(bonusBalance).replace(` ${t("so'm")}`, "")}
          </button>
        </div>
        <CategoryBar />
      </div>

      <ProductGrid />
    </div>
  );
};
