"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";

interface CollectionItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  startingPrice: string;
  image: string;
}

export const CollectionsBar: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useApp();

  const collections: CollectionItem[] = [
    {
      id: "bento-col",
      name: "Bento mo'jizalari",
      category: "bento",
      subtitle: "2-3 soatda tayyor",
      startingPrice: "155 000",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "art-col",
      name: "Bayramona desertlar",
      category: "art",
      subtitle: "Pista va malina (Hit)",
      startingPrice: "85 000",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "cakes-col",
      name: "Katta bayram tortlari",
      category: "cakes",
      subtitle: "Shohona to'y tortlari",
      startingPrice: "210 000",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "bakery-col",
      name: "Yangi pishiriqlar",
      category: "bakery",
      subtitle: "Fransuz kruassani",
      startingPrice: "45 000",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setActiveTab("menu");
  };

  return (
    <div className="pt-1 pb-3">
      <div className="px-4 mb-2 flex items-center justify-between">
        <h3
          className="text-lg font-normal text-white tracking-wide"
          style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
        >
          Bizning to&apos;plamlar
        </h3>
        <button
          onClick={() => setActiveTab("menu")}
          className="text-xs font-bold text-rose-200/80 hover:text-white"
        >
          Barchasi ›
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-4">
        {collections.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelect(item.category)}
            className="flex-shrink-0 bg-white/95 hover:bg-white rounded-2xl p-2.5 flex items-center gap-2.5 text-left border border-white/20 shadow-md active:scale-95 transition-all w-52 group"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF6F5] flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#2A0A13] truncate leading-tight">
                {item.name}
              </h4>
              <p className="text-[10px] text-[#84626E] truncate mt-0.5">
                {item.subtitle}
              </p>
              <span className="inline-block mt-1 text-[10px] font-black text-[#631A30] bg-[#FAF0F4] px-1.5 py-0.2 rounded-md">
                {item.startingPrice} so&apos;mdan
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
