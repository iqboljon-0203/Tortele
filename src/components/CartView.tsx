"use client";

import React, { useState } from "react";
import { ChevronRight, MapPin, ShoppingBasket, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND_CONFIG } from "@/config/brand";
import { getLeadHours, resolveSlot } from "@/utils/schedule";
import { SmartImage } from "./SmartImage";
import { SlotPicker } from "./SlotPicker";
import { EmptyState, ScreenTitle, Stepper, TextField, Toggle } from "./ui";

const Row: React.FC<{ label: string; value: string; accent?: boolean }> = ({ label, value, accent }) => (
  <div className="flex justify-between text-[13px]">
    <span className="text-muted">{label}</span>
    <span className={`font-semibold tabular-nums ${accent ? "text-rose" : "text-ink"}`}>{value}</span>
  </div>
);

export const CartView: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cutleryCount,
    setCutleryCount,
    useBonus,
    setUseBonus,
    bonusBalance,
    bonusDeduction,
    itemsSubtotal,
    deliveryFee,
    finalTotal,
    earnedCashback,
    orderType,
    deliveryAddress,
    deliverySlot,
    isGift,
    setIsGift,
    gift,
    updateGift,
    userPhone,
    setUserPhone,
    tier,
    submitOrder,
    setActiveTab,
    openAddressModal,
    price,
    productText,
    t,
  } = useApp();
  const [now] = useState(() => new Date());

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col pb-nav">
        <EmptyState
          icon={<ShoppingBasket className="w-20 h-20 stroke-[1.1]" />}
          title={t("Savatda hozircha hech narsa yo'q")}
          text={t("Bento-tort, art-desert yoki yangi pishiriq tanlang")}
          actionLabel={t("Menyuga o'tish")}
          onAction={() => setActiveTab("menu")}
        />
      </div>
    );
  }

  const remainingForFree = BRAND_CONFIG.freeDeliveryThreshold - itemsSubtotal;
  const leadHours = getLeadHours(cart);
  const slot = resolveSlot(deliverySlot, leadHours, now);
  const giftIncomplete = isGift && (!gift.recipientName.trim() || !gift.recipientPhone.trim());
  const phoneMissing = !userPhone.trim();
  const blockReason = phoneMissing
    ? t("Buyurtma uchun telefon raqami kerak")
    : giftIncomplete
    ? t("Oluvchining ismi va telefonini kiriting")
    : null;

  return (
    <div className="flex-1" style={{ paddingBottom: "calc(var(--nav-height) + 112px)" }}>
      <ScreenTitle
        title={t("Savat")}
        action={
          <button onClick={clearCart} className="h-11 px-1 text-[13px] font-semibold text-muted">
            {t("Tozalash")}
          </button>
        }
      />

      <div className="px-4 space-y-3">
        <button onClick={openAddressModal} className="card w-full min-h-14 px-3.5 py-2.5 flex items-center gap-2.5 text-left">
          <MapPin className="w-5 h-5 text-rose flex-shrink-0" />
          <span className="flex-1 min-w-0">
            <span className="block text-xs text-muted">{orderType === "delivery" ? t("Yetkazish manzili") : t("Olib ketish")}</span>
            <span className="block text-[13px] font-semibold text-ink truncate">
              {orderType === "delivery" ? deliveryAddress : t(BRAND_CONFIG.branches[0].name)}
            </span>
          </span>
          <ChevronRight className="w-5 h-5 text-muted flex-shrink-0" />
        </button>

        {cart.map((item) => {
          const { name } = productText(item.product);
          return (
            <article key={item.id} className="card p-3 flex gap-3">
              <div className="relative w-[84px] h-[84px] rounded-[14px] overflow-hidden bg-line flex-shrink-0">
                <SmartImage src={item.product.image} alt="" fill sizes="84px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start gap-1">
                  <h3 className="flex-1 text-[13px] font-semibold text-ink leading-[18px] line-clamp-2">{name}</h3>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`${t("O'chirish")}: ${name}`}
                    className="w-9 h-9 -mt-2 -mr-2 flex items-center justify-center text-muted flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-muted truncate">
                  {[t(item.selectedWeight.label), item.product.fillings ? t(item.selectedFilling) : null]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {item.customText && <p className="text-xs text-ink truncate">&quot;{item.customText}&quot;</p>}
                {item.referenceImage && <p className="text-xs text-rose">{t("Namuna rasm biriktirilgan")}</p>}
                <div className="flex items-center justify-between mt-auto pt-1.5">
                  <span className="text-sm font-extrabold text-ink tabular-nums">{price(item.unitPrice * item.quantity)}</span>
                  <Stepper
                    label={t("Soni")}
                    value={item.quantity}
                    onDecrement={() => updateQuantity(item.id, -1)}
                    onIncrement={() => updateQuantity(item.id, 1)}
                  />
                </div>
              </div>
            </article>
          );
        })}

        {slot && <SlotPicker slot={slot} leadHours={leadHours} now={now} />}

        <section className="card p-3.5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="block text-[13px] font-semibold text-ink">{t("Sovg'a sifatida")}</span>
              <span className="block text-xs text-muted">{t("Boshqa odamga yuborish")}</span>
            </div>
            <Toggle checked={isGift} onChange={() => setIsGift(!isGift)} label={t("Sovg'a sifatida")} />
          </div>
          {isGift && (
            <div className="space-y-2 animate-fade-in">
              <TextField label={t("Oluvchining ismi")} value={gift.recipientName} onChange={(recipientName) => updateGift({ recipientName })} />
              <TextField label={t("Oluvchining telefoni")} type="tel" value={gift.recipientPhone} onChange={(recipientPhone) => updateGift({ recipientPhone })} />
              <TextField label={t("Tabrik kartasi matni")} value={gift.cardText} maxLength={200} onChange={(cardText) => updateGift({ cardText })} />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[13px] font-semibold text-ink">{t("Narxni ko'rsatmaslik")}</span>
                <Toggle checked={gift.hidePrice} onChange={() => updateGift({ hidePrice: !gift.hidePrice })} label={t("Narxni ko'rsatmaslik")} />
              </div>
            </div>
          )}
        </section>

        <div className="card p-3.5 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ink">{t("Qoshiq va salfetka")}</span>
          <Stepper
            label={t("Qoshiq va salfetka")}
            value={cutleryCount}
            onDecrement={() => setCutleryCount((c) => Math.max(0, c - 1))}
            onIncrement={() => setCutleryCount((c) => Math.min(20, c + 1))}
            decrementDisabled={cutleryCount === 0}
          />
        </div>

        {bonusBalance > 0 && (
          <div className="card p-3.5 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[13px] font-semibold text-ink">{t("Bonusdan to'lash")}</span>
              <span className="block text-xs text-muted">
                {t("{price} chegiriladi", { price: price(Math.min(bonusBalance, itemsSubtotal)) })}
              </span>
            </div>
            <Toggle checked={useBonus} onChange={() => setUseBonus(!useBonus)} label={t("Bonusdan to'lash")} />
          </div>
        )}

        <div className="card p-3.5">
          <TextField label={t("Telefon raqamingiz")} type="tel" value={userPhone} onChange={setUserPhone} />
        </div>

        <div className="card p-4 space-y-2">
          <Row label={t("Mahsulotlar")} value={price(itemsSubtotal)} />
          <Row label={t("Yetkazib berish")} value={deliveryFee === 0 ? t("Bepul") : price(deliveryFee)} />
          {useBonus && bonusDeduction > 0 && <Row label={t("Bonuslar")} value={`-${price(bonusDeduction)}`} accent />}
          <Row label={`${t("Keshbek")} ${tier.cashbackPercent}%`} value={`+${price(earnedCashback)}`} accent />
          {orderType === "delivery" && deliveryFee > 0 && remainingForFree > 0 && (
            <p className="text-xs text-muted pt-1">
              {t("Yana {price} qo'shsangiz, yetkazish bepul bo'ladi", { price: price(remainingForFree) })}
            </p>
          )}
        </div>
      </div>

      <div
        className="fixed inset-x-0 max-w-md mx-auto px-4 py-3 bg-page/95 backdrop-blur z-30"
        style={{ bottom: "var(--nav-height)" }}
      >
        {blockReason && <p className="text-xs text-rose text-center mb-1.5">{blockReason}</p>}
        <button
          onClick={() => slot && submitOrder(slot)}
          disabled={Boolean(blockReason) || !slot}
          className="btn-primary w-full tabular-nums disabled:opacity-50"
        >
          {t("Buyurtma berish · {price}", { price: price(finalTotal) })}
        </button>
      </div>
    </div>
  );
};
