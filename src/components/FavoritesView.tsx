"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { ProductCard } from "./ProductCard";

export const FavoritesView: React.FC = () => {
  const { favorites, setActiveTab } = useApp();

  const favoriteProducts = BRAND_CONFIG.products.filter((p) =>
    favorites.includes(p.id)
  );

  return (
    <div className="flex-1 pb-24 bg-[#FAF6F5]">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-[#F0DDE4] bg-white sticky top-0 z-20 shadow-xs flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-normal text-[#2A0A13]"
            style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
          >
            Sevimlilar
          </h2>
          <span className="text-xs text-[#84626E]">
            {favoriteProducts.length} ta sevimli shirinlik
          </span>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center mb-3 shadow-sm">
            <Heart className="w-8 h-8 text-[#631A30] stroke-[1.5]" />
          </div>
          <h3
            className="text-lg font-normal text-[#2A0A13] mb-1"
            style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
          >
            Sevimli shirinliklar yo&apos;q
          </h3>
          <p className="text-xs text-[#84626E] max-w-xs mb-4">
            Shirinliklar kartochkasidagi yurakcha tugmasini bosib, o&apos;zingizga yoqqan tortlarni bu yerda saqlang!
          </p>
          <button
            onClick={() => setActiveTab("menu")}
            className="bg-[#F5A623] hover:bg-[#E09418] text-[#2A0A13] px-5 py-2.5 rounded-xl text-xs font-black active:scale-95 transition-all shadow-md"
          >
            Menyuni ko&apos;rish
          </button>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-2 gap-3">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
