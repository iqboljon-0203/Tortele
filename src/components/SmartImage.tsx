"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

/** Shows a shimmer until the photo has loaded, then fades it in. */
export const SmartImage: React.FC<ImageProps> = ({ className = "", onLoad, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <span className="absolute inset-0 skeleton" aria-hidden="true" />}
      <Image
        {...props}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
};
