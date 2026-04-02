"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TechLimitations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const handleHeadingAnimationComplete = () => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const boxes = [box1Ref.current, box2Ref.current, box3Ref.current];

    gsap.fromTo(
      boxes,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      },
    );
  };

  useGSAP(
    () => {
      gsap.set([box1Ref.current, box2Ref.current, box3Ref.current], {
        opacity: 0,
        scale: 0.85,
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="py-36">
      <DefHeading
        theme="light"
        badgeText="Lorem ipsum"
        title="Why Existing Technology Falls Short"
        description="The problem is structural — and so is the Atomix solution."
        onAnimationComplete={handleHeadingAnimationComplete}
      />

      <div className="grid grid-cols-3 gap-4 mt-16 w-full mx-auto">
        <div ref={box1Ref}>
          <IconBox
            src="/icons/white/money-coins-white.svg"
            title="Task-level automation leaves underwriters reviewing everything"
            description="Costs stay high, scaling still requires hiring"
          />
        </div>
        <div ref={box2Ref}>
          <IconBox
            src="/icons/white/clock-white.svg"
            title="AI cannot guarantee compliance"
            description="a 1% error rate means thousands of non-compliant loans, with no audit trail"
          />
        </div>
        <div ref={box3Ref}>
          <IconBox
            src="/icons/white/arrows-white.svg"
            title="No existing platform enforces end-to-end compliance or connects all parties in a single ecosystem"
            description=""
          />
        </div>
      </div>
    </div>
  );
}
