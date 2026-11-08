"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Heart, Star, Plus, Minus, Check, Flame, Sparkles } from "lucide-react";
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

  // Available weight options or default fallback
  const weightOptions: WeightOption[] = product.weightOptions || [
    {
      label: `Standart (${product.baseWeight})`,
      weightGrams: parseInt(product.baseWeight) || 400,
      multiplier: 1.0,
      calories: product.calories,
      servings: "1-2 kishilik",
    },
  ];

  // Available fillings or default fallback
  const fillings: string[] = product.fillings || [
    "Klassik Tortel'e retsepti",
  ];

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(weightOptions[0]);
  const [selectedFilling, setSelectedFilling] = useState<string>(fillings[0]);
  const [customText, setCustomText] = useState<string>("");
  const [candlesCount, setCandlesCount] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  // Reset state when product changes
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

  // Calculate dynamic unit price and calories based on selected weight
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
    "Eng yaxshi onajonimga 🌸",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-t-[36px] max-h-[92vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 text-[#301D24] backdrop-blur-md shadow-md flex items-center justify-center active:scale-90 transition-transform"
            aria-label="Yopish"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => toggleFavorite(product.id)}
            className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md active:scale-90 transition-transform ${
              favorite ? "bg-rose-50 text-rose-500" : "bg-white/90 text-[#846B74]"
            }`}
            aria-label="Sevimlilar"
          >
            <Heart className={`w-5 h-5 ${favorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto no-scrollbar pb-28">
          {/* Large Hero Image */}
          <div className="relative w-full aspect-[4/3] bg-[#FAF6F4]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
          </div>

          <div className="p-5 space-y-5 -mt-6 relative bg-white rounded-t-[32px]">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold text-[#D47A96] uppercase tracking-wider bg-[#FDF0F4] px-2.5 py-0.5 rounded-full">
                  {product.category === "bento"
                    ? "Bento 2-3 soatda"
                    : product.category === "art"
                    ? "Eksklyuziv Art-desert"
                    : "Tortel'e Shaxsiy Pishiriq"}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[#846B74] font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              <h2 className="text-xl font-black text-[#2B1A21] tracking-tight leading-snug">
                {product.name}
              </h2>

              <p className="text-xs text-[#846B74] leading-relaxed mt-1.5">
                {product.description}
              </p>
            </div>

            {/* Nutrition Specs Pills (Smorodina Style) */}
            <div className="grid grid-cols-5 gap-1.5 bg-[#FAF6F4] p-2.5 rounded-2xl border border-[#F0E1E6]">
              <div className="text-center">
                <span className="text-xs font-black text-[#2B1A21] block">
                  {selectedWeight.weightGrams}g
                </span>
                <span className="text-[9px] font-medium text-[#846B74] uppercase block">
                  Vazn
                </span>
              </div>
              <div className="text-center border-l border-[#F0E1E6]">
                <span className="text-xs font-black text-[#2B1A21] block">
                  {currentCalories}
                </span>
                <span className="text-[9px] font-medium text-[#846B74] uppercase block">
                  Kkal
                </span>
              </div>
              <div className="text-center border-l border-[#F0E1E6]">
                <span className="text-xs font-black text-[#2B1A21] block">
                  {product.proteins}g
                </span>
                <span className="text-[9px] font-medium text-[#846B74] uppercase block">
                  Oqsil
                </span>
              </div>
              <div className="text-center border-l border-[#F0E1E6]">
                <span className="text-xs font-black text-[#2B1A21] block">
                  {product.fats}g
                </span>
                <span className="text-[9px] font-medium text-[#846B74] uppercase block">
                  Yog&apos;
                </span>
              </div>
              <div className="text-center border-l border-[#F0E1E6]">
                <span className="text-xs font-black text-[#2B1A21] block">
                  {product.carbs}g
                </span>
                <span className="text-[9px] font-medium text-[#846B74] uppercase block">
                  Uglevod
                </span>
              </div>
            </div>

            {/* 1. ⚖️ Tort vazni va porsiyasini tanlash */}
            {product.weightOptions && product.weightOptions.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#2B1A21] flex items-center gap-1.5">
                    <span>⚖️</span>
                    <span>Tort vazni va porsiyasini tanlang:</span>
                  </label>
                  <span className="text-[11px] font-semibold text-[#D47A96]">
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
                            ? "bg-[#FDF0F4] border-[#D47A96] ring-1 ring-[#D47A96]"
                            : "bg-white border-[#F0E1E6] hover:bg-[#FAF6F4]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? "border-[#D47A96] bg-[#D47A96] text-white"
                                : "border-[#D4C3C9] bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#2B1A21] block">
                              {opt.label}
                            </span>
                            <span className="text-[10px] text-[#846B74]">
                              {opt.calories} kkal • {opt.servings}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-extrabold text-[#2B1A21]">
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
                <label className="text-xs font-extrabold text-[#2B1A21] flex items-center gap-1.5">
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
                            ? "bg-[#FDF0F4] border-[#D47A96] text-[#B85474]"
                            : "bg-white border-[#F0E1E6] text-[#301D24] hover:bg-[#FAF6F4]"
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
                          <div className="w-4 h-4 rounded-full bg-[#D47A96] text-white flex items-center justify-center">
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
              <div className="space-y-2.5 bg-[#FDF9FB] p-3.5 rounded-2xl border border-[#F0E1E6]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#2B1A21] flex items-center gap-1.5">
                    <span>✍️</span>
                    <span>Tort ustiga nima deb yozaylik?</span>
                  </label>
                  <span className="text-[10px] text-[#846B74] font-medium">
                    (Bepul xizmat)
                  </span>
                </div>

                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Masalan: Happy Birthday Malika 20! 🎉"
                  maxLength={50}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#F0E1E6] text-xs font-medium text-[#2B1A21] placeholder:text-[#A8989F] focus:outline-none focus:border-[#D47A96] focus:ring-1 focus:ring-[#D47A96]"
                />

                {/* Quick suggestions */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                  {quickWishes.map((wish) => (
                    <button
                      key={wish}
                      type="button"
                      onClick={() => setCustomText(wish)}
                      className="flex-shrink-0 text-[10px] font-semibold bg-white border border-[#F0E1E6] text-[#846B74] hover:text-[#D47A96] hover:border-[#D47A96] px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {wish}
                    </button>
                  ))}
                </div>

                {/* 🕯 Shamchalar soni tanlagichi */}
                {product.allowsCandles && (
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#F0E1E6] mt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">🕯</span>
                      <div>
                        <span className="text-xs font-bold text-[#2B1A21] block">
                          Shamchalar soni
                        </span>
                        <span className="text-[10px] text-[#846B74]">
                          Maxsus bayramona shamcha (bepul)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-[#F0E1E6]">
                      <button
                        type="button"
                        onClick={() => setCandlesCount((c) => Math.max(0, c - 1))}
                        className="w-6 h-6 rounded-lg bg-[#FAF6F4] text-[#301D24] flex items-center justify-center active:scale-90 font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-black w-5 text-center text-[#2B1A21]">
                        {candlesCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCandlesCount((c) => Math.min(10, c + 1))}
                        className="w-6 h-6 rounded-lg bg-[#FAF6F4] text-[#301D24] flex items-center justify-center active:scale-90 font-bold"
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

        {/* Sticky Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F0E1E6] p-4 flex items-center gap-3 z-30 shadow-lg">
          {/* Quantity selector */}
          <div className="flex items-center gap-2 bg-[#FAF6F4] px-2.5 py-2 rounded-2xl border border-[#F0E1E6]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl bg-white text-[#301D24] flex items-center justify-center font-bold shadow-2xs active:scale-90 transition-transform"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="w-6 text-center text-sm font-black text-[#2B1A21]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-xl bg-white text-[#301D24] flex items-center justify-center font-bold shadow-2xs active:scale-90 transition-transform"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#D47A96] hover:bg-[#B85474] text-white py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-between shadow-md active:scale-[0.98] transition-all"
          >
            <span>Savatga qo&apos;shish</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-black">
              {formatPrice(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

