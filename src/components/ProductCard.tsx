"use client";

import React from "react";
import { Heart, Plus } from "lucide-react";
import { Product } from "@/config/brand";
import { useApp } from "@/context/AppContext";
import { canQuickAdd, defaultCandles, getFillings, getWeightOptions } from "@/utils/product";
import { flyToCart } from "@/utils/media";
import { SmartImage } from "./SmartImage";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { openProductModal, toggleFavorite, isFavorite, addToCart, cart, price, productText, t } = useApp();
  const favorite = isFavorite(product.id);
  const inCart = cart.reduce((sum, item) => (item.product.id === product.id ? sum + item.quantity : sum), 0);
  const quickAdd = canQuickAdd(product);
  const hasOptions = Boolean(product.weightOptions);
  const { name } = productText(product);

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!quickAdd) {
      openProductModal(product);
      return;
    }
    flyToCart(event.currentTarget, product.image);
    addToCart({
      product,
      selectedWeight: getWeightOptions(product)[0],
      selectedFilling: getFillings(product)[0],
      customText: "",
      candlesCount: defaultCandles(product),
      quantity: 1,
      unitPrice: product.basePrice,
    });
  };

  return (
    <article className="card relative overflow-hidden flex flex-col">
      <button
        onClick={() => openProductModal(product)}
        aria-label={name}
        className="relative block w-full aspect-square bg-line"
      >
        <SmartImage src={product.image} alt="" fill sizes="(max-width: 448px) 50vw, 220px" className="object-cover" />
        {(product.isNew || product.isPopular) && (
          <span className="absolute left-2 top-2 h-6 px-2 rounded-lg bg-surface/95 text-ink text-[11px] font-bold flex items-center">
            {product.isNew ? t("Yangi") : t("Hit")}
          </span>
        )}
      </button>

      <button
        onClick={() => toggleFavorite(product.id)}
        aria-label={favorite ? t("Sevimlilardan olib tashlash") : t("Sevimlilarga qo'shish")}
        aria-pressed={favorite}
        className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center"
      >
        <span className="w-8 h-8 rounded-full bg-surface/95 flex items-center justify-center">
          <Heart className={`w-[17px] h-[17px] ${favorite ? "fill-rose text-rose" : "text-ink"}`} />
        </span>
      </button>

      <div className="p-3 flex flex-col flex-1">
        <button onClick={() => openProductModal(product)} className="text-left flex-1">
          <h3 className="text-[13px] font-semibold text-ink leading-[18px] line-clamp-2">{name}</h3>
          <p className="text-xs text-muted mt-0.5">{product.baseWeight}</p>
        </button>

        <div className="flex items-center justify-between mt-2 gap-1">
          <span className="text-sm font-extrabold text-ink tabular-nums">
            {hasOptions && <span className="text-xs font-medium text-muted">{t("dan")} </span>}
            {price(product.basePrice).replace(` ${t("so'm")}`, "")}
          </span>
          <button
            onClick={handleAdd}
            aria-label={quickAdd ? t("Savatga qo'shish") : t("Tanlash")}
            className="w-10 h-10 rounded-[12px] bg-rose text-white flex items-center justify-center text-sm font-bold active:scale-90 transition-transform flex-shrink-0"
          >
            {inCart > 0 ? inCart : <Plus className="w-[18px] h-[18px] stroke-[2.6]" />}
          </button>
        </div>
      </div>
    </article>
  );
};
