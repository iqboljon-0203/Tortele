"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { SmartImage } from "./SmartImage";

export const PromoBanner: React.FC = () => {
  const { setSelectedCategory, setActiveTab, t } = useApp();

  const openBento = () => {
    setSelectedCategory("bento");
    setActiveTab("menu");
  };

  return (
    <section className="px-4 pt-5">
      <h2 className="text-lg font-extrabold text-ink mb-3">{t("Siz uchun taklif")}</h2>
      <div className="card overflow-hidden">
        <div className="relative w-full aspect-[16/9] bg-line">
          <SmartImage
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop&q=80"
            alt=""
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold text-ink">{t("Bento-tortlar 2-3 soatda tayyor")}</h3>
          <p className="text-[13px] text-muted mt-1 mb-3.5">{t("Shaxsiy tabrik yozuvi va bepul shamcha bilan")}</p>
          <button onClick={openBento} className="btn-primary w-full !bg-solid">
            {t("Bentoni tanlash")}
          </button>
        </div>
      </div>
    </section>
  );
};
