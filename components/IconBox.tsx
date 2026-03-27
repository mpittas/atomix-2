"use client";

import Image from "next/image";
import { ReactNode, useRef } from "react";
import gsap from "gsap";

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
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const finalWidth = width !== 48 ? width : sizeMap[imageSize];

  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef1 = useRef<HTMLDivElement>(null);
  const shineRef2 = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const handleMouseEnter = () => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(
      containerRef.current,
      {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(3)",
      },
      0,
    )
      .fromTo(
        shineRef1.current,
        {
          x: "140",
          opacity: 0,
        },
        {
          x: "-400",
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0,
      )
      .fromTo(
        shineRef2.current,
        {
          x: "180",
          opacity: 0,
        },
        {
          x: "-600",
          opacity: 1,
          duration: 0.7,
          ease: "power2.inOut",
        },
        0.15,
      );
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center gap-1 p-7 rounded-2xl text-center h-full border border-dashed bg-[#565e98] border-[#999fc7] overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div
          ref={shineRef1}
          className="absolute -top-10 -bottom-10 w-8 bg-white/40 blur-xl"
          style={{
            transform: "translateX(150%) rotate(15deg)",
            right: "0",
            opacity: 0,
          }}
        />
        <div
          ref={shineRef2}
          className="absolute -top-10 -bottom-10 w-24 bg-white/30 blur-2xl"
          style={{
            transform: "translateX(150%) rotate(15deg)",
            right: "0",
            opacity: 0,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-1">
        <Image
          src={src}
          alt={title}
          width={finalWidth}
          height={finalWidth}
          className="mb-2"
        />
        <div className={`text-md text-white ${titleClassName}`}>{title}</div>
        {description && (
          <div className="text-md text-white/80 mt-2">{description}</div>
        )}
      </div>
    </div>
  );
}
