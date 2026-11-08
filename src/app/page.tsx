"use client";

import React, { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { BonusCards } from "@/components/BonusCards";
import { OrderTypeSwitch } from "@/components/OrderTypeSwitch";
import { CollectionsBar } from "@/components/CollectionsBar";
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
import { SplashScreen } from "@/components/SplashScreen";

function MainContent() {
  const {
    activeTab,
    selectedProductForModal,
    closeProductModal,
    openQRModal,
    setSelectedCategory,
  } = useApp();

  const [showSplash, setShowSplash] = useState(true);

  // If user clicks "Bonus QR" tab from bottom nav, trigger QR view
  React.useEffect(() => {
    if (activeTab === "qr") {
      openQRModal();
    }
  }, [activeTab, openQRModal]);

  return (
    <>
      {/* Intro / Splash Screen (Screen 1 of Velvet Crumbs reference) */}
      {showSplash && (
        <SplashScreen
          onEnter={() => setShowSplash(false)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      )}

      <main className="flex-1 flex flex-col min-h-screen relative pb-16 bg-[#420F1D]">
        {/* Dynamic Tab Rendering */}
        {activeTab === "home" && (
          <div className="flex flex-col flex-1">
            {/* Upper Region: Deep Velvet Berry */}
            <div className="bg-gradient-to-b from-[#420F1D] via-[#631A30] to-[#501324] pb-2">
              <Header />
              <BonusCards />
              <OrderTypeSwitch />
              <CollectionsBar />
            </div>

            {/* Lower Region: Curved White Bottom Sheet (Screen 2: Popular Picks) */}
            <div className="bg-[#FAF6F5] rounded-t-[36px] pt-4 pb-20 shadow-[0_-10px_40px_rgba(0,0,0,0.25)] flex-1 min-h-[500px]">
              <CategoryBar />
              <ProductGrid title="Popular Picks" />
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="bg-[#FAF6F5] min-h-screen flex-1">
            <FavoritesView />
          </div>
        )}

        {activeTab === "menu" && (
          <div className="bg-[#FAF6F5] min-h-screen flex-1">
            <MenuView />
          </div>
        )}

        {activeTab === "cart" && (
          <div className="bg-[#FAF6F5] min-h-screen flex-1">
            <CartView />
          </div>
        )}

        {activeTab === "qr" && (
          <div className="flex flex-col flex-1 bg-gradient-to-b from-[#420F1D] via-[#631A30] to-[#501324]">
            <Header />
            <BonusCards />
            <div className="bg-[#FAF6F5] rounded-t-[36px] pt-4 pb-20 mt-2 flex-1 shadow-2xl">
              <ProductGrid title="Katalog" />
            </div>
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
        <SettingsModal onShowSplash={() => setShowSplash(true)} />
        <TelegramOrderPreviewModal />

        {/* Persistent Bottom Navigation Bar */}
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
