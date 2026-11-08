"use client";

import React from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { useApp } from "@/context/AppContext";

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="py-2.5">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4">
        {BRAND_CONFIG.categories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
                isActive
                  ? "bg-[#D47A96] text-white shadow-[0_4px_14px_rgba(212,122,150,0.35)]"
                  : "bg-white text-[#301D24] border border-[#F0E1E6] hover:border-[#D47A96]/50 shadow-2xs"
              }`}
            >
              <span className="text-sm">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
