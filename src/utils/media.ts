const MAX_SIDE = 1000;

/** Shrinks a chosen photo so it fits in storage and in the order request. */
export const resizeImage = async (file: File): Promise<string> => {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.78);
};

/** Flies a small product thumbnail from an element to the cart icon. */
export const flyToCart = (from: Element | null, imageUrl: string) => {
  const target = document.querySelector("[data-cart-target]");
  if (!from || !target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const start = from.getBoundingClientRect();
  const end = target.getBoundingClientRect();
  const size = 44;
  const dot = document.createElement("div");
  Object.assign(dot.style, {
    position: "fixed",
    left: `${start.left + start.width / 2 - size / 2}px`,
    top: `${start.top + start.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "70",
    pointerEvents: "none",
  });
  document.body.appendChild(dot);

  const dx = end.left + end.width / 2 - (start.left + start.width / 2);
  const dy = end.top + end.height / 2 - (start.top + start.height / 2);
  dot
    .animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${dx * 0.55}px, ${dy * 0.35 - 40}px) scale(0.85)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.2)`, opacity: 0.4 },
      ],
      { duration: 520, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
    )
    .finished.finally(() => dot.remove());
};
