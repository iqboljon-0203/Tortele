"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { ProductCard } from "./ProductCard";
import { EmptyState, ScreenTitle } from "./ui";

export const FavoritesView: React.FC = () => {
  const { favorites, setActiveTab, t } = useApp();
  const products = BRAND_CONFIG.products.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex-1 flex flex-col pb-nav">
      {products.length === 0 ? (
        <EmptyState
          icon={<Heart className="w-20 h-20 stroke-[1.1]" />}
          title={t("Sevimlilar hozircha bo'sh")}
          text={t("Yoqqan shirinlikdagi yurakchani bosing, u shu yerda saqlanadi")}
          actionLabel={t("Menyuni ko'rish")}
          onAction={() => setActiveTab("menu")}
        />
      ) : (
        <>
          <ScreenTitle title={t("Sevimlilar")} />
          <div className="px-4 grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
