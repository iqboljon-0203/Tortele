"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CategoryBar } from "./CategoryBar";
import { ProductGrid } from "./ProductGrid";

export const MenuView: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className="flex-1 pb-24 bg-[#FAF6F5]">
      {/* Search Header */}
      <div className="px-4 pt-3.5 pb-2.5 sticky top-0 z-20 bg-white border-b border-[#F0DDE4] shadow-xs">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tortlar, bento yoki shirinliklarni qidirish..."
            className="w-full bg-[#FAF6F5] pl-10 pr-9 py-2.5 rounded-2xl border border-[#F0DDE4] text-xs font-semibold text-[#2A0A13] placeholder:text-[#A8989F] focus:outline-none focus:border-[#631A30] shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#84626E] absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-[#84626E] hover:text-[#2A0A13]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <CategoryBar />

      {/* Products Grid */}
      <ProductGrid title="Katalog" />
    </div>
  );
};
