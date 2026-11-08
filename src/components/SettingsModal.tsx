"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, User, Phone, Send, Info, Check } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";

export const SettingsModal: React.FC = () => {
  const {
    isSettingsModalOpen,
    closeSettingsModal,
    userName,
    setUserName,
    userPhone,
    setUserPhone,
  } = useApp();

  const [nameInput, setNameInput] = useState(userName);
  const [phoneInput, setPhoneInput] = useState(userPhone);
  const [saved, setSaved] = useState(false);

  if (!isSettingsModalOpen) return null;

  const handleSave = () => {
    if (nameInput.trim()) setUserName(nameInput.trim());
    if (phoneInput.trim()) setUserPhone(phoneInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      closeSettingsModal();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-sm bg-white rounded-[32px] p-5 shadow-2xl relative border border-[#F0E1E6] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F0E1E6]">
          <h3 className="text-base font-black text-[#2B1A21]">
            Profil va Sozlamalar
          </h3>
          <button
            onClick={closeSettingsModal}
            className="w-8 h-8 rounded-full bg-[#FAF6F4] text-[#301D24] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Banner Card */}
        <div className="flex items-center gap-3 p-3 my-3 bg-[#FAF6F4] rounded-2xl border border-[#F0E1E6]">
          <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#F0E1E6] flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image
              src={BRAND_CONFIG.logoUrl}
              alt={BRAND_CONFIG.brandName}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#2B1A21]">
              {BRAND_CONFIG.brandName}
            </h4>
            <span className="text-[10px] text-[#846B74] block">
              {BRAND_CONFIG.tagline}
            </span>
            <span className="text-[10px] text-[#D47A96] font-bold">
              {BRAND_CONFIG.followersCount} Instagram obunachi
            </span>
          </div>
        </div>

        {/* User Info Inputs */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-[#2B1A21] block mb-1">
              Ismingiz:
            </label>
            <div className="relative">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ismingizni kiriting"
                className="w-full bg-[#FAF6F4] pl-9 pr-3.5 py-2.5 rounded-xl border border-[#F0E1E6] text-xs font-semibold text-[#2B1A21] focus:bg-white focus:outline-none focus:border-[#D47A96]"
              />
              <User className="w-4 h-4 text-[#D47A96] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#2B1A21] block mb-1">
              Telefon raqamingiz:
            </label>
            <div className="relative">
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full bg-[#FAF6F4] pl-9 pr-3.5 py-2.5 rounded-xl border border-[#F0E1E6] text-xs font-semibold text-[#2B1A21] focus:bg-white focus:outline-none focus:border-[#D47A96]"
              />
              <Phone className="w-4 h-4 text-[#D47A96] absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Official Channels */}
        <div className="mt-4 pt-3 border-t border-[#F0E1E6] space-y-1.5">
          <span className="text-[10px] font-bold text-[#846B74] uppercase block">
            Rasmiy sahifalar:
          </span>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://instagram.com/${BRAND_CONFIG.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF6F4] border border-[#F0E1E6] text-xs font-semibold text-[#2B1A21] hover:bg-rose-50"
            >
              <InstagramIcon className="w-4 h-4 text-rose-500" />
              <span>Instagram</span>
            </a>

            <a
              href={`https://t.me/${BRAND_CONFIG.telegramChannel.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF6F4] border border-[#F0E1E6] text-xs font-semibold text-[#2B1A21] hover:bg-sky-50"
            >
              <Send className="w-4 h-4 text-[#2AABEE]" />
              <span>Telegram</span>
            </a>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-[#D47A96] hover:bg-[#B85474] text-white py-3 rounded-2xl text-xs font-black active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Saqlandi!</span>
            </>
          ) : (
            <span>Saqlash</span>
          )}
        </button>
      </div>
    </div>
  );
};
