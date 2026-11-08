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
}

export type OrderType = "delivery" | "pickup";

export type NavTab = "home" | "favorites" | "menu" | "cart" | "qr";

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress: string;
  items: CartItem[];
  cutleryCount: number;
  itemsSubtotal: number;
  deliveryFee: number;
  bonusUsed: number;
  finalTotal: number;
  earnedCashback: number;
  createdAt: string;
  status: "yangi" | "qabul_qilindi" | "tayyorlanmoqda" | "yetkazilmoqda";
}

