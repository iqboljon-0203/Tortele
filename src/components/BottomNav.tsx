"use client";

import React from "react";
import { Home, Heart, BookOpen, ShoppingBasket, QrCode } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { NavTab } from "@/types";

const NAV_ITEMS: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "home", label: "Asosiy", icon: Home },
  { id: "favorites", label: "Sevimli", icon: Heart },
  { id: "menu", label: "Menyu", icon: BookOpen },
  { id: "cart", label: "Savat", icon: ShoppingBasket },
  { id: "qr", label: "Bonus", icon: QrCode },
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartItemsCount, t } = useApp();

  return (
    <nav
      aria-label={t("Asosiy navigatsiya")}
      className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-surface z-40 shadow-float rounded-t-[22px] flex"
      style={{ height: "var(--nav-height)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive ? "text-rose" : "text-muted"
            }`}
          >
            <span className="relative" data-cart-target={id === "cart" ? "" : undefined}>
              <Icon className={`w-[22px] h-[22px] ${isActive ? "stroke-[2.3]" : "stroke-[1.8]"}`} />
              {id === "cart" && cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-surface">
                  {cartItemsCount}
                </span>
              )}
            </span>
            <span className={`text-[11px] ${isActive ? "font-bold" : "font-medium"}`}>{t(label)}</span>
          </button>
        );
      })}
    </nav>
  );
};
