"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BRAND_CONFIG, Product } from "@/config/brand";
import { CartItem, NavTab, OrderDetails, OrderType } from "@/types";
import { getTelegramWebApp, initTelegramApp, triggerHaptic } from "@/utils/telegram";

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cutleryCount: number;
  setCutleryCount: (val: number | ((prev: number) => number)) => void;
  useBonus: boolean;
  setUseBonus: (val: boolean | ((prev: boolean) => boolean)) => void;
  bonusBalance: number;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  isQRModalOpen: boolean;
  openQRModal: () => void;
  closeQRModal: () => void;
  isAddressModalOpen: boolean;
  openAddressModal: () => void;
  closeAddressModal: () => void;
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  isOrderSuccessModalOpen: boolean;
  lastOrder: OrderDetails | null;
  submitOrder: () => void;
  closeOrderSuccessModal: () => void;
  userName: string;
  setUserName: (name: string) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
  // Calculations
  cartItemsCount: number;
  itemsSubtotal: number;
  deliveryFee: number;
  bonusDeduction: number;
  finalTotal: number;
  earnedCashback: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cutleryCount, setCutleryCount] = useState<number>(2); // Default 2 kishilik
  const [useBonus, setUseBonus] = useState<boolean>(false);
  const [bonusBalance, setBonusBalance] = useState<number>(BRAND_CONFIG.initialBonusCoins);
  const [activeTab, setActiveTabState] = useState<NavTab>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>(["bento-love", "dubai-chocolate-cake"]);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState<string>(BRAND_CONFIG.defaultAddress);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [userName, setUserName] = useState<string>("Azizbek");
  const [userPhone, setUserPhone] = useState<string>("+998 90 123 45 67");

  // Initialize Telegram SDK
  useEffect(() => {
    initTelegramApp();
    const tg = getTelegramWebApp();
    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      const fullName = [u.first_name, u.last_name].filter(Boolean).join(" ");
      if (fullName) setUserName(fullName);
    }
  }, []);

  const setActiveTab = (tab: NavTab) => {
    triggerHaptic("selection");
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProductModal = (product: Product) => {
    triggerHaptic("light");
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  const openQRModal = () => {
    triggerHaptic("medium");
    setIsQRModalOpen(true);
  };

  const closeQRModal = () => {
    setIsQRModalOpen(false);
  };

  const openAddressModal = () => {
    triggerHaptic("light");
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const openSettingsModal = () => {
    triggerHaptic("light");
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const toggleFavorite = (productId: string) => {
    triggerHaptic("medium");
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const addToCart = (item: Omit<CartItem, "id">) => {
    triggerHaptic("success");
    const newItemId = `${item.product.id}_${item.selectedWeight.weightGrams}_${item.selectedFilling}_${item.customText || "none"}_${item.candlesCount}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === newItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      } else {
        return [...prev, { ...item, id: newItemId }];
      }
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    triggerHaptic("light");
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    triggerHaptic("warning");
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart calculations
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemsSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const deliveryFee =
    orderType === "pickup"
      ? 0
      : itemsSubtotal >= BRAND_CONFIG.freeDeliveryThreshold || itemsSubtotal === 0
      ? 0
      : BRAND_CONFIG.deliveryFee;

  const bonusDeduction = useBonus ? Math.min(bonusBalance, itemsSubtotal) : 0;
  const finalTotal = Math.max(0, itemsSubtotal - bonusDeduction + deliveryFee);
  const earnedCashback = Math.round((finalTotal * BRAND_CONFIG.cashbackPercent) / 100);

  const submitOrder = () => {
    if (cart.length === 0) return;
    triggerHaptic("success");

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const order: OrderDetails = {
      orderId: `SM-${orderNum}`,
      customerName: userName,
      customerPhone: userPhone,
      orderType,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : "Do'kondan olib ketish",
      items: [...cart],
      cutleryCount,
      itemsSubtotal,
      deliveryFee,
      bonusUsed: bonusDeduction,
      finalTotal,
      earnedCashback,
      createdAt: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
      status: "qabul_qilindi",
    };

    setLastOrder(order);

    // Update bonus balance if used
    if (useBonus && bonusDeduction > 0) {
      setBonusBalance((prev) => Math.max(0, prev - bonusDeduction));
    }
    // Add cashback to bonus balance for demo delight
    setBonusBalance((prev) => prev + earnedCashback);

    // Reset cart and options
    setCart([]);
    setUseBonus(false);
    setIsOrderSuccessModalOpen(true);
  };

  const closeOrderSuccessModal = () => {
    setIsOrderSuccessModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cutleryCount,
        setCutleryCount,
        useBonus,
        setUseBonus,
        bonusBalance,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        favorites,
        toggleFavorite,
        isFavorite,
        orderType,
        setOrderType,
        deliveryAddress,
        setDeliveryAddress,
        selectedProductForModal,
        openProductModal,
        closeProductModal,
        isQRModalOpen,
        openQRModal,
        closeQRModal,
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal,
        isSettingsModalOpen,
        openSettingsModal,
        closeSettingsModal,
        isOrderSuccessModalOpen,
        lastOrder,
        submitOrder,
        closeOrderSuccessModal,
        userName,
        setUserName,
        userPhone,
        setUserPhone,
        cartItemsCount,
        itemsSubtotal,
        deliveryFee,
        bonusDeduction,
        finalTotal,
        earnedCashback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

