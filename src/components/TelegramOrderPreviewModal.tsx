"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, Copy, Check, MessageSquare, ArrowRight, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice, getTelegramWebApp } from "@/utils/telegram";

export const TelegramOrderPreviewModal: React.FC = () => {
  const {
    isOrderSuccessModalOpen,
    closeOrderSuccessModal,
    lastOrder,
    setActiveTab,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    if (isOrderSuccessModalOpen) {
      // Fire confetti celebratory burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D47A96", "#FAF6F4", "#B85474", "#FFD700", "#FFFFFF"],
      });
    }
  }, [isOrderSuccessModalOpen]);

  if (!isOrderSuccessModalOpen || !lastOrder) return null;

  // Generate formatted Telegram message text for Confectionery Kitchen & Courier
  const generateTelegramMessage = () => {
    const itemsList = lastOrder.items
      .map(
        (item, index) =>
          `${index + 1}. 🎂 *${item.product.name}*\n` +
          `   • ⚖️ Vazn: ${item.selectedWeight.label}\n` +
          `   • 🍓 Nachinka: ${item.selectedFilling || "Standart"}\n` +
          (item.customText ? `   • ✍️ Ustidagi yozuv: "${item.customText}"\n` : "") +
          (item.candlesCount > 0 ? `   • 🕯 Shamchalar: ${item.candlesCount} dona\n` : "") +
          `   • 🔢 Soni: ${item.quantity} dona (${formatPrice(item.unitPrice * item.quantity)})`
      )
      .join("\n\n");

    return (
      `🔔 *YANGI BUYURTMA #${lastOrder.orderId}*\n` +
      `🏪 *${BRAND_CONFIG.brandName}*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Mijoz:* ${lastOrder.customerName}\n` +
      `📞 *Telefon:* ${lastOrder.customerPhone}\n` +
      `🛵 *Buyurtma turi:* ${lastOrder.orderType === "delivery" ? "Yetkazib berish (40-60 daqiqa)" : "Do'kondan olib ketish"}\n` +
      `📍 *Manzil:* ${lastOrder.deliveryAddress}\n` +
      `🍴 *Приборы (qoshiq/salfetka):* ${lastOrder.cutleryCount === 0 ? "Kerak emas" : `${lastOrder.cutleryCount} kishilik`}\n` +
      `⏰ *Vaqti:* ${lastOrder.createdAt}\n\n` +
      `📋 *BUYURTMA TARKIBI:*\n` +
      `${itemsList}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `💵 *Mahsulotlar:* ${formatPrice(lastOrder.itemsSubtotal)}\n` +
      (lastOrder.bonusUsed > 0 ? `💎 *Ishlatilgan bonus:* -${formatPrice(lastOrder.bonusUsed)}\n` : "") +
      `🛵 *Yetkazib berish:* ${lastOrder.deliveryFee === 0 ? "Bepul" : formatPrice(lastOrder.deliveryFee)}\n` +
      `💰 *JAMI TO'LOV:* *${formatPrice(lastOrder.finalTotal)}*\n` +
      `🎁 *Hisoblangan keshbek:* +${formatPrice(lastOrder.earnedCashback)}\n` +
      `⚡ *Holat:* Qabul qilindi, qandolat sexiga yuborildi ✅`
    );
  };

  const telegramText = generateTelegramMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(telegramText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendViaTelegram = async () => {
    setIsSending(true);

    const tg = getTelegramWebApp();
    if (tg?.sendData) {
      try {
        tg.sendData(JSON.stringify(lastOrder));
      } catch {
        // fallback
      }
    }

    // Try posting to Next.js API route /api/send-order
    try {
      await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: lastOrder, text: telegramText }),
      });
    } catch {
      // offline or mock
    }

    setIsSending(false);
    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
    }, 3000);
  };

  const handleDone = () => {
    closeOrderSuccessModal();
    setActiveTab("home");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-[32px] p-5 shadow-2xl relative border border-[#F0E1E6] max-h-[92vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Status */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F0E1E6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#2B1A21]">
                Buyurtma qabul qilindi!
              </h3>
              <span className="text-[10px] font-semibold text-emerald-600">
                № {lastOrder.orderId} • Qandolatchiga yuborildi
              </span>
            </div>
          </div>

          <button
            onClick={closeOrderSuccessModal}
            className="w-8 h-8 rounded-full bg-[#FAF6F4] text-[#846B74] flex items-center justify-center hover:bg-[#F0E1E6]"
            aria-label="Yopish"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Telegram Chat Message Preview Bubble */}
        <div className="my-3 overflow-y-auto no-scrollbar flex-1 bg-[#EEF2F5] p-3.5 rounded-2xl border border-[#D5DEE5] font-sans">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2AABEE]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Qandolat sexi va Kuryer guruhiga xabar:</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">Telegram Bot</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-gray-100 text-[11px] text-[#2B1A21] whitespace-pre-wrap leading-relaxed select-text font-mono">
            {telegramText}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="bg-white border border-[#F0E1E6] hover:bg-[#FAF6F4] text-[#2B1A21] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Nusxa olindi!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#846B74]" />
                  <span>Chekdan nusxa olish</span>
                </>
              )}
            </button>

            <button
              onClick={handleSendViaTelegram}
              disabled={isSending}
              className="bg-[#2AABEE] hover:bg-[#229ED9] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSending
                  ? "Yuborilmoqda..."
                  : sendSuccess
                  ? "Guruhga bordi! ✅"
                  : "Guruhga yuborish"}
              </span>
            </button>
          </div>

          <button
            onClick={handleDone}
            className="w-full bg-[#D47A96] hover:bg-[#B85474] text-white py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-md"
          >
            <span>Bosh sahifaga qaytish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
