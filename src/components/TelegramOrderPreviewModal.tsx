"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { formatPrice, triggerHaptic } from "@/utils/telegram";
import { OrderDetails } from "@/types";

type SendStatus = "sending" | "sent" | "demo" | "failed";

// Message for the confectionery kitchen and courier group
const buildTelegramMessage = (order: OrderDetails) => {
  const itemsList = order.items
    .map(
      (item, index) =>
        `${index + 1}. 🎂 <b>${item.product.name}</b>\n` +
        `   • ⚖️ Vazn: ${item.selectedWeight.label}\n` +
        `   • 🍓 Nachinka: ${item.selectedFilling || "Standart"}\n` +
        (item.customText ? `   • ✍️ Ustidagi yozuv: "${item.customText}"\n` : "") +
        (item.candlesCount > 0 ? `   • 🕯 Shamchalar: ${item.candlesCount} dona\n` : "") +
        (item.referenceImage ? `   • 🖼 Dizayn namunasi: alohida rasmda\n` : "") +
        `   • 🔢 Soni: ${item.quantity} dona (${formatPrice(item.unitPrice * item.quantity)})`
    )
    .join("\n\n");

  return (
    `🔔 <b>YANGI BUYURTMA #${order.orderId}</b>\n` +
    `🏪 <b>${BRAND_CONFIG.brandName}</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 <b>Mijoz:</b> ${order.customerName}\n` +
    `📞 <b>Telefon:</b> ${order.customerPhone}\n` +
    `🛵 <b>Buyurtma turi:</b> ${order.orderType === "delivery" ? "Yetkazib berish (40-60 daqiqa)" : "Do'kondan olib ketish"}\n` +
    `📍 <b>Manzil:</b> ${order.deliveryAddress}\n` +
    `📅 <b>Kerakli vaqt:</b> ${order.slot.date}, ${order.slot.time}\n` +
    `🍴 <b>Qoshiq/salfetka:</b> ${order.cutleryCount === 0 ? "Kerak emas" : `${order.cutleryCount} kishilik`}\n` +
    (order.gift
      ? `🎁 <b>Sovg'a oluvchi:</b> ${order.gift.recipientName}, ${order.gift.recipientPhone}\n` +
        (order.gift.cardText ? `💌 <b>Karta matni:</b> ${order.gift.cardText}\n` : "") +
        (order.gift.hidePrice ? `🙈 <b>Narxni ko'rsatmang</b>\n` : "")
      : "") +
    `⏰ <b>Buyurtma berildi:</b> ${order.createdDate} ${order.createdAt}\n\n` +
    `📋 <b>BUYURTMA TARKIBI:</b>\n` +
    `${itemsList}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `💵 <b>Mahsulotlar:</b> ${formatPrice(order.itemsSubtotal)}\n` +
    (order.bonusUsed > 0 ? `💎 <b>Ishlatilgan bonus:</b> -${formatPrice(order.bonusUsed)}\n` : "") +
    `🛵 <b>Yetkazib berish:</b> ${order.deliveryFee === 0 ? "Bepul" : formatPrice(order.deliveryFee)}\n` +
    `💰 <b>JAMI TO'LOV:</b> <b>${formatPrice(order.finalTotal)}</b>\n` +
    `🎁 <b>Hisoblangan keshbek:</b> +${formatPrice(order.earnedCashback)}`
  );
};

const STATUS_COPY: Record<SendStatus, { title: string; text: string }> = {
  sending: { title: "Buyurtma yuborilmoqda", text: "Bir oz kuting" },
  sent: { title: "Buyurtma qabul qilindi", text: "Tez orada siz bilan bog'lanamiz" },
  demo: { title: "Buyurtma saqlandi", text: "Demo rejim: guruhga yuborilmadi" },
  failed: { title: "Buyurtma yuborilmadi", text: "Internetni tekshirib, qayta urinib ko'ring" },
};

const OrderResult: React.FC<{ order: OrderDetails; onClose: () => void }> = ({ order, onClose }) => {
  const { price, productText, t } = useApp();
  const [status, setStatus] = useState<SendStatus>("sending");
  const startedRef = useRef(false);

  const send = useCallback(async () => {
    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Browsers cap keepalive bodies at 64 KB, which photos exceed.
        keepalive: !order.items.some((item) => item.referenceImage),
        body: JSON.stringify({ order, text: buildTelegramMessage(order) }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error);
      setStatus(result.demo ? "demo" : "sent");
      triggerHaptic("success");
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#B4527F", "#F8F5F3", "#C4608F", "#FFFFFF"],
      });
    } catch {
      setStatus("failed");
      triggerHaptic("error");
    }
  }, [order]);

  useEffect(() => {
    // Guards against a duplicate group message from effect re-runs.
    if (startedRef.current) return;
    startedRef.current = true;
    send();
  }, [send]);

  const retry = () => {
    setStatus("sending");
    send();
  };

  const copy = STATUS_COPY[status];

  return (
    <div className="fixed inset-0 z-50 max-w-md mx-auto bg-page flex flex-col animate-fade-in" aria-live="polite">
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-14 text-center">
        <div className="flex justify-center mb-4">
          {status === "sending" && <LoaderCircle className="w-16 h-16 text-rose stroke-[1.5] animate-spin" />}
          {(status === "sent" || status === "demo") && <CheckCircle2 className="w-16 h-16 text-rose stroke-[1.5]" />}
          {status === "failed" && <AlertCircle className="w-16 h-16 text-muted stroke-[1.5]" />}
        </div>
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">{t(copy.title)}</h1>
        <p className="text-sm text-muted mt-1.5">{t(copy.text)}</p>

        <div className="card p-4 mt-6 text-left space-y-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-muted">{t("Buyurtma raqami")}</span>
            <span className="font-bold text-ink">{order.orderId}</span>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 text-[13px] text-ink">
              <span className="min-w-0 truncate">{productText(item.product).name}</span>
              <span className="flex-shrink-0 font-semibold">× {item.quantity}</span>
            </div>
          ))}
          <div className="text-[13px] text-muted pt-1">
            {order.deliveryAddress}
            <br />
            {order.slot.date} · {order.slot.time}
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-line">
            <span className="text-sm font-bold text-ink">{t("Jami")}</span>
            <span className="text-lg font-extrabold text-rose tabular-nums">{price(order.finalTotal)}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-3 pb-safe">
        {status === "failed" ? (
          <button onClick={retry} className="btn-primary w-full">
            {t("Qayta yuborish")}
          </button>
        ) : (
          <button onClick={onClose} disabled={status === "sending"} className="btn-primary w-full disabled:opacity-50">
            {t("Bosh sahifaga qaytish")}
          </button>
        )}
      </div>
    </div>
  );
};

export const TelegramOrderPreviewModal: React.FC = () => {
  const { isOrderSuccessModalOpen, closeOrderSuccessModal, lastOrder, setActiveTab } = useApp();

  if (!isOrderSuccessModalOpen || !lastOrder) return null;

  const handleDone = () => {
    closeOrderSuccessModal();
    setActiveTab("home");
  };

  return <OrderResult key={lastOrder.orderId} order={lastOrder} onClose={handleDone} />;
};
