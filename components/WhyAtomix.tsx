"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "./IconBox";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    icon: "/icons/white/ai-chip.svg",
    title: "Full-Cycle Automation",
    text: "From enquiry to completion — eliminating back-office and underwriter bottlenecks, with configurable touchpoints for exceptions and edge cases",
  },
  {
    icon: "/icons/white/shield-check-white.svg",
    title: "Compliance Built-In",
    text: "Every loan compliant, every decision auditable — fraud and misrepresentation eliminated at source",
  },
  {
    icon: "/icons/white/rocket-launch-white.svg",
    title: "Single Integration",
    text: "Connecting lenders to private and institutional capital across any funding structure",
  },
  {
    icon: "/icons/white/money-coins-white.svg",
    title: "RWA Tokenisation",
    text: "Loans recorded as digital assets on-chain, laying the foundation for secondary liquidity and broader investor access",
  },
  {
    icon: "/icons/white/users-group.svg",
    title: "Marketplace Infrastructure",
    text: "Ready to scale across lenders, brokers and capital providers",
  },
];

export default function WhyAtomix() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(itemsRef.current?.children || [], {
        opacity: 0,
        y: 40,
        scale: 0.95,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(itemsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="py-36">
      <DefHeading
        theme="light"
        badgeText="Platform"
        title="Why Atomix"
        description="No other platform delivers this combination."
      />

      <div
        ref={itemsRef}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1100px] mx-auto"
      >
        {/* Row 1: 2 cards - first spans 2 columns, second takes 1 */}
        <div className="md:col-span-2">
          <IconBox
            src={features[0].icon}
            title={features[0].title}
            description={features[0].text}
            imageSize="large"
          />
        </div>
        <div className="md:col-span-1">
          <IconBox
            src={features[1].icon}
            title={features[1].title}
            description={features[1].text}
            imageSize="large"
          />
        </div>

        {/* Row 2: 3 equal cards */}
        <div className="md:col-span-1">
          <IconBox
            src={features[2].icon}
            title={features[2].title}
            description={features[2].text}
            imageSize="large"
          />
        </div>
        <div className="md:col-span-1">
          <IconBox
            src={features[3].icon}
            title={features[3].title}
            description={features[3].text}
            imageSize="large"
          />
        </div>
        <div className="md:col-span-1">
          <IconBox
            src={features[4].icon}
            title={features[4].title}
            description={features[4].text}
            imageSize="large"
          />
        </div>
      </div>
    </div>
  );
}
