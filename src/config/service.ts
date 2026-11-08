// Business rules for scheduling and loyalty. Adjust these values to match how the shop actually works.

export const TIME_SLOTS = [
  "10:00–12:00",
  "12:00–14:00",
  "14:00–16:00",
  "16:00–18:00",
  "18:00–20:00",
  "20:00–22:00",
];

export const DAYS_AHEAD = 14;

/** Minimum preparation time per category, in hours. */
export const LEAD_HOURS: Record<string, number> = {
  bento: 3,
  art: 3,
  cakes: 24,
  bakery: 1,
  coffee: 1,
};

export const REMINDER_DAYS_BEFORE = 3;

export interface LoyaltyTier {
  id: string;
  name: string;
  minSpent: number;
  cashbackPercent: number;
  freeDelivery: boolean;
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  { id: "silver", name: "Silver", minSpent: 0, cashbackPercent: 5, freeDelivery: false },
  { id: "gold", name: "Gold", minSpent: 2000000, cashbackPercent: 7, freeDelivery: false },
  { id: "vip", name: "VIP", minSpent: 5000000, cashbackPercent: 10, freeDelivery: true },
];
