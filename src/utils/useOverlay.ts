import { useEffect, useRef } from "react";
import { getTelegramWebApp } from "./telegram";

/** Locks page scroll while an overlay is open and wires Telegram's native back button to close it. */
export const useOverlay = (onClose: () => void) => {
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const back = getTelegramWebApp()?.BackButton;
    const handleBack = () => closeRef.current();
    back?.onClick(handleBack);
    back?.show();

    return () => {
      document.body.style.overflow = previous;
      back?.offClick(handleBack);
      back?.hide();
    };
  }, []);
};
