import React, { useRef } from "react";
import { BadgeHeadingPill } from "../ui/BadgeHeadingPill";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface DefHeadingProps {
  badgeText: string;
  badgeColor?: "blue" | "red";
  title: string;
  description: string;
  className?: string;
  badgeClassName?: string;
  theme?: "dark" | "light";
}

const DefHeading: React.FC<DefHeadingProps> = ({
  badgeText,
  badgeColor = "blue",
  title,
  description,
  className = "",
  badgeClassName = "",
  theme = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const titleColor = theme === "dark" ? "text-[#212329]" : "text-white";
  const descriptionColor =
    theme === "dark" ? "text-[#474D5D]" : "text-white/80";

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = [badgeRef.current, descRef.current];

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-y-6 items-center text-center max-w-6xl mx-auto ${className}`}
    >
      <div ref={badgeRef}>
        <BadgeHeadingPill color={badgeColor} className={badgeClassName}>
          {badgeText}
        </BadgeHeadingPill>
      </div>

      <SplitText
        text={title}
        tag="h2"
        className={`text-5xl leading-[1.2em] font-semibold ${titleColor}`}
        splitType="chars"
        delay={20}
        duration={0.6}
        from={{ opacity: 0, y: 26 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.2}
      />

      <div ref={descRef} className={`${descriptionColor} text-lg`}>
        {description}
      </div>
    </div>
  );
};

export default DefHeading;
