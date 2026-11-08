"use client";

import React from "react";
import { SearchX } from "lucide-react";
import { BRAND_CONFIG, Product } from "@/config/brand";
import { RU_PRODUCTS } from "@/i18n/ru";
import { ProductCard } from "./ProductCard";
import { useApp } from "@/context/AppContext";

interface ProductGridProps {
  /** A fixed list; shown as-is, without the menu's category and search filters. */
  customProducts?: Product[];
  title?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ customProducts, title }) => {
  const { selectedCategory, searchQuery, setSelectedCategory, setSearchQuery, t } = useApp();

  const query = searchQuery.trim().toLowerCase();
  // Search both languages, so a query works whichever language it was typed in.
  const matches = (product: Product) =>
    [product.name, product.description, RU_PRODUCTS[product.id]?.name, RU_PRODUCTS[product.id]?.description].some((text) =>
      text?.toLowerCase().includes(query)
    );

  const products =
    customProducts ??
    BRAND_CONFIG.products.filter(
      (product) => (selectedCategory === "all" || product.category === selectedCategory) && (query === "" || matches(product))
    );

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <section className="px-4 pt-5 first:pt-1">
      {title && <h2 className="text-lg font-extrabold text-ink mb-3">{title}</h2>}

      {products.length === 0 ? (
        <div className="py-14 text-center">
          <SearchX className="w-12 h-12 mx-auto text-muted/60 stroke-[1.4] mb-3" />
          <h3 className="text-base font-bold text-ink">{t("Hech narsa topilmadi")}</h3>
          <p className="text-sm text-muted mt-1">{t("Boshqa so'z yoki bo'limni sinab ko'ring")}</p>
          <button onClick={resetFilters} className="mt-3 h-11 px-4 text-sm font-bold text-rose">
            {t("Filtrni tozalash")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
