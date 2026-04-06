import React, { useRef } from "react";
import { BadgeHeadingPill } from "../ui/BadgeHeadingPill";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export interface DefHeadingProps {
  badgeText: string;
  badgeColor?: "blue" | "red";
  title: string;
  description: string;
  className?: string;
  badgeClassName?: string;
  theme?: "dark" | "light";
  showBadge?: boolean;
  onAnimationComplete?: () => void;
}

const DefHeading: React.FC<DefHeadingProps> = ({
  badgeText,
  badgeColor = "blue",
  title,
  description,
  className = "",
  badgeClassName = "",
  theme = "dark",
  showBadge = true,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const titleColor = theme === "dark" ? "text-[#212329]" : "text-white";
  const descriptionColor =
    theme === "dark" ? "text-[#474D5D]" : "text-white/80";

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-y-6 items-center text-center max-w-6xl mx-auto ${className}`}
    >
      {showBadge && (
        <div ref={badgeRef}>
          <BadgeHeadingPill color={badgeColor} className={badgeClassName}>
            {badgeText}
          </BadgeHeadingPill>
        </div>
      )}

      <SplitText
        text={title}
        tag="h2"
        className={`text-5xl leading-[1.2em] font-semibold ${titleColor}`}
        onLetterAnimationComplete={onAnimationComplete}
        enableShine={true}
      />

      <div ref={descRef} className={`${descriptionColor} text-lg`}>
        {description}
      </div>
    </div>
  );
};

export default DefHeading;
