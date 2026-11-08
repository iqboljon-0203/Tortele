import { DAYS_AHEAD, LEAD_HOURS, TIME_SLOTS } from "@/config/service";
import { CartItem, DeliverySlot, Occasion } from "@/types";

const pad = (n: number) => String(n).padStart(2, "0");

export const toIsoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const getLeadHours = (cart: CartItem[]) =>
  cart.reduce((max, item) => Math.max(max, LEAD_HOURS[item.product.category] ?? 3), 1);

const slotStart = (date: string, time: string) => new Date(`${date}T${time.slice(0, 5)}:00`);

export const getSlotsForDate = (date: string, leadHours: number, now: Date) => {
  const earliest = now.getTime() + leadHours * 3600000;
  return TIME_SLOTS.filter((time) => slotStart(date, time).getTime() >= earliest);
};

export const getAvailableDates = (leadHours: number, now: Date) => {
  const dates: string[] = [];
  for (let i = 0; i < DAYS_AHEAD; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const iso = toIsoDate(d);
    if (getSlotsForDate(iso, leadHours, now).length > 0) dates.push(iso);
  }
  return dates;
};

/** Keeps the customer's choice while it is still possible, otherwise picks the earliest slot. */
export const resolveSlot = (slot: DeliverySlot | null, leadHours: number, now: Date): DeliverySlot | null => {
  if (slot && getSlotsForDate(slot.date, leadHours, now).includes(slot.time)) return slot;
  const date = getAvailableDates(leadHours, now)[0];
  return date ? { date, time: getSlotsForDate(date, leadHours, now)[0] } : null;
};

/** Days from today until the occasion's next yearly date. */
export const daysUntil = (occasion: Occasion, now: Date) => {
  const [month, day] = occasion.date.split("-").map(Number);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next < today) next = new Date(now.getFullYear() + 1, month - 1, day);
  return Math.round((next.getTime() - today.getTime()) / 86400000);
};
