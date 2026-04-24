"use client";

import React from "react";
import Image from "next/image";
import gsap from "gsap";
import { MouseEvent, ReactNode, useRef } from "react";

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
  align?: "center" | "left";
  hideIcon?: boolean;
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
  align = "center",
  hideIcon = false,
}: IconBoxProps) {
  const baseGlowAngle = "45deg";
  const baseBorderOpacity = 0.28;
  const baseRingOpacity = 0.18;
  const baseBlurOpacity = 0.06;
  const lastGlowAngleRef = useRef(45);

  const normalizeGlowAngle = (nextAngle: number) => {
    const previousAngle = lastGlowAngleRef.current;
    const delta = ((nextAngle - previousAngle + 540) % 360) - 180;
    const normalizedAngle = previousAngle + delta;

    lastGlowAngleRef.current = normalizedAngle;

    return normalizedAngle;
  };

  const updateGlowPosition = (
    target: HTMLDivElement,
    clientX: number,
    clientY: number,
  ) => {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    if (angle < 0) {
      angle += 360;
    }

    const normalizedAngle = normalizeGlowAngle(angle);

    const distanceToEdge = Math.min(x, rect.width - x, y, rect.height - y);
    const maxDistance = Math.max(Math.min(rect.width, rect.height) / 2, 1);
    const edgeProximity =
      1 - Math.min(Math.max(distanceToEdge / maxDistance, 0), 1);
    const borderOpacity = 0.74 + edgeProximity * 0.26;
    const ringGlowOpacity = 0.4 + edgeProximity * 0.5;
    const blurGlowOpacity = 0.12 + edgeProximity * 0.24;
    const outerGlowStrength = 0.08 + edgeProximity * 0.14;

    gsap.set(target, {
      "--glow-angle": `${normalizedAngle.toFixed(2)}deg`,
      "--glow-border-opacity": borderOpacity,
      "--glow-ring-opacity": ringGlowOpacity,
      "--glow-blur-opacity": blurGlowOpacity,
    });

    gsap.set(target, {
      boxShadow: `0 0 0 1px rgba(88, 255, 252, ${0.22 + edgeProximity * 0.16}), 0 0 14px rgba(88, 255, 252, ${outerGlowStrength}), 0 0 28px rgba(88, 255, 252, ${outerGlowStrength * 0.65})`,
    });
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const parent = target.parentElement;

    updateGlowPosition(target, event.clientX, event.clientY);

    gsap.to(target, {
      scale: 1.2,
      "--glow-border-opacity": 1,
      "--glow-ring-opacity": 0.96,
      "--glow-blur-opacity": 0.3,
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
      "--glow-border-opacity": baseBorderOpacity,
      "--glow-ring-opacity": baseRingOpacity,
      "--glow-blur-opacity": baseBlurOpacity,
      boxShadow:
        "0 0 0 1px rgba(88, 255, 252, 0.14), 0 0 14px rgba(88, 255, 252, 0.03), 0 0 28px rgba(88, 255, 252, 0.02)",
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

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    updateGlowPosition(event.currentTarget, event.clientX, event.clientY);
  };

  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const finalWidth = width !== 48 ? width : sizeMap[imageSize];

  return (
    <div
      className={`relative flex flex-col ${align === "left" ? "items-start text-left" : "items-center text-center"} gap-1 p-7 rounded-2xl h-full  bg-[#003746] overflow-hidden will-change-transform ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        {
          "--glow-angle": baseGlowAngle,
          "--glow-border-opacity": baseBorderOpacity,
          "--glow-ring-opacity": baseRingOpacity,
          "--glow-blur-opacity": baseBlurOpacity,
          boxShadow:
            "0 0 0 1px rgba(88, 255, 252, 0.14), 0 0 14px rgba(88, 255, 252, 0.03), 0 0 28px rgba(88, 255, 252, 0.02)",
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(88, 255, 252, 0) 0deg, rgba(88, 255, 252, 0) 278deg, rgba(88, 255, 252, 0.5) 300deg, rgba(88, 255, 252, 1) 329deg, rgba(210, 255, 255, 1) 343deg, rgba(88, 255, 252, 0.44) 356deg, rgba(88, 255, 252, 0) 360deg)",
          opacity: "var(--glow-border-opacity)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(88, 255, 252, 0) 0deg, rgba(88, 255, 252, 0) 274deg, rgba(88, 255, 252, 0.22) 300deg, rgba(88, 255, 252, 0.96) 330deg, rgba(160, 255, 255, 0.76) 346deg, rgba(88, 255, 252, 0) 360deg)",
          opacity: "var(--glow-blur-opacity)",
          filter: "blur(6px)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl p-px"
        style={{
          background:
            "conic-gradient(from var(--glow-angle), rgba(88, 255, 252, 0) 0deg, rgba(88, 255, 252, 0) 284deg, rgba(88, 255, 252, 0.34) 306deg, rgba(210, 255, 255, 1) 330deg, rgba(88, 255, 252, 0.48) 350deg, rgba(88, 255, 252, 0) 360deg)",
          opacity: "var(--glow-ring-opacity)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          mixBlendMode: "screen",
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -top-5 -right-5 w-[45%] h-[45%] rounded-full bg-[#58fffc]/10  blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[45%] h-[45%] rounded-full bg-[#58fffc]/10  blur-xl" />
      </div>

      <div
        className={`relative flex flex-col gap-1 ${
          fullWidthImage
            ? "w-full items-stretch"
            : align === "left"
              ? "items-start"
              : "items-center"
        }`}
      >
        {!hideIcon && icon ? (
          <div
            className={`mb-2 flex items-center ${align === "left" ? "justify-start" : "justify-center"} text-white`}
          >
            {React.isValidElement<{ size?: number }>(icon) &&
            icon.type !== "img"
              ? React.cloneElement(icon, { size: iconSize })
              : icon}
          </div>
        ) : (
          !hideIcon && (
            <Image
              src={src}
              alt={title}
              width={fullWidthImage ? 1200 : finalWidth}
              height={fullWidthImage ? 720 : finalWidth}
              className={
                fullWidthImage ? "mb-3 w-full h-auto rounded-lg" : "mb-2"
              }
            />
          )
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
