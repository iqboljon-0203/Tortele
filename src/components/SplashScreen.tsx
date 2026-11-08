"use client";

import React, { useEffect, useState } from "react";
import { TorteleLogo } from "./TorteleLogo";

const VISIBLE_MS = 1300;
const FADE_MS = 300;

export const SplashScreen: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), VISIBLE_MS);
    const doneTimer = setTimeout(onEnter, VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onEnter]);

  return (
    <div
      onClick={onEnter}
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-rose transition-opacity duration-300 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <TorteleLogo theme="white" size={150} className="animate-fade-in" />
    </div>
  );
};
