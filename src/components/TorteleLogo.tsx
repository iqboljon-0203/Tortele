import React from "react";
import { LOGO_FULL, LOGO_MARK, LOGO_WORD } from "./logoPaths";

interface TorteleLogoProps {
  variant?: "full" | "horizontal" | "mark";
  theme?: "brand" | "white" | "ink";
  className?: string;
  /** Height in pixels. */
  size?: number;
}

const COLORS = { brand: "#C4608F", white: "#FFFFFF", ink: "#2C2328" };

const Art: React.FC<{ art: { w: number; h: number; inner: string }; height: number }> = ({ art, height }) => (
  <svg
    viewBox={`0 0 ${art.w} ${art.h}`}
    height={height}
    width={(height * art.w) / art.h}
    aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: art.inner }}
  />
);

export const TorteleLogo: React.FC<TorteleLogoProps> = ({
  variant = "full",
  theme = "brand",
  className = "",
  size = 56,
}) => {
  const style = { color: COLORS[theme] };

  if (variant === "horizontal") {
    return (
      <span role="img" aria-label="TORTEL'E" style={style} className={`inline-flex items-center gap-2 ${className}`}>
        <Art art={LOGO_MARK} height={size} />
        <Art art={LOGO_WORD} height={size * 0.62} />
      </span>
    );
  }

  return (
    <span role="img" aria-label="TORTEL'E" style={style} className={`inline-flex ${className}`}>
      <Art art={variant === "mark" ? LOGO_MARK : LOGO_FULL} height={size} />
    </span>
  );
};
