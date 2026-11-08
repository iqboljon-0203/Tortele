"use client";

import React from "react";
import { Home, Heart, BookOpen, ShoppingBag, QrCode } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { NavTab } from "@/types";

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartItemsCount } = useApp();

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "home", label: "Asosiy", icon: Home },
    { id: "favorites", label: "Sevimlilar", icon: Heart },
    { id: "menu", label: "Menyu", icon: BookOpen },
    { id: "cart", label: "Savatcha", icon: ShoppingBag },
    { id: "qr", label: "Bonus QR", icon: QrCode },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#F0DDE4] z-40 px-3 py-2 shadow-[0_-4px_25px_rgba(42,10,19,0.08)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-all active:scale-90 ${
                isActive ? "text-[#631A30]" : "text-[#84626E] hover:text-[#2A0A13]"
              }`}
            >
              <div className="relative">
                <IconComponent
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "stroke-[2.5] scale-110 text-[#631A30]" : "stroke-[1.8]"
                  }`}
                />
                {/* Cart Badge */}
                {item.id === "cart" && cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#F5A623] text-[#2A0A13] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs ring-2 ring-white animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 transition-all ${
                  isActive ? "font-black text-[#631A30]" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
