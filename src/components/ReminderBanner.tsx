"use client";

import React, { useState } from "react";
import { Bell, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { REMINDER_DAYS_BEFORE } from "@/config/service";
import { daysUntil } from "@/utils/schedule";

export const ReminderBanner: React.FC = () => {
  const { occasions, setSelectedCategory, setActiveTab, t } = useApp();
  const [now] = useState(() => new Date());

  const upcoming = occasions
    .map((occasion) => ({ occasion, days: daysUntil(occasion, now) }))
    .filter(({ days }) => days <= REMINDER_DAYS_BEFORE)
    .sort((a, b) => a.days - b.days)[0];

  if (!upcoming) return null;

  const open = () => {
    setSelectedCategory("cakes");
    setActiveTab("menu");
  };

  const title = upcoming.occasion.title;

  return (
    <div className="px-4 pb-3">
      <button onClick={open} className="w-full rounded-[20px] bg-rose-soft p-3.5 flex items-center gap-3 text-left">
        <Bell className="w-5 h-5 text-rose flex-shrink-0" />
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-bold text-ink truncate">
            {upcoming.days === 0
              ? t("{title}: bugun", { title })
              : t("{title}: {n} kundan keyin", { title, n: upcoming.days })}
          </span>
          <span className="block text-xs text-muted">{t("Oldindan tort buyurtma qiling")}</span>
        </span>
        <ChevronRight className="w-5 h-5 text-muted flex-shrink-0" />
      </button>
    </div>
  );
};
