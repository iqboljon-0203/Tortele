"use client";

import React from "react";
import { ChevronRight, Coins, Percent, ReceiptText, Store } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";

export const BonusCards: React.FC = () => {
  const { bonusBalance, openQRModal, openAddressModal, setOrderType, openOrders, orders, tier, price, t } = useApp();

  const openBranches = () => {
    setOrderType("pickup");
    openAddressModal();
  };

  return (
    <section className="px-4 grid grid-cols-2 gap-3" aria-label={t("Bonuslar")}>
      <button
        onClick={openQRModal}
        className="rounded-[20px] bg-rose text-white p-4 text-left flex flex-col justify-between min-h-[124px] active:scale-[0.98] transition-transform"
      >
        <span className="flex items-center justify-between text-[13px] font-semibold">
          {t("T-bonus")}
          <Coins className="w-5 h-5" />
        </span>
        <span>
          <span className="block text-[26px] leading-8 font-extrabold tabular-nums">
            {price(bonusBalance).replace(` ${t("so'm")}`, "")}
          </span>
          <span className="flex items-center text-xs font-medium text-white/85">
            {t("QR-kodni ochish")} <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </span>
      </button>

      <div className="card p-4 flex flex-col justify-between min-h-[124px]">
        <span className="flex items-center justify-between text-[13px] font-semibold text-ink">
          {t("Keshbek")} · {tier.name}
          <Percent className="w-5 h-5 text-rose" />
        </span>
        <span>
          <span className="block text-[26px] leading-8 font-extrabold text-ink">{tier.cashbackPercent}%</span>
          <span className="block text-xs text-muted">{t("har buyurtmadan")}</span>
        </span>
      </div>

      <button onClick={openOrders} className="card p-3.5 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform">
        <ReceiptText className="w-5 h-5 text-rose flex-shrink-0" />
        <span className="min-w-0">
          <span className="block text-[13px] font-bold text-ink truncate">{t("Buyurtmalarim")}</span>
          <span className="block text-xs text-muted truncate">{t("{n} ta", { n: orders.length })}</span>
        </span>
      </button>

      <button onClick={openBranches} className="card p-3.5 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform">
        <Store className="w-5 h-5 text-rose flex-shrink-0" />
        <span className="min-w-0">
          <span className="block text-[13px] font-bold text-ink">{t("Filiallar")}</span>
          <span className="block text-xs text-muted truncate">{t("{n} ta manzil", { n: BRAND_CONFIG.branches.length })}</span>
        </span>
      </button>
    </section>
  );
};
