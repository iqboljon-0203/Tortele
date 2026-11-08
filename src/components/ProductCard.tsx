"use client";

import React from "react";
import Image from "next/image";
import { Heart, Plus, Star } from "lucide-react";
import { Product } from "@/config/brand";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/utils/telegram";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal, toggleFavorite, isFavorite } = useApp();
  const favorite = isFavorite(product.id);

  return (
    <div
      onClick={() => openProductModal(product)}
      className="bg-white rounded-3xl p-3 border border-[#F0DDE4] shadow-[0_4px_20px_rgba(42,10,19,0.06)] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between relative group active:scale-[0.98]"
    >
      {/* Top action row: Badges and Favorite Heart */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1">
          {product.isPopular && (
            <span className="bg-[#631A30] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
              Hit 🔥
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#F5A623] text-[#2A0A13] text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
              Yangi ✨
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`w-8 h-8 rounded-full pointer-events-auto flex items-center justify-center transition-all ${
            favorite
              ? "bg-rose-50 text-rose-500 shadow-sm"
              : "bg-white/90 text-[#84626E] backdrop-blur-xs hover:text-rose-500 shadow-xs"
          }`}
          aria-label="Sevimlilar"
        >
          <Heart className={`w-4 h-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>

      {/* Delicious Cake Photo on Pedestal / Plate */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF6F5] mt-1 mb-2.5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 250px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        {/* Rating and Weight */}
        <div className="flex items-center justify-between text-[11px] text-[#84626E] mb-1">
          <div className="flex items-center gap-1 font-bold text-amber-600">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span className="bg-[#FAF6F5] px-1.5 py-0.5 rounded-md font-semibold text-[#84626E]">
            {product.baseWeight}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-xs font-bold text-[#2A0A13] line-clamp-2 leading-snug mb-2 flex-1">
          {product.name}
        </h4>

        {/* Price & Gold Add Button */}
        <div className="flex items-center justify-between pt-1.5 border-t border-[#F0DDE4]/60">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#84626E] font-medium leading-none">
              boshlab
            </span>
            <span className="text-sm font-black text-[#2A0A13]">
              {formatPrice(product.basePrice).replace(" so'm", "")}
            </span>
            <span className="text-[9px] font-bold text-[#631A30] leading-none uppercase">
              so&apos;m
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="w-8 h-8 rounded-xl bg-[#F5A623] hover:bg-[#E09418] text-[#2A0A13] flex items-center justify-center shadow-xs active:scale-90 transition-all font-bold"
            aria-label="Tanlash"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
