import { Product, WeightOption } from "@/config/brand";

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  selectedWeight: WeightOption;
  selectedFilling: string;
  customText: string;
  candlesCount: number;
  quantity: number;
  unitPrice: number;
  /** Customer's design reference, as a resized JPEG data URL. */
  referenceImage?: string;
}

export type OrderType = "delivery" | "pickup";

export type NavTab = "home" | "favorites" | "menu" | "cart" | "qr";

export type Lang = "uz" | "ru";

export interface DeliverySlot {
  date: string; // YYYY-MM-DD
  time: string;
}

export interface GiftDetails {
  recipientName: string;
  recipientPhone: string;
  cardText: string;
  hidePrice: boolean;
}

export interface Occasion {
  id: string;
  title: string;
  date: string; // MM-DD
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress: string;
  slot: DeliverySlot;
  gift: GiftDetails | null;
  items: CartItem[];
  cutleryCount: number;
  itemsSubtotal: number;
  deliveryFee: number;
  bonusUsed: number;
  finalTotal: number;
  earnedCashback: number;
  createdAt: string;
  createdDate: string; // YYYY-MM-DD
  status: "yangi" | "qabul_qilindi" | "tayyorlanmoqda" | "yetkazilmoqda";
}
