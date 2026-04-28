"use client";

import { type ReactNode, useId, isValidElement, cloneElement } from "react";
import { FaShieldHalved } from "react-icons/fa6";

interface IconBoxLightProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export default function IconBoxLight({
  icon,
  title,
  description,
  className = "",
  children,
}: IconBoxLightProps) {
  const gradientId = useId().replace(/:/g, "");
  const gradientUrl = `url(#${gradientId})`;

  const renderIcon = () => {
    if (icon && isValidElement(icon)) {
      const el = icon as React.ReactElement<{
        style?: React.CSSProperties;
        className?: string;
      }>;
      return cloneElement(el, {
        className: el.props.className || "",
        style: { ...el.props.style, fill: gradientUrl },
      });
    }
    return <FaShieldHalved className="h-7 w-7" style={{ fill: gradientUrl }} />;
  };

  return (
    <div
      className={`group relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 2px rgba(255,255,255,0.6), inset 5px 5px 20px rgba(10, 21, 44, 0.06)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -top-5 -right-5 w-[45%] h-[45%] rounded-full bg-white/60  blur-xl" />
        <div className="absolute -bottom-5 -left-5 w-[45%] h-[45%] rounded-full bg-white/60  blur-xl" />
      </div>

      <div className="relative flex flex-col gap-3 items-start text-left h-full">
        {/* Gradient definition */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0693B9" />
              <stop offset="100%" stopColor="#39C6ED" />
            </linearGradient>
          </defs>
        </svg>

        {children ? (
          children
        ) : (
          <>
            {/* Icon badge */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D8E9EE]">
              {renderIcon()}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold leading-6 text-[#011F27]">
              {title}
            </h3>

            {/* Description */}
            <p className="text-md leading-relaxed text-[#4B6066]">
              {description}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
