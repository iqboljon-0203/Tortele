"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Heart, Star, Plus, Minus, Check, Sparkles, ShieldCheck } from "lucide-react";
import { Product, WeightOption } from "@/config/brand";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/utils/telegram";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const favorite = isFavorite(product.id);

  const weightOptions: WeightOption[] = product.weightOptions || [
    {
      label: `Standart (${product.baseWeight})`,
      weightGrams: parseInt(product.baseWeight) || 400,
      multiplier: 1.0,
      calories: product.calories,
      servings: "1-2 kishilik",
    },
  ];

  const fillings: string[] = product.fillings || [
    "Klassik Tortel'e retsepti",
  ];

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(weightOptions[0]);
  const [selectedFilling, setSelectedFilling] = useState<string>(fillings[0]);
  const [customText, setCustomText] = useState<string>("");
  const [candlesCount, setCandlesCount] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product.weightOptions && product.weightOptions.length > 0) {
      setSelectedWeight(product.weightOptions[0]);
    }
    if (product.fillings && product.fillings.length > 0) {
      setSelectedFilling(product.fillings[0]);
    }
    setCustomText("");
    setCandlesCount(1);
    setQuantity(1);
  }, [product]);

  const unitPrice = Math.round(product.basePrice * selectedWeight.multiplier);
  const currentCalories = Math.round(selectedWeight.calories);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      product,
      selectedWeight,
      selectedFilling,
      customText: customText.trim(),
      candlesCount,
      quantity,
      unitPrice,
    });
    onClose();
  };

  const quickWishes = [
    "Happy Birthday! 🎉",
    "Tug'ilgan kuning bilan! 🎂",
    "Seni sevamiz! ❤️",
    "Celebrate Sweet Moments 🌸",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-t-[36px] max-h-[94vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 text-[#2A0A13] backdrop-blur-md shadow-md flex items-center justify-center active:scale-90 transition-transform"
            aria-label="Yopish"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => toggleFavorite(product.id)}
            className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md active:scale-90 transition-transform ${
              favorite ? "bg-rose-50 text-rose-500" : "bg-white/90 text-[#84626E]"
            }`}
            aria-label="Sevimlilar"
          >
            <Heart className={`w-5 h-5 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto no-scrollbar pb-32">
          {/* Top Showcase Image (Screen 3 & 4 Cake on Pedestal) */}
          <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#420F1D] to-[#631A30]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
          </div>

          {/* Curved Specification Card */}
          <div className="p-5 space-y-5 -mt-6 relative bg-white rounded-t-[32px]">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black text-[#631A30] uppercase tracking-wider bg-[#FDF0F4] px-2.5 py-0.5 rounded-full">
                  {product.category === "bento"
                    ? "Bento 2-3 soatda"
                    : product.category === "art"
                    ? "Eksklyuziv Art-desert"
                    : "Tortel'e Shaxsiy Pishiriq"}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[#84626E] font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              <h2
                className="text-2xl font-normal text-[#2A0A13] tracking-tight leading-snug"
                style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
              >
                {product.name}
              </h2>

              <p className="text-xs text-[#84626E] leading-relaxed mt-1.5">
                {product.description}
              </p>
            </div>

            {/* Nutrition & Portion Specs */}
            <div className="grid grid-cols-5 gap-1.5 bg-[#FAF6F5] p-2.5 rounded-2xl border border-[#F0DDE4]">
              <div className="text-center">
                <span className="text-xs font-black text-[#2A0A13] block">
                  {selectedWeight.weightGrams}g
                </span>
                <span className="text-[9px] font-semibold text-[#84626E] uppercase block">
                  Vazn
                </span>
              </div>
              <div className="text-center border-l border-[#F0DDE4]">
                <span className="text-xs font-black text-[#2A0A13] block">
                  {currentCalories}
                </span>
                <span className="text-[9px] font-semibold text-[#84626E] uppercase block">
                  Kkal
                </span>
              </div>
              <div className="text-center border-l border-[#F0DDE4]">
                <span className="text-xs font-black text-[#2A0A13] block">
                  {product.proteins}g
                </span>
                <span className="text-[9px] font-semibold text-[#84626E] uppercase block">
                  Oqsil
                </span>
              </div>
              <div className="text-center border-l border-[#F0DDE4]">
                <span className="text-xs font-black text-[#2A0A13] block">
                  {product.fats}g
                </span>
                <span className="text-[9px] font-semibold text-[#84626E] uppercase block">
                  Yog&apos;
                </span>
              </div>
              <div className="text-center border-l border-[#F0DDE4]">
                <span className="text-xs font-black text-[#2A0A13] block">
                  {product.carbs}g
                </span>
                <span className="text-[9px] font-semibold text-[#84626E] uppercase block">
                  Uglevod
                </span>
              </div>
            </div>

            {/* 1. ⚖️ Tort vazni va porsiyasini tanlash */}
            {product.weightOptions && product.weightOptions.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#2A0A13] flex items-center gap-1.5">
                    <span>⚖️</span>
                    <span>Porsiya va vaznni tanlang:</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#631A30]">
                    {selectedWeight.servings}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {product.weightOptions.map((opt) => {
                    const isSelected = selectedWeight.label === opt.label;
                    const optPrice = Math.round(product.basePrice * opt.multiplier);
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedWeight(opt)}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? "bg-[#FAF0F4] border-[#631A30] ring-1 ring-[#631A30]"
                            : "bg-white border-[#F0DDE4] hover:bg-[#FAF6F5]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? "border-[#631A30] bg-[#631A30] text-white"
                                : "border-[#D4C3C9] bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#2A0A13] block">
                              {opt.label}
                            </span>
                            <span className="text-[10px] text-[#84626E]">
                              {opt.calories} kkal • {opt.servings}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-[#2A0A13]">
                            {formatPrice(optPrice)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. 🍓 Ichki nachinka (tarkib) tanlagichi */}
            {product.fillings && product.fillings.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-black text-[#2A0A13] flex items-center gap-1.5">
                  <span>🍓</span>
                  <span>Ichki nachinka (tarkib)ni tanlang:</span>
                </label>

                <div className="grid grid-cols-1 gap-1.5">
                  {product.fillings.map((filling) => {
                    const isSelected = selectedFilling === filling;
                    return (
                      <button
                        key={filling}
                        type="button"
                        onClick={() => setSelectedFilling(filling)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-[#FAF0F4] border-[#631A30] text-[#631A30] font-bold"
                            : "bg-white border-[#F0DDE4] text-[#2A0A13] hover:bg-[#FAF6F5]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {filling.toLowerCase().includes("qulupnay")
                              ? "🍓"
                              : filling.toLowerCase().includes("shokolad")
                              ? "🍫"
                              : filling.toLowerCase().includes("pista")
                              ? "🌿"
                              : filling.toLowerCase().includes("asal")
                              ? "🍯"
                              : "✨"}
                          </span>
                          <span>{filling}</span>
                        </div>

                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#631A30] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. ✍️ "Tort ustiga nima deb yozaylik?" maydoni */}
            {product.allowsCustomText && (
              <div className="space-y-2.5 bg-[#FAF6F5] p-3.5 rounded-2xl border border-[#F0DDE4]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#2A0A13] flex items-center gap-1.5">
                    <span>✍️</span>
                    <span>Tort ustiga tabrik yozuvi:</span>
                  </label>
                  <span className="text-[10px] text-[#84626E] font-medium">
                    (Bepul)
                  </span>
                </div>

                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Masalan: Happy Birthday Malika 20! 🎉"
                  maxLength={50}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#F0DDE4] text-xs font-medium text-[#2A0A13] placeholder:text-[#A8989F] focus:outline-none focus:border-[#631A30]"
                />

                {/* Quick suggestions */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                  {quickWishes.map((wish) => (
                    <button
                      key={wish}
                      type="button"
                      onClick={() => setCustomText(wish)}
                      className="flex-shrink-0 text-[10px] font-semibold bg-white border border-[#F0DDE4] text-[#84626E] hover:text-[#631A30] hover:border-[#631A30] px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {wish}
                    </button>
                  ))}
                </div>

                {/* 🕯 Shamchalar soni tanlagichi */}
                {product.allowsCandles && (
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#F0DDE4] mt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">🕯</span>
                      <div>
                        <span className="text-xs font-bold text-[#2A0A13] block">
                          Shamchalar soni
                        </span>
                        <span className="text-[10px] text-[#84626E]">
                          Maxsus bayramona shamcha (bepul)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-[#F0DDE4]">
                      <button
                        type="button"
                        onClick={() => setCandlesCount((c) => Math.max(0, c - 1))}
                        className="w-6 h-6 rounded-lg bg-[#FAF6F5] text-[#2A0A13] flex items-center justify-center active:scale-90 font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-black w-5 text-center text-[#2A0A13]">
                        {candlesCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCandlesCount((c) => Math.min(10, c + 1))}
                        className="w-6 h-6 rounded-lg bg-[#FAF6F5] text-[#2A0A13] flex items-center justify-center active:scale-90 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Action Bar with Gold Button (Screen 3 style) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0DDE4] p-4 flex items-center gap-3 z-30 shadow-lg">
          {/* Quantity selector */}
          <div className="flex items-center gap-2 bg-[#FAF6F5] px-2.5 py-2 rounded-2xl border border-[#F0DDE4]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl bg-white text-[#2A0A13] flex items-center justify-center font-bold shadow-2xs active:scale-90 transition-transform"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="w-6 text-center text-sm font-black text-[#2A0A13]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-xl bg-white text-[#2A0A13] flex items-center justify-center font-bold shadow-2xs active:scale-90 transition-transform"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Golden Button: Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#F5A623] hover:bg-[#E09418] text-[#2A0A13] py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-between shadow-[0_4px_20px_rgba(245,166,35,0.4)] active:scale-[0.98] transition-all"
          >
            <span>Add to Cart</span>
            <span className="bg-[#2A0A13] text-white px-2 py-0.5 rounded-lg text-xs font-black">
              {formatPrice(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
