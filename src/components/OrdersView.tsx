"use client";

import React from "react";
import { ChevronLeft, ReceiptText } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useOverlay } from "@/utils/useOverlay";

export const OrdersView: React.FC = () => {
  const { orders, closeOrders, reorder, price, productText, t } = useApp();
  useOverlay(closeOrders);

  return (
    <div className="fixed inset-0 z-50 max-w-md mx-auto bg-page flex flex-col animate-slide-up">
      <header className="relative h-14 flex items-center justify-center flex-shrink-0">
        <button
          onClick={closeOrders}
          aria-label={t("Orqaga")}
          className="absolute left-2 w-11 h-11 flex items-center justify-center text-ink"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-ink">{t("Buyurtmalar tarixi")}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-safe space-y-3">
        {orders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center pb-16">
            <ReceiptText className="w-16 h-16 text-muted/60 stroke-[1.1] mb-4" />
            <h2 className="text-lg font-bold text-ink">{t("Hali buyurtma bermagansiz")}</h2>
            <p className="text-sm text-muted mt-1">{t("Birinchi buyurtmangiz shu yerda ko'rinadi")}</p>
          </div>
        ) : (
          orders.map((order) => (
            <article key={order.orderId} className="card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ink">{order.orderId}</span>
                <span className="text-xs font-semibold text-rose">{t("Qabul qilindi")}</span>
              </div>
              <p className="text-xs text-muted mt-0.5">
                {order.slot.date} · {order.slot.time}
              </p>
              <ul className="mt-2.5 space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-3 text-[13px] text-ink">
                    <span className="min-w-0 truncate">{productText(item.product).name}</span>
                    <span className="flex-shrink-0 font-semibold">× {item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-3">
                <span className="text-base font-extrabold text-ink tabular-nums">{price(order.finalTotal)}</span>
                <button
                  onClick={() => reorder(order)}
                  className="h-10 px-3.5 rounded-[12px] bg-rose-soft text-rose text-[13px] font-bold"
                >
                  {t("Yana buyurtma berish")}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
