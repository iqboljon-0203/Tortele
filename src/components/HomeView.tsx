"use client";

import React from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { useApp } from "@/context/AppContext";
import { Header } from "./Header";
import { BonusCards } from "./BonusCards";
import { ReminderBanner } from "./ReminderBanner";
import { PromoBanner } from "./PromoBanner";
import { ProductGrid } from "./ProductGrid";

const POPULAR = BRAND_CONFIG.products.filter((p) => p.isPopular);

export const HomeView: React.FC = () => {
  const { t } = useApp();
  return (
    <div className="flex-1 pb-nav">
      <Header />
      <ReminderBanner />
      <BonusCards />
      <PromoBanner />
      <ProductGrid customProducts={POPULAR} title={t("Eng mashhurlar")} />
    </div>
  );
};
