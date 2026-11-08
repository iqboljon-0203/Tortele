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
      className="bg-white rounded-3xl p-3 border border-[#F0E1E6] shadow-[0_4px_16px_rgba(43,26,33,0.05)] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative group active:scale-[0.98]"
    >
      {/* Top action row: Badges and Favorite Heart */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1">
          {product.isPopular && (
            <span className="bg-[#D47A96] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
              Hit 🔥
            </span>
          )}
          {product.isNew && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
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
              : "bg-white/90 text-[#846B74] backdrop-blur-xs hover:text-rose-500 shadow-xs"
          }`}
          aria-label="Sevimlilar"
        >
          <Heart className={`w-4 h-4 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>

      {/* Appetizing Dish Photo */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF6F4] mt-1 mb-2.5">
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
        <div className="flex items-center justify-between text-[11px] text-[#846B74] mb-1">
          <div className="flex items-center gap-1 font-semibold text-amber-600">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span className="bg-[#FAF6F4] px-1.5 py-0.5 rounded-md font-medium text-[#846B74]">
            {product.baseWeight}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-xs font-bold text-[#2B1A21] line-clamp-2 leading-snug mb-2 flex-1">
          {product.name}
        </h4>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between pt-1.5 border-t border-[#F0E1E6]/60">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#846B74] font-medium leading-none">
              boshlab
            </span>
            <span className="text-sm font-extrabold text-[#2B1A21]">
              {formatPrice(product.basePrice).replace(" so'm", "")}
            </span>
            <span className="text-[9px] font-bold text-[#D47A96] leading-none uppercase">
              so&apos;m
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="w-8 h-8 rounded-xl bg-[#D47A96] hover:bg-[#B85474] text-white flex items-center justify-center shadow-xs active:scale-90 transition-all"
            aria-label="Tanlash"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
