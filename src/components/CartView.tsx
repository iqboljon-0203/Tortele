"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, Utensils, Sparkles, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice } from "@/utils/telegram";

export const CartView: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cutleryCount,
    setCutleryCount,
    useBonus,
    setUseBonus,
    bonusBalance,
    bonusDeduction,
    itemsSubtotal,
    deliveryFee,
    finalTotal,
    earnedCashback,
    orderType,
    deliveryAddress,
    submitOrder,
    setActiveTab,
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh] bg-[#FAF6F5]">
        <div className="w-24 h-24 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center mb-4 shadow-sm">
          <ShoppingBag className="w-10 h-10 text-[#631A30] stroke-[1.5]" />
        </div>
        <h3
          className="text-2xl font-normal text-[#2A0A13] mb-1"
          style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
        >
          Savatchangiz bo&apos;sh
        </h3>
        <p className="text-xs text-[#84626E] max-w-xs mb-6">
          Tortel&apos;e dan o&apos;zingiz yoqtirgan bento-tort, art-desert yoki yangi pishiriqlarni tanlang!
        </p>
        <button
          onClick={() => setActiveTab("menu")}
          className="bg-[#F5A623] hover:bg-[#E09418] text-[#2A0A13] px-6 py-3.5 rounded-2xl text-xs font-black shadow-md active:scale-95 transition-all"
        >
          Menyuga o&apos;tish
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 pb-32 bg-[#FAF6F5]">
      {/* Header */}
      <div className="px-4 py-3.5 flex items-center justify-between border-b border-[#F0DDE4] bg-white sticky top-0 z-20 shadow-xs">
        <div>
          <h2
            className="text-xl font-normal text-[#2A0A13]"
            style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
          >
            Savatcha
          </h2>
          <span className="text-[11px] text-[#84626E]">
            {cart.length} xil shirinlik tanlandi
          </span>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 shadow-2xs"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Tozalash</span>
        </button>
      </div>

      {/* Cart Items List */}
      <div className="p-4 space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-3.5 border border-[#F0DDE4] shadow-[0_4px_16px_rgba(42,10,19,0.04)] flex gap-3 relative"
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#FAF6F5] flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            {/* Item Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-xs font-bold text-[#2A0A13] line-clamp-1">
                    {item.product.name}
                  </h4>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#B8A4AC] hover:text-rose-500 p-0.5"
                    aria-label="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Selected Options Badges */}
                <div className="space-y-0.5 mt-1">
                  <span className="inline-block text-[10px] font-bold text-[#631A30] bg-[#FAF0F4] px-2 py-0.5 rounded-md">
                    ⚖️ {item.selectedWeight.label}
                  </span>
                  {item.selectedFilling && (
                    <div className="text-[10px] text-[#84626E] truncate">
                      🍓 Nachinka: {item.selectedFilling}
                    </div>
                  )}
                  {item.customText && (
                    <div className="text-[10px] text-[#2A0A13] font-semibold bg-[#FAF6F5] px-1.5 py-0.5 rounded border border-[#F0DDE4] truncate">
                      ✍️ &quot;{item.customText}&quot;
                    </div>
                  )}
                  {item.candlesCount > 0 && (
                    <div className="text-[10px] text-amber-700 font-medium">
                      🕯 Shamchalar: {item.candlesCount} dona (bepul)
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Quantity Modifier */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0DDE4]/60">
                <span className="text-xs font-black text-[#2A0A13]">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>

                <div className="flex items-center gap-2 bg-[#FAF6F5] px-2 py-1 rounded-xl border border-[#F0DDE4]">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-5 h-5 rounded-md bg-white text-[#2A0A13] flex items-center justify-center font-bold active:scale-90"
                  >
                    <Minus className="w-3 h-3 stroke-[3]" />
                  </button>
                  <span className="text-xs font-black w-4 text-center text-[#2A0A13]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-5 h-5 rounded-md bg-white text-[#2A0A13] flex items-center justify-center font-bold active:scale-90"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 🍴 Savatchada "Qoshiq/sanchqi va salfetka soni" (Количество приборов) */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#F0DDE4] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF0F4] text-[#631A30] flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2A0A13] block">
                Qoshiq / sanchqi va salfetkalar
              </span>
              <span className="text-[10px] text-[#84626E]">
                Ekologik sanchqi va qandolat salfetkalari
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF6F5] px-2 py-1 rounded-xl border border-[#F0DDE4]">
            <button
              onClick={() => setCutleryCount((c) => Math.max(0, c - 1))}
              className="w-6 h-6 rounded-lg bg-white text-[#2A0A13] flex items-center justify-center font-bold active:scale-90"
            >
              -
            </button>
            <span className="text-xs font-black min-w-14 text-center text-[#2A0A13]">
              {cutleryCount === 0 ? "Kerak emas" : `${cutleryCount} kishilik`}
            </span>
            <button
              onClick={() => setCutleryCount((c) => Math.min(20, c + 1))}
              className="w-6 h-6 rounded-lg bg-white text-[#2A0A13] flex items-center justify-center font-bold active:scale-90"
            >
              +
            </button>
          </div>
        </div>

        {/* 💎 "Yig'ilgan 25 000 so'm bonusni ishlatish" (Списать бонусы) */}
        <div className="bg-gradient-to-r from-white via-white to-[#FAF0F4] rounded-2xl p-3.5 border border-[#F0DDE4] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF0F4] text-[#631A30] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#2A0A13]">
                  Bonusni ishlatish
                </span>
                <span className="text-[10px] font-bold text-[#631A30] bg-[#FAF0F4] px-1.5 py-0.2 rounded-md">
                  {formatPrice(bonusBalance)} mavjud
                </span>
              </div>
              <span className="text-[10px] text-[#84626E] block">
                Buyurtmadan 25 000 so&apos;m chegirib beriladi
              </span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => setUseBonus(!useBonus)}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              useBonus ? "bg-[#631A30]" : "bg-[#E5D6DC]"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                useBonus ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Order Summary Calculations */}
        <div className="bg-white rounded-3xl p-4 border border-[#F0DDE4] space-y-2 shadow-xs">
          <h4 className="text-xs font-extrabold text-[#2A0A13] uppercase tracking-wider mb-2">
            Buyurtma hisob-kitobi
          </h4>

          <div className="flex justify-between text-xs text-[#84626E]">
            <span>Mahsulotlar summasi:</span>
            <span className="font-bold text-[#2A0A13]">{formatPrice(itemsSubtotal)}</span>
          </div>

          <div className="flex justify-between text-xs text-[#84626E]">
            <span>Yetkazib berish ({orderType === "delivery" ? "40 daqiqa" : "Olib ketish"}):</span>
            <span className={`font-bold ${deliveryFee === 0 ? "text-emerald-600" : "text-[#2A0A13]"}`}>
              {deliveryFee === 0 ? "BEPUL" : formatPrice(deliveryFee)}
            </span>
          </div>

          {useBonus && bonusDeduction > 0 && (
            <div className="flex justify-between text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-xl">
              <span>💎 Ishlatilgan bonus:</span>
              <span>-{formatPrice(bonusDeduction)}</span>
            </div>
          )}

          <div className="pt-2 border-t border-[#F0DDE4] flex justify-between items-baseline">
            <div>
              <span className="text-sm font-black text-[#2A0A13] block">Jami to&apos;lov:</span>
              <span className="text-[10px] font-bold text-[#631A30]">
                🎁 +{formatPrice(earnedCashback)} keshbek hisoblanadi
              </span>
            </div>
            <span className="text-lg font-black text-[#631A30]">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>

        {/* Delivery Address Note */}
        <div className="bg-white p-3 rounded-2xl border border-[#F0DDE4] flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold text-[#84626E] uppercase block">
              {orderType === "delivery" ? "Yetkazish manzili" : "Do'kondan olib ketish"}
            </span>
            <span className="font-semibold text-[#2A0A13] truncate block max-w-[260px]">
              {orderType === "delivery" ? deliveryAddress : BRAND_CONFIG.branches[0].name}
            </span>
          </div>
          <span className="text-[#631A30] text-xs font-bold">O&apos;zgartirish</span>
        </div>
      </div>

      {/* Sticky Golden Checkout Bar (Screen 3 & 4 style) */}
      <div className="fixed bottom-16 left-0 right-0 p-4 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-[#F0DDE4] z-30">
        <button
          onClick={submitOrder}
          className="w-full bg-[#F5A623] hover:bg-[#E09418] text-[#2A0A13] py-4 px-5 rounded-2xl font-black text-sm flex items-center justify-between shadow-[0_4px_25px_rgba(245,166,35,0.4)] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-2">
            <span>Buyurtma berish</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="bg-[#2A0A13] text-white px-3 py-1 rounded-xl text-xs font-black">
            {formatPrice(finalTotal)}
          </span>
        </button>
      </div>
    </div>
  );
};
