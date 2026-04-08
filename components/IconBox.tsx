"use client";

import Image from "next/image";
import gsap from "gsap";
import { MouseEvent, ReactNode } from "react";

interface IconBoxProps {
  src?: string;
  width?: number;
  title?: string;
  titleClassName?: string;
  description?: ReactNode;
  className?: string;
  imageSize?: "small" | "medium" | "large";
}

export default function IconBox({
  src = "/icons/gradient/arrows-gradient.svg",
  width = 48,
  title = "Lenders deal with 100+ manual touchpoints per loan",
  titleClassName = "",
  description,
  className = "",
  imageSize = "medium",
}: IconBoxProps) {
  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      scale: 1.2,
      zIndex: 10,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
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

      <div className="relative flex flex-col items-center gap-1">
        <Image
          src={src}
          alt={title}
          width={finalWidth}
          height={finalWidth}
          className="mb-2"
        />
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
