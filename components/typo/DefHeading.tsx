import React, { useRef } from "react";
import { BadgeHeadingPill } from "../ui/BadgeHeadingPill";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const titleColor = theme === "dark" ? "text-[#212329]" : "text-white";
  const descriptionColor =
    theme === "dark" ? "text-[#474D5D]" : "text-white/80";

  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current) return;

      const splitInstance = new GSAPSplitText(titleRef.current, {
        type: "chars",
        smartWrap: true,
        charsClass: "split-char",
        reduceWhiteSpace: false,
      });

      gsap.set(splitInstance.chars, { opacity: 0, y: 30 });
      gsap.set(descRef.current, { opacity: 0, y: 30 });
      gsap.set(badgeRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          splitInstance.chars,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.02,
          },
          "-=0.4",
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.3",
        );

      return () => {
        splitInstance.revert();
      };
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

      <h2
        ref={titleRef}
        className={`text-5xl leading-[1.2em] font-semibold ${titleColor}`}
      >
        {title}
      </h2>

      <div ref={descRef} className={`${descriptionColor} text-lg`}>
        {description}
      </div>
    </div>
  );
};

export default DefHeading;
