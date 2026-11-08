"use client";

import React from "react";

interface TorteleLogoProps {
  variant?: "full" | "horizontal" | "mark";
  theme?: "light" | "dark" | "rose";
  className?: string;
  size?: number;
}

export const TorteleLogo: React.FC<TorteleLogoProps> = ({
  variant = "full",
  theme = "rose",
  className = "",
  size = 56,
}) => {
  const isDark = theme === "dark";
  const primaryColor = isDark ? "#FFFFFF" : theme === "rose" ? "#D47A96" : "#2B1A21";
  const secondaryColor = isDark ? "#F8D7E3" : theme === "rose" ? "#B85474" : "#846B74";
  const accentColor = isDark ? "#FFB8CE" : "#E59BB2";

  // Vector mark: Stylized cake with dripping icing and cherry
  const CakeMark = ({ s = size }: { s?: number }) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block transition-transform group-hover:scale-105"
    >
      {/* Top Cherry / Pearl */}
      <circle cx="50" cy="11" r="5.5" fill={primaryColor} />
      <path
        d="M52 6C53 3 56 1 58 1"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Main Cake Layer Body */}
      <path
        d="M16 26C16 22 20 20 25 20H75C80 20 84 22 84 26V58C84 62 80 64 75 64H25C20 64 16 62 16 58V26Z"
        fill={isDark ? "rgba(255,255,255,0.18)" : "#FDF0F4"}
        stroke={primaryColor}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Dripping Icing / Frosting */}
      <path
        d="M17 26C17 26 21 34 25 34C29 34 31 28 35 28C39 28 41 37 46 37C51 37 53 27 58 27C63 27 65 35 70 35C75 35 78 28 83 28V26C83 22 79 20 75 20H25C21 20 17 22 17 26Z"
        fill={accentColor}
      />
      <path
        d="M17 26C17 26 21 34 25 34C29 34 31 28 35 28C39 28 41 37 46 37C51 37 53 27 58 27C63 27 65 35 70 35C75 35 78 28 83 28"
        stroke={primaryColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cake Stand / Plate Base */}
      <path
        d="M10 68C10 66 12 65 15 65H85C88 65 90 66 90 68C90 70 88 71 85 71H15C12 71 10 70 10 68Z"
        fill={primaryColor}
      />
      <path
        d="M40 71L37 77C37 78 38 79 40 79H60C62 79 63 78 63 77L60 71"
        fill={primaryColor}
      />
    </svg>
  );

  if (variant === "mark") {
    return <CakeMark />;
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <CakeMark s={Math.round(size * 0.75)} />
        <div className="flex flex-col text-left">
          <span
            className="text-base font-black tracking-[0.18em] leading-none uppercase"
            style={{ color: primaryColor, fontFamily: "serif, system-ui" }}
          >
            TORTEL&apos;E
          </span>
          <span
            className="text-[8px] font-bold tracking-[0.22em] uppercase mt-1 leading-none"
            style={{ color: secondaryColor }}
          >
            PERSONAL PASTRY CHEF
          </span>
        </div>
      </div>
    );
  }

  // Full Stacked Logo (Exact matching reference logo)
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <CakeMark s={size} />
      <span
        className="text-xl font-black tracking-[0.2em] leading-none uppercase mt-2.5"
        style={{ color: primaryColor, fontFamily: "serif, system-ui" }}
      >
        TORTEL&apos;E
      </span>
      <span
        className="text-[9px] font-bold tracking-[0.25em] uppercase mt-1.5 leading-none"
        style={{ color: secondaryColor }}
      >
        PERSONAL PASTRY CHEF
      </span>
    </div>
  );
};

