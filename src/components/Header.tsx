"use client";

import React from "react";
import { UserRound } from "lucide-react";
import { TorteleLogo } from "./TorteleLogo";
import { useApp } from "@/context/AppContext";

export const Header: React.FC = () => {
  const { openSettingsModal, userName, t } = useApp();
  const firstName = userName.split(" ")[0];

  return (
    <header className="px-4 pt-5 pb-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <TorteleLogo variant="horizontal" size={22} className="mb-2" />
        <h1 className="text-2xl font-extrabold text-ink tracking-tight truncate">
          {firstName ? t("Salom, {name}!", { name: firstName }) : t("Salom!")}
        </h1>
      </div>
      <button
        onClick={openSettingsModal}
        aria-label={t("Profil va sozlamalar")}
        className="card w-11 h-11 !rounded-full flex items-center justify-center text-ink active:scale-95 transition-transform flex-shrink-0"
      >
        <UserRound className="w-5 h-5" />
      </button>
    </header>
  );
};
