"use client";

import React from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { BonusCards } from "@/components/BonusCards";
import { OrderTypeSwitch } from "@/components/OrderTypeSwitch";
import { PromoBanner } from "@/components/PromoBanner";
import { CategoryBar } from "@/components/CategoryBar";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { CartView } from "@/components/CartView";
import { QRModal } from "@/components/QRModal";
import { AddressModal } from "@/components/AddressModal";
import { SettingsModal } from "@/components/SettingsModal";
import { TelegramOrderPreviewModal } from "@/components/TelegramOrderPreviewModal";
import { BottomNav } from "@/components/BottomNav";
import { FavoritesView } from "@/components/FavoritesView";
import { MenuView } from "@/components/MenuView";

function MainContent() {
  const {
    activeTab,
    selectedProductForModal,
    closeProductModal,
    openQRModal,
  } = useApp();

  // If user clicks "Bonus QR" tab from bottom nav, trigger QR view
  React.useEffect(() => {
    if (activeTab === "qr") {
      openQRModal();
    }
  }, [activeTab, openQRModal]);

  return (
    <main className="flex-1 flex flex-col min-h-screen relative pb-16">
      {/* Dynamic Tab Rendering */}
      {activeTab === "home" && (
        <div className="flex flex-col flex-1 pb-16">
          <Header />
          <BonusCards />
          <OrderTypeSwitch />
          <PromoBanner />
          <CategoryBar />
          <ProductGrid title="Ishtahaochar Shirinliklar" />
        </div>
      )}

      {activeTab === "favorites" && <FavoritesView />}

      {activeTab === "menu" && <MenuView />}

      {activeTab === "cart" && <CartView />}

      {activeTab === "qr" && (
        <div className="flex flex-col flex-1 pb-16">
          <Header />
          <BonusCards />
          <ProductGrid title="Katalog" />
        </div>
      )}

      {/* Modals & Overlays */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={closeProductModal}
        />
      )}

      <QRModal />
      <AddressModal />
      <SettingsModal />
      <TelegramOrderPreviewModal />

      {/* Persistent Smorodina Bottom Navigation Bar */}
      <BottomNav />
    </main>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
