"use client";

import React from "react";
import { BRAND_CONFIG, Product } from "@/config/brand";
import { ProductCard } from "./ProductCard";
import { useApp } from "@/context/AppContext";

interface ProductGridProps {
  customProducts?: Product[];
  title?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ customProducts, title = "Popular Picks" }) => {
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
        <div className="flex items-center justify-between mb-3 px-1">
          <h3
            className="text-xl font-normal text-[#2A0A13] tracking-wide"
            style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
          >
            {title}
          </h3>
          <span className="text-xs text-[#84626E] font-semibold">
            {filteredProducts.length} xil shirinlik
          </span>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-[#F0DDE4] my-4 shadow-sm">
          <span className="text-4xl block mb-2">🍰</span>
          <h4 className="text-sm font-bold text-[#2A0A13] mb-1">
            Mahsulot topilmadi
          </h4>
          <p className="text-xs text-[#84626E]">
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
