"use client";

import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { ProductCard } from "./ProductCard";

export const FavoritesView: React.FC = () => {
  const { favorites, setActiveTab } = useApp();

  const favoriteProducts = BRAND_CONFIG.products.filter((p) =>
    favorites.includes(p.id)
  );

  return (
    <div className="flex-1 pb-24">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F0E1E6] bg-[#FAF6F4] sticky top-0 z-20">
        <h2 className="text-lg font-black text-[#2B1A21]">Sevimlilar</h2>
        <span className="text-xs text-[#846B74]">
          {favoriteProducts.length} ta sevimli shirinlik
        </span>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-white border border-[#F0E1E6] flex items-center justify-center mb-3 shadow-sm">
            <Heart className="w-8 h-8 text-[#D47A96] stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-[#2B1A21] mb-1">
            Sevimli shirinliklar yo&apos;q
          </h3>
          <p className="text-xs text-[#846B74] max-w-xs mb-4">
            Shirinliklar kartochkasidagi yurakcha tugmasini bosib, o&apos;zingizga yoqqan tortlarni bu yerda saqlang!
          </p>
          <button
            onClick={() => setActiveTab("menu")}
            className="bg-[#D47A96] hover:bg-[#B85474] text-white px-5 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
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
