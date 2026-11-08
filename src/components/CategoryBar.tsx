"use client";

import React from "react";
import { BRAND_CONFIG } from "@/config/brand";
import { useApp } from "@/context/AppContext";

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory, t } = useApp();

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
      {BRAND_CONFIG.categories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            aria-pressed={isActive}
            className={`flex-shrink-0 h-10 px-4 rounded-[12px] text-[13px] font-bold transition-colors ${
              isActive ? "bg-solid text-white" : "bg-surface text-ink"
            }`}
          >
            {t(category.name)}
          </button>
        );
      })}
    </div>
  );
};
