"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const BonusView: React.FC = () => {
  const { bonusBalance, customerId, tier, nextTier, totalSpent, price, t } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(customerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progress = nextTier
    ? Math.min(100, ((totalSpent - tier.minSpent) / (nextTier.minSpent - tier.minSpent)) * 100)
    : 100;
  const perks = [t("{n}% keshbek", { n: tier.cashbackPercent }), tier.freeDelivery ? t("bepul yetkazish") : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-nav text-center">
      <h1 className="text-2xl font-extrabold text-ink tracking-tight">{t("Bonus yig'ing")}</h1>
      <p className="text-sm text-muted mt-1.5 max-w-72 leading-relaxed">
        {t("QR-kodni kassada yoki kuryerga ko'rsating. Har xariddan {n}% qaytadi", { n: tier.cashbackPercent })}
      </p>

      <div className="card !bg-white p-5 mt-6">
        {customerId && <QRCodeSVG value={customerId} size={200} fgColor="#2C2328" level="M" title={t("Mijoz QR-kodi")} />}
      </div>

      <button onClick={handleCopy} className="mt-2 h-11 px-3 inline-flex items-center gap-2 text-sm font-bold text-ink">
        {customerId}
        {copied ? <Check className="w-4 h-4 text-rose" /> : <Copy className="w-4 h-4 text-muted" />}
      </button>

      <div className="card w-full p-4 mt-2 flex items-center justify-between">
        <span className="text-sm text-muted">{t("Balansingiz")}</span>
        <span className="text-lg font-extrabold text-rose tabular-nums">{price(bonusBalance)}</span>
      </div>

      <div className="card w-full p-4 mt-3 text-left">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted">{t("Sizning darajangiz")}</span>
          <span className="text-lg font-extrabold text-ink">{tier.name}</span>
        </div>
        <p className="text-xs text-muted mt-0.5">{perks}</p>
        <div className="h-1.5 rounded-full bg-line mt-3 overflow-hidden">
          <div className="h-full rounded-full bg-rose" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted mt-2">
          {nextTier
            ? t("{tier} darajasigacha {price}", { tier: nextTier.name, price: price(nextTier.minSpent - totalSpent) })
            : t("Eng yuqori daraja")}
        </p>
      </div>
    </div>
  );
};
