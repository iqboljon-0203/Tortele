"use client";

import React, { useRef, useState } from "react";
import { Check, ChevronLeft, Heart, ImagePlus, Trash2 } from "lucide-react";
import { Product, WeightOption } from "@/config/brand";
import { useApp } from "@/context/AppContext";
import { defaultCandles, getFillings, getWeightOptions } from "@/utils/product";
import { flyToCart, resizeImage } from "@/utils/media";
import { useOverlay } from "@/utils/useOverlay";
import { SmartImage } from "./SmartImage";
import { Stepper } from "./ui";

const QUICK_WISHES = ["Tug'ilgan kuning bilan!", "Happy Birthday!", "Seni sevamiz!"];

const Section: React.FC<{ title: string; hint?: string; children: React.ReactNode }> = ({ title, hint, children }) => (
  <section>
    <div className="flex items-baseline justify-between mb-2">
      <h3 className="text-sm font-bold text-ink">{title}</h3>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
    {children}
  </section>
);

const Option: React.FC<{
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  price?: string;
}> = ({ selected, onClick, title, subtitle, price }) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    onClick={onClick}
    className={`w-full min-h-[52px] flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-left border-[1.5px] transition-colors ${
      selected ? "border-rose bg-rose-soft" : "border-line bg-surface"
    }`}
  >
    <span
      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-[1.5px] ${
        selected ? "bg-rose border-rose text-white" : "border-muted/40"
      }`}
    >
      {selected && <Check className="w-3 h-3 stroke-[3.5]" />}
    </span>
    <span className="flex-1 min-w-0">
      <span className="block text-[13px] font-semibold text-ink">{title}</span>
      {subtitle && <span className="block text-xs text-muted">{subtitle}</span>}
    </span>
    {price && <span className="text-[13px] font-bold text-ink tabular-nums flex-shrink-0">{price}</span>}
  </button>
);

export const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const { addToCart, toggleFavorite, isFavorite, price, productText, t } = useApp();
  useOverlay(onClose);

  const weightOptions = getWeightOptions(product);
  const fillings = getFillings(product);
  const { name, description } = productText(product);

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(weightOptions[0]);
  const [selectedFilling, setSelectedFilling] = useState(fillings[0]);
  const [customText, setCustomText] = useState("");
  const [candlesCount, setCandlesCount] = useState(defaultCandles(product));
  const [quantity, setQuantity] = useState(1);
  const [referenceImage, setReferenceImage] = useState<string>();
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const favorite = isFavorite(product.id);
  const unitPrice = Math.round(product.basePrice * selectedWeight.multiplier);

  const handleFile = async (file?: File) => {
    if (!file) return;
    try {
      setImageError(false);
      setReferenceImage(await resizeImage(file));
    } catch {
      setImageError(true);
    }
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    flyToCart(event.currentTarget, product.image);
    addToCart({
      product,
      selectedWeight,
      selectedFilling,
      customText: customText.trim(),
      candlesCount,
      quantity,
      unitPrice,
      referenceImage,
    });
    onClose();
  };

  const nutrition = [
    { value: `${selectedWeight.weightGrams}`, label: "gramm" },
    { value: `${Math.round(selectedWeight.calories)}`, label: "kkal" },
    { value: `${product.proteins}`, label: "oqsil" },
    { value: `${product.fats}`, label: "yog'" },
    { value: `${product.carbs}`, label: "uglevod" },
  ];

  return (
    <div className="fixed inset-0 z-50 max-w-md mx-auto bg-surface flex flex-col animate-slide-up">
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        <button
          onClick={onClose}
          aria-label={t("Orqaga")}
          className="pointer-events-auto w-11 h-11 rounded-full bg-surface/95 shadow-card text-ink flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={favorite ? t("Sevimlilardan olib tashlash") : t("Sevimlilarga qo'shish")}
          aria-pressed={favorite}
          className="pointer-events-auto w-11 h-11 rounded-full bg-surface/95 shadow-card flex items-center justify-center active:scale-90 transition-transform"
        >
          <Heart className={`w-5 h-5 ${favorite ? "fill-rose text-rose" : "text-ink"}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="relative w-full aspect-square bg-line">
          <SmartImage src={product.image} alt={name} fill priority sizes="(max-width: 448px) 100vw, 448px" className="object-cover" />
          {customText.trim() && (
            <span
              aria-hidden="true"
              className="absolute inset-x-8 top-[42%] text-center font-serif italic text-[26px] leading-tight text-white break-words"
              style={{ textShadow: "0 1px 3px rgb(0 0 0 / .75), 0 0 16px rgb(0 0 0 / .45)" }}
            >
              {customText}
            </span>
          )}
        </div>

        <div className="relative -mt-7 bg-surface rounded-t-[28px] px-4 pt-5 pb-6 space-y-5">
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-ink leading-tight">{name}</h2>
            <p className="text-[13px] text-muted leading-relaxed mt-2">{description}</p>
          </div>

          <dl className="grid grid-cols-5 text-center">
            {nutrition.map((item) => (
              <div key={item.label}>
                <dd className="text-[15px] font-bold text-ink tabular-nums">{item.value}</dd>
                <dt className="text-[11px] text-muted">{t(item.label)}</dt>
              </div>
            ))}
          </dl>

          {weightOptions.length > 1 && (
            <Section title={t("Hajmi")}>
              <div className="space-y-2" role="radiogroup" aria-label={t("Hajmi")}>
                {weightOptions.map((option) => (
                  <Option
                    key={option.label}
                    selected={selectedWeight.label === option.label}
                    onClick={() => setSelectedWeight(option)}
                    title={t(option.label)}
                    subtitle={t(option.servings)}
                    price={price(Math.round(product.basePrice * option.multiplier))}
                  />
                ))}
              </div>
            </Section>
          )}

          {product.fillings && product.fillings.length > 0 && (
            <Section title={t("Nachinka")}>
              <div className="space-y-2" role="radiogroup" aria-label={t("Nachinka")}>
                {product.fillings.map((filling) => (
                  <Option
                    key={filling}
                    selected={selectedFilling === filling}
                    onClick={() => setSelectedFilling(filling)}
                    title={t(filling)}
                  />
                ))}
              </div>
            </Section>
          )}

          {product.allowsCustomText && (
            <>
              <Section title={t("Tort ustiga yozuv")} hint={t("Bepul")}>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={t("Masalan: Malika 20 yoshda!")}
                  maxLength={50}
                  aria-label={t("Tort ustiga yozuv")}
                  className="w-full h-12 px-3.5 rounded-[14px] border-[1.5px] border-line bg-surface text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-rose"
                />
                <div className="flex gap-2 overflow-x-auto no-scrollbar mt-2 -mx-4 px-4">
                  {QUICK_WISHES.map((wish) => (
                    <button
                      key={wish}
                      type="button"
                      onClick={() => setCustomText(t(wish))}
                      className="flex-shrink-0 h-9 px-3 rounded-[10px] bg-page text-xs font-semibold text-ink"
                    >
                      {t(wish)}
                    </button>
                  ))}
                </div>
              </Section>

              <Section title={t("Dizayn namunasi")} hint={t("Ixtiyoriy")}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  aria-label={t("Rasm yuklash")}
                  onChange={(e) => {
                    handleFile(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
                {referenceImage ? (
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local data URL, nothing for next/image to optimise */}
                    <img src={referenceImage} alt={t("Dizayn namunasi")} className="w-20 h-20 rounded-[14px] object-cover" />
                    <button
                      type="button"
                      onClick={() => setReferenceImage(undefined)}
                      className="h-11 px-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t("Rasmni o'chirish")}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-12 rounded-[14px] border-[1.5px] border-dashed border-line text-[13px] font-semibold text-ink flex items-center justify-center gap-2"
                  >
                    <ImagePlus className="w-[18px] h-[18px] text-rose" />
                    {t("Rasm yuklash")}
                  </button>
                )}
                {imageError && <p className="text-xs text-rose mt-1.5">{t("Rasmni o'qib bo'lmadi")}</p>}
              </Section>
            </>
          )}

          {product.allowsCandles && (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink">{t("Shamchalar")}</h3>
                <p className="text-xs text-muted">{t("Bepul")}</p>
              </div>
              <Stepper
                label={t("Shamchalar")}
                value={candlesCount}
                onDecrement={() => setCandlesCount((c) => Math.max(0, c - 1))}
                onIncrement={() => setCandlesCount((c) => Math.min(10, c + 1))}
                decrementDisabled={candlesCount === 0}
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pt-3 pb-safe bg-surface shadow-float flex items-center gap-3">
        <Stepper
          label={t("Soni")}
          value={quantity}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrement={() => setQuantity((q) => q + 1)}
          decrementDisabled={quantity === 1}
        />
        <button onClick={handleAddToCart} className="btn-primary flex-1 !px-3 tabular-nums whitespace-nowrap">
          {t("Savatga · {price}", { price: price(unitPrice * quantity) })}
        </button>
      </div>
    </div>
  );
};
