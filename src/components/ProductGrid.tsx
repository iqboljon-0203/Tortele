"use client";

import React from "react";
import { BRAND_CONFIG, Product } from "@/config/brand";
import { ProductCard } from "./ProductCard";
import { useApp } from "@/context/AppContext";

interface ProductGridProps {
  customProducts?: Product[];
  title?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ customProducts, title }) => {
  const { selectedCategory, searchQuery } = useApp();

  const productsToFilter = customProducts || BRAND_CONFIG.products;

  const filteredProducts = productsToFilter.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 py-2">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-extrabold text-[#2B1A21]">{title}</h3>
          <span className="text-xs text-[#846B74] font-semibold">
            {filteredProducts.length} ta mahsulot
          </span>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-[#F0E1E6] my-4 shadow-sm">
          <span className="text-4xl block mb-2">🍰</span>
          <h4 className="text-sm font-bold text-[#2B1A21] mb-1">
            Mahsulot topilmadi
          </h4>
          <p className="text-xs text-[#846B74]">
            Boshqa bo&apos;limni tanlang yoki qidiruv so&apos;zini o&apos;zgartiring
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

