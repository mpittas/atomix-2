"use client";

import { type ReactNode } from "react";
import { FaShieldHalved } from "react-icons/fa6";

interface IconBoxLightProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function IconBoxLight({
  icon,
  title,
  description,
  className = "",
}: IconBoxLightProps) {
  return (
    <div
      className={`group relative rounded-2xl border border-white/60 bg-white/40 backdrop-blur-md p-6 overflow-hidden transition-all duration-300   ${className}`}
    >
      <div className="relative flex flex-col gap-3 items-start text-left">
        {/* Icon badge */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#D8E9EE] text-[#19a1c6]">
          {icon || <FaShieldHalved className="h-12 w-12" />}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#011F27]">{title}</h3>

        {/* Description */}
        <p className="text-md leading-relaxed text-[#4B6066]">{description}</p>
      </div>
    </div>
  );
}
