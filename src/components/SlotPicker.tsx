"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { DeliverySlot } from "@/types";
import { getAvailableDates, getSlotsForDate, toIsoDate } from "@/utils/schedule";

const chipClass = (active: boolean) =>
  `flex-shrink-0 rounded-[12px] font-bold transition-colors ${active ? "bg-rose text-white" : "bg-page text-ink"}`;

export const SlotPicker: React.FC<{ slot: DeliverySlot; leadHours: number; now: Date }> = ({ slot, leadHours, now }) => {
  const { setDeliverySlot, orderType, lang, t } = useApp();

  const dates = getAvailableDates(leadHours, now);
  const times = getSlotsForDate(slot.date, leadHours, now);
  const today = toIsoDate(now);
  const tomorrow = toIsoDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));

  const locale = lang === "ru" ? "ru-RU" : "uz-Latn-UZ";
  const dateParts = (iso: string) => {
    const date = new Date(`${iso}T12:00:00`);
    return {
      top: iso === today ? t("Bugun") : iso === tomorrow ? t("Ertaga") : date.toLocaleDateString(locale, { weekday: "short" }),
      bottom: date.toLocaleDateString(locale, { day: "numeric", month: "short" }),
    };
  };

  const selectDate = (date: string) => {
    setDeliverySlot({ date, time: getSlotsForDate(date, leadHours, now)[0] });
  };

  const earliest = dateParts(dates[0]);
  const earliestTime = getSlotsForDate(dates[0], leadHours, now)[0];

  return (
    <section className="card p-3.5">
      <h2 className="text-[13px] font-semibold text-ink">
        {orderType === "delivery" ? t("Yetkazish vaqti") : t("Olib ketish vaqti")}
      </h2>
      <p className="text-xs text-muted mb-3">
        {t("Eng tez: {date}, {time}", { date: earliest.top, time: earliestTime })}
      </p>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-3.5 px-3.5" role="radiogroup" aria-label={t("Sana")}>
        {dates.map((date) => {
          const parts = dateParts(date);
          return (
            <button
              key={date}
              role="radio"
              aria-checked={slot.date === date}
              onClick={() => selectDate(date)}
              className={`${chipClass(slot.date === date)} w-[76px] h-[54px] flex flex-col items-center justify-center`}
            >
              <span className="text-[13px] leading-4">{parts.top}</span>
              <span className={`text-[11px] font-medium ${slot.date === date ? "text-white/85" : "text-muted"}`}>{parts.bottom}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2" role="radiogroup" aria-label={t("Yetkazish vaqti")}>
        {times.map((time) => (
          <button
            key={time}
            role="radio"
            aria-checked={slot.time === time}
            onClick={() => setDeliverySlot({ date: slot.date, time })}
            className={`${chipClass(slot.time === time)} h-11 text-xs tabular-nums`}
          >
            {time}
          </button>
        ))}
      </div>
    </section>
  );
};
