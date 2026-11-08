"use client";

import React, { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { HomeView } from "@/components/HomeView";
import { MenuView } from "@/components/MenuView";
import { FavoritesView } from "@/components/FavoritesView";
import { CartView } from "@/components/CartView";
import { BonusView } from "@/components/BonusView";
import { ProductModal } from "@/components/ProductModal";
import { AddressModal } from "@/components/AddressModal";
import { SettingsModal } from "@/components/SettingsModal";
import { TelegramOrderPreviewModal } from "@/components/TelegramOrderPreviewModal";
import { OrdersView } from "@/components/OrdersView";
import { BottomNav } from "@/components/BottomNav";
import { SplashScreen } from "@/components/SplashScreen";

function MainContent() {
  const {
    activeTab,
    selectedProductForModal,
    closeProductModal,
    isAddressModalOpen,
    isSettingsModalOpen,
    isOrdersOpen,
  } = useApp();

  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onEnter={() => setShowSplash(false)} />}

      <main className="flex-1 flex flex-col min-h-screen">
        {activeTab === "home" && <HomeView />}
        {activeTab === "favorites" && <FavoritesView />}
        {activeTab === "menu" && <MenuView />}
        {activeTab === "cart" && <CartView />}
        {activeTab === "qr" && <BonusView />}

        {selectedProductForModal && (
          <ProductModal
            key={selectedProductForModal.id}
            product={selectedProductForModal}
            onClose={closeProductModal}
          />
        )}
        {isAddressModalOpen && <AddressModal />}
        {isSettingsModalOpen && <SettingsModal />}
        {isOrdersOpen && <OrdersView />}
        <TelegramOrderPreviewModal />

        <BottomNav />
      </main>
    </>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
