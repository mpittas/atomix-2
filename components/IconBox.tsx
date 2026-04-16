"use client";

import React from "react";
import Image from "next/image";
import gsap from "gsap";
import { MouseEvent, ReactNode } from "react";

interface IconBoxProps {
  icon?: ReactNode;
  src?: string;
  width?: number;
  title?: string;
  titleClassName?: string;
  description?: ReactNode;
  className?: string;
  imageSize?: "small" | "medium" | "large";
  fullWidthImage?: boolean;
  iconSize?: number;
}

export default function IconBox({
  icon,
  src = "/icons/gradient/arrows-gradient.svg",
  width = 48,
  title = "Lenders deal with 100+ manual touchpoints per loan",
  titleClassName = "",
  description,
  className = "",
  imageSize = "medium",
  fullWidthImage = false,
  iconSize = 48,
}: IconBoxProps) {
  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const parent = target.parentElement;

    gsap.to(target, {
      scale: 1.2,
      duration: 0.25,
      ease: "power2.out",
    });

    // Apply z-index to parent if it exists (handles both direct grid cells and wrapper divs)
    if (parent) {
      gsap.to(parent, {
        zIndex: 10,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const parent = target.parentElement;

    gsap.to(target, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Reset parent z-index
    if (parent) {
      gsap.to(parent, {
        zIndex: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const finalWidth = width !== 48 ? width : sizeMap[imageSize];

  return (
    <div
      className={`relative flex flex-col items-center gap-1 p-7 rounded-2xl text-center h-full border border-dashed bg-[#124652] border-[#82b0ba] overflow-hidden will-change-transform ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/25 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/25 rounded-full blur-2xl" />
      </div>

      <div
        className={`relative flex flex-col gap-1 ${
          fullWidthImage ? "w-full items-stretch" : "items-center"
        }`}
      >
        {icon ? (
          <div className="mb-2 flex items-center justify-center text-white">
            {React.isValidElement(icon) && icon.type !== "img"
              ? React.cloneElement(icon, { size: iconSize } as any)
              : icon}
          </div>
        ) : (
          <Image
            src={src}
            alt={title}
            width={fullWidthImage ? 1200 : finalWidth}
            height={fullWidthImage ? 720 : finalWidth}
            className={
              fullWidthImage ? "mb-3 w-full h-auto rounded-lg" : "mb-2"
            }
          />
        )}
        <div
          className={`text-lg font-semibold leading-[1.3em] text-white ${titleClassName}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <div className="text-md text-white/80 mt-2">{description}</div>
        )}
      </div>
    </div>
  );
}
