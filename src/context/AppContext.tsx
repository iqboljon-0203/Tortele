"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BRAND_CONFIG, Product } from "@/config/brand";
import { LOYALTY_TIERS, LoyaltyTier } from "@/config/service";
import { RU, RU_PRODUCTS } from "@/i18n/ru";
import { CartItem, DeliverySlot, GiftDetails, Lang, NavTab, Occasion, OrderDetails, OrderType } from "@/types";
import { formatPrice, getTelegramWebApp, initTelegramApp, triggerHaptic } from "@/utils/telegram";
import { getWeightOptions } from "@/utils/product";
import { toIsoDate } from "@/utils/schedule";

const STORAGE_KEY = "tortele-app-v1";
const EMPTY_GIFT: GiftDetails = { recipientName: "", recipientPhone: "", cardText: "", hidePrice: false };

type Translate = (text: string, vars?: Record<string, string | number>) => string;

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translate;
  price: (amount: number) => string;
  productText: (product: Product) => { name: string; description: string };
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
  deliverySlot: DeliverySlot | null;
  setDeliverySlot: (slot: DeliverySlot) => void;
  isGift: boolean;
  setIsGift: (value: boolean) => void;
  gift: GiftDetails;
  updateGift: (patch: Partial<GiftDetails>) => void;
  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  openQRModal: () => void;
  isAddressModalOpen: boolean;
  openAddressModal: () => void;
  closeAddressModal: () => void;
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  isOrdersOpen: boolean;
  openOrders: () => void;
  closeOrders: () => void;
  orders: OrderDetails[];
  reorder: (order: OrderDetails) => void;
  isOrderSuccessModalOpen: boolean;
  lastOrder: OrderDetails | null;
  submitOrder: (slot: DeliverySlot) => void;
  closeOrderSuccessModal: () => void;
  userName: string;
  setUserName: (name: string) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
  customerId: string;
  occasions: Occasion[];
  addOccasion: (title: string, date: string) => void;
  removeOccasion: (id: string) => void;
  tier: LoyaltyTier;
  nextTier: LoyaltyTier | null;
  totalSpent: number;
  // Calculations
  cartItemsCount: number;
  itemsSubtotal: number;
  deliveryFee: number;
  bonusDeduction: number;
  finalTotal: number;
  earnedCashback: number;
}

interface SavedState {
  lang: Lang;
  cart: CartItem[];
  favorites: string[];
  orderType: OrderType;
  deliveryAddress: string;
  cutleryCount: number;
  bonusBalance: number;
  orders: OrderDetails[];
  occasions: Occasion[];
  userName: string;
  userPhone: string;
  customerId: string;
}

const loadSaved = (): Partial<SavedState> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

/** Re-links saved cart lines to the current catalog so prices never go stale. */
const refreshCartItem = (item: CartItem): CartItem | null => {
  const product = BRAND_CONFIG.products.find((p) => p.id === item.product.id);
  const weight = product && getWeightOptions(product).find((w) => w.weightGrams === item.selectedWeight.weightGrams);
  if (!product || !weight) return null;
  return { ...item, product, selectedWeight: weight, unitPrice: Math.round(product.basePrice * weight.multiplier) };
};

const applyTheme = () => {
  const tg = getTelegramWebApp();
  const scheme =
    tg?.colorScheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = scheme;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hydrated, setHydrated] = useState(false);
  const [lang, setLang] = useState<Lang>("uz");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cutleryCount, setCutleryCount] = useState<number>(2);
  const [useBonus, setUseBonus] = useState<boolean>(false);
  const [bonusBalance, setBonusBalance] = useState<number>(BRAND_CONFIG.initialBonusCoins);
  const [activeTab, setActiveTabState] = useState<NavTab>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState<string>(BRAND_CONFIG.defaultAddress);
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot | null>(null);
  const [isGift, setIsGift] = useState(false);
  const [gift, setGift] = useState<GiftDetails>(EMPTY_GIFT);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");

  // Saved data and Telegram identity exist only in the browser, so they load once after mount.
  useEffect(() => {
    const saved = loadSaved();

    /* eslint-disable react-hooks/set-state-in-effect */
    if (saved.lang) setLang(saved.lang);
    setCart((saved.cart ?? []).map(refreshCartItem).filter((item): item is CartItem => item !== null));
    setFavorites(saved.favorites ?? []);
    if (saved.orderType) setOrderType(saved.orderType);
    if (saved.deliveryAddress) setDeliveryAddress(saved.deliveryAddress);
    if (saved.cutleryCount !== undefined) setCutleryCount(saved.cutleryCount);
    if (saved.bonusBalance !== undefined) setBonusBalance(saved.bonusBalance);
    setOrders(saved.orders ?? []);
    setOccasions(saved.occasions ?? []);
    setUserName(saved.userName ?? "");
    setUserPhone(saved.userPhone ?? "");
    setCustomerId(saved.customerId || `TL-G${Math.floor(100000 + Math.random() * 900000)}`);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // The Telegram SDK loads after hydration, so wait briefly for it before reading the user.
  useEffect(() => {
    let attempts = 0;
    const timer = setInterval(() => {
      const tg = getTelegramWebApp();
      if (!tg && ++attempts < 30) return;
      clearInterval(timer);
      if (!tg) return;

      initTelegramApp();
      applyTheme();
      tg.onEvent?.("themeChanged", applyTheme);
      const user = tg.initDataUnsafe?.user;
      if (!user) return;
      setCustomerId(`TL-${user.id}`);
      setUserName((name) => name || [user.first_name, user.last_name].filter(Boolean).join(" "));
      if (user.language_code === "ru" && !loadSaved().lang) setLang("ru");
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: SavedState = {
      lang,
      cart,
      favorites,
      orderType,
      deliveryAddress,
      cutleryCount,
      bonusBalance,
      orders,
      occasions,
      userName,
      userPhone,
      customerId,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked: the app keeps working for this session.
    }
  }, [hydrated, lang, cart, favorites, orderType, deliveryAddress, cutleryCount, bonusBalance, orders, occasions, userName, userPhone, customerId]);

  // Follow the Telegram or system colour scheme.
  useEffect(() => {
    applyTheme();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);
    return () => {
      getTelegramWebApp()?.offEvent?.("themeChanged", applyTheme);
      media.removeEventListener("change", applyTheme);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t: Translate = useCallback(
    (text, vars) => {
      let result = lang === "ru" ? RU[text] ?? text : text;
      if (vars) {
        for (const [key, value] of Object.entries(vars)) result = result.replace(`{${key}}`, String(value));
      }
      return result;
    },
    [lang]
  );

  const price = (amount: number) => formatPrice(amount).replace("so'm", t("so'm"));

  const productText = (product: Product) =>
    (lang === "ru" && RU_PRODUCTS[product.id]) || { name: product.name, description: product.description };

  const setActiveTab = (tab: NavTab) => {
    triggerHaptic("selection");
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProductModal = (product: Product) => {
    triggerHaptic("light");
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => setSelectedProductForModal(null);
  const openQRModal = () => setActiveTab("qr");

  const openAddressModal = () => {
    triggerHaptic("light");
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => setIsAddressModalOpen(false);

  const openSettingsModal = () => {
    triggerHaptic("light");
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  const openOrders = () => {
    triggerHaptic("light");
    setIsOrdersOpen(true);
  };

  const closeOrders = () => setIsOrdersOpen(false);

  const toggleFavorite = (productId: string) => {
    triggerHaptic("medium");
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const addToCart = (item: Omit<CartItem, "id">) => {
    triggerHaptic("success");
    const id = `${item.product.id}_${item.selectedWeight.weightGrams}_${item.selectedFilling}_${item.customText || "none"}_${item.candlesCount}_${item.referenceImage?.length ?? 0}`;

    setCart((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i))
        : [...prev, { ...item, id }]
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    triggerHaptic("light");
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        const quantity = item.quantity + delta;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      })
    );
  };

  const removeFromCart = (id: string) => {
    triggerHaptic("warning");
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const reorder = (order: OrderDetails) => {
    order.items
      .map(refreshCartItem)
      .filter((item): item is CartItem => item !== null)
      .forEach(addToCart);
    setIsOrdersOpen(false);
    setActiveTab("cart");
  };

  const addOccasion = (title: string, date: string) => {
    setOccasions((prev) => [...prev, { id: `${Date.now()}`, title, date }]);
  };

  const removeOccasion = (id: string) => setOccasions((prev) => prev.filter((o) => o.id !== id));

  const updateGift = (patch: Partial<GiftDetails>) => setGift((prev) => ({ ...prev, ...patch }));

  // Loyalty
  const totalSpent = orders.reduce((sum, order) => sum + order.finalTotal, 0);
  const tierIndex = LOYALTY_TIERS.reduce((best, tier, i) => (totalSpent >= tier.minSpent ? i : best), 0);
  const tier = LOYALTY_TIERS[tierIndex];
  const nextTier = LOYALTY_TIERS[tierIndex + 1] ?? null;

  // Cart calculations
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemsSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const deliveryFee =
    orderType === "pickup" || tier.freeDelivery
      ? 0
      : itemsSubtotal >= BRAND_CONFIG.freeDeliveryThreshold || itemsSubtotal === 0
      ? 0
      : BRAND_CONFIG.deliveryFee;

  const bonusDeduction = useBonus ? Math.min(bonusBalance, itemsSubtotal) : 0;
  const finalTotal = Math.max(0, itemsSubtotal - bonusDeduction + deliveryFee);
  const earnedCashback = Math.round((finalTotal * tier.cashbackPercent) / 100);

  const submitOrder = (slot: DeliverySlot) => {
    if (cart.length === 0) return;
    triggerHaptic("success");

    const now = new Date();
    const order: OrderDetails = {
      orderId: `SM-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: userName || "Mijoz",
      customerPhone: userPhone,
      orderType,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : "Do'kondan olib ketish",
      slot,
      gift: isGift ? gift : null,
      items: [...cart],
      cutleryCount,
      itemsSubtotal,
      deliveryFee,
      bonusUsed: bonusDeduction,
      finalTotal,
      earnedCashback,
      createdAt: now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
      createdDate: toIsoDate(now),
      status: "qabul_qilindi",
    };

    setLastOrder(order);
    // History leaves out photos: they are large and only needed once, for the kitchen.
    setOrders((prev) =>
      [{ ...order, items: order.items.map((item) => ({ ...item, referenceImage: undefined })) }, ...prev].slice(0, 30)
    );
    setBonusBalance((prev) => Math.max(0, prev - bonusDeduction) + earnedCashback);

    setCart([]);
    setUseBonus(false);
    setIsGift(false);
    setGift(EMPTY_GIFT);
    setDeliverySlot(null);
    setIsOrderSuccessModalOpen(true);
  };

  const closeOrderSuccessModal = () => setIsOrderSuccessModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        price,
        productText,
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
        deliverySlot,
        setDeliverySlot,
        isGift,
        setIsGift,
        gift,
        updateGift,
        selectedProductForModal,
        openProductModal,
        closeProductModal,
        openQRModal,
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal,
        isSettingsModalOpen,
        openSettingsModal,
        closeSettingsModal,
        isOrdersOpen,
        openOrders,
        closeOrders,
        orders,
        reorder,
        isOrderSuccessModalOpen,
        lastOrder,
        submitOrder,
        closeOrderSuccessModal,
        userName,
        setUserName,
        userPhone,
        setUserPhone,
        customerId,
        occasions,
        addOccasion,
        removeOccasion,
        tier,
        nextTier,
        totalSpent,
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
