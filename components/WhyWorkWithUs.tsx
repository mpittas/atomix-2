"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";
import { Button as DefButton } from "@/components/ui";

const careers = [
  {
    icon: "/icons/white/globe.svg",
    title: "Real-World Financial Infrastructure",
    text: "Build technology that powers real lending markets and impacts billions in asset-backed finance.",
  },
  {
    icon: "/icons/white/users-group.svg",
    title: "Small Team, Big Impact",
    text: "Join a focused team where every contribution directly shapes the product, technology, and company.",
  },
  {
    icon: "/icons/white/ai-chip.svg",
    title: "Cutting-Edge Technology",
    text: "Work across AI, automation, data systems, and blockchain-backed infrastructure.",
  },
];

export default function WhyWorkWithUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      const items = contentRef.current.querySelectorAll(".tab-content-item");

      gsap.set(items, {
        opacity: 0,
        y: 30,
        scale: 0.95,
      });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { dependencies: [activeIndex], scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="">
      <DefHeading
        theme="light"
        badgeText="Careers"
        title="Why Work With Us"
        description="Join us in building the future of lending technology."
      />

      <div className="mt-14 flex gap-4 max-w-[1100px] mx-auto mb-8">
        {careers.map((career, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 overflow-hidden ${
              index === activeIndex ? "bg-[#eaeff1] text-black" : "bg-[#124652]"
            }`}
            type="button"
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            </div>
            <h3
              className={`text-xl font-semibold text-center relative z-10 ${
                index === activeIndex ? "text-[#0f1b1e]" : "text-white"
              }`}
            >
              {career.title}
            </h3>
          </button>
        ))}
      </div>

      <div ref={contentRef} className="max-w-[1100px] mx-auto">
        <div className="tab-content-item">
          <IconBox
            src={careers[activeIndex].icon}
            title={careers[activeIndex].title}
            titleClassName="text-md font-semibold"
            description={careers[activeIndex].text}
          />
        </div>
      </div>

      <div className="mt-14 text-center">
        <DefButton size="large">Learn more</DefButton>
      </div>
    </div>
  );
}
