"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Phone, Send, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { useOverlay } from "@/utils/useOverlay";
import { Lang } from "@/types";
import { TextField } from "./ui";

const LANGS: { id: Lang; label: string }[] = [
  { id: "uz", label: "O'zbekcha" },
  { id: "ru", label: "Русский" },
];

const LinkRow: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className="card min-h-[52px] px-3.5 flex items-center gap-3 text-sm font-semibold text-ink"
  >
    <span className="text-rose">{icon}</span>
    <span className="flex-1">{label}</span>
    <ChevronRight className="w-5 h-5 text-muted" />
  </a>
);

export const SettingsModal: React.FC = () => {
  const {
    closeSettingsModal,
    userName,
    setUserName,
    userPhone,
    setUserPhone,
    lang,
    setLang,
    occasions,
    addOccasion,
    removeOccasion,
    t,
  } = useApp();
  const [nameInput, setNameInput] = useState(userName);
  const [phoneInput, setPhoneInput] = useState(userPhone);
  const [occasionTitle, setOccasionTitle] = useState("");
  const [occasionDate, setOccasionDate] = useState("");
  useOverlay(closeSettingsModal);

  const handleSave = () => {
    setUserName(nameInput.trim());
    setUserPhone(phoneInput.trim());
    closeSettingsModal();
  };

  const handleAddOccasion = () => {
    if (!occasionTitle.trim() || !occasionDate) return;
    addOccasion(occasionTitle.trim(), occasionDate.slice(5));
    setOccasionTitle("");
    setOccasionDate("");
  };

  return (
    <div className="fixed inset-0 z-50 max-w-md mx-auto bg-page flex flex-col animate-slide-up">
      <header className="relative h-14 flex items-center justify-center flex-shrink-0">
        <button
          onClick={closeSettingsModal}
          aria-label={t("Orqaga")}
          className="absolute left-2 w-11 h-11 flex items-center justify-center text-ink"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-ink">{t("Sozlamalar")}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 space-y-3">
        <div className="card p-3 space-y-2">
          <TextField label={t("Ism")} value={nameInput} onChange={setNameInput} />
          <TextField label={t("Telefon")} value={phoneInput} onChange={setPhoneInput} type="tel" />
        </div>

        <div className="grid grid-cols-2 gap-1 bg-line/70 p-1 rounded-[14px]" role="group" aria-label={t("Til")}>
          {LANGS.map((option) => (
            <button
              key={option.id}
              onClick={() => setLang(option.id)}
              aria-pressed={lang === option.id}
              className={`h-10 rounded-[11px] text-[13px] font-bold transition-colors ${
                lang === option.id ? "bg-solid text-white" : "text-muted"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <section className="card p-3.5">
          <h2 className="text-sm font-bold text-ink">{t("Muhim sanalar")}</h2>
          <p className="text-xs text-muted mb-2.5">{t("3 kun oldin ilovada eslatamiz")}</p>

          {occasions.map((occasion) => (
            <div key={occasion.id} className="min-h-11 flex items-center justify-between gap-2">
              <span className="min-w-0 text-[13px] font-semibold text-ink truncate">
                {occasion.title} <span className="font-medium text-muted">{occasion.date.split("-").reverse().join(".")}</span>
              </span>
              <button
                onClick={() => removeOccasion(occasion.id)}
                aria-label={`${t("O'chirish")}: ${occasion.title}`}
                className="w-11 h-11 -mr-2 flex items-center justify-center text-muted flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="space-y-2 mt-1">
            <TextField label={t("Kimning bayrami?")} value={occasionTitle} onChange={setOccasionTitle} maxLength={40} />
            <TextField label={t("Sana")} value={occasionDate} onChange={setOccasionDate} type="date" />
            <button
              onClick={handleAddOccasion}
              disabled={!occasionTitle.trim() || !occasionDate}
              className="w-full h-11 rounded-[12px] bg-rose-soft text-rose text-[13px] font-bold disabled:opacity-50"
            >
              {t("Qo'shish")}
            </button>
          </div>
        </section>

        <LinkRow
          href={`tel:${BRAND_CONFIG.supportPhone.replace(/\s/g, "")}`}
          icon={<Phone className="w-5 h-5" />}
          label={t("Qo'ng'iroq qilish")}
        />
        <LinkRow
          href={`https://t.me/${BRAND_CONFIG.telegramChannel.replace("@", "")}`}
          icon={<Send className="w-5 h-5" />}
          label={t("Telegram kanal")}
        />
        <LinkRow
          href={`https://instagram.com/${BRAND_CONFIG.instagram.replace("@", "")}`}
          icon={<InstagramIcon className="w-5 h-5" />}
          label="Instagram"
        />
      </div>

      <div className="px-4 pt-3 pb-safe">
        <button onClick={handleSave} className="btn-primary w-full">
          {t("Saqlash")}
        </button>
      </div>
    </div>
  );
};
