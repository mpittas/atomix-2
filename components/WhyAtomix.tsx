"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "./IconBox";
import { Button as DefButton } from "@/components/ui";

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
  {
    icon: "/icons/white/ai-chip.svg",
    title: "Lorem Ipsum Dolor",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function WhyAtomix() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const itemsTlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(itemsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      itemsTlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 2,
        },
      });

      itemsTlRef.current.to(itemsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });

      return () => {
        itemsTlRef.current?.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === sectionRef.current) st.kill();
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="py-36">
      <DefHeading
        theme="light"
        badgeText="Platform"
        showBadge={false}
        title="Why Atomix"
        description="No other platform delivers this combination."
      />

      <div
        ref={itemsRef}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1100px] mx-auto"
      >
        {/* Row 1: 2 cards - first spans 2 columns, second takes 1 */}
        <div className="md:col-span-1">
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

        {/* Row 3: sixth card spanning 2 columns */}
        <div className="md:col-span-1">
          <IconBox
            src={features[5].icon}
            title={features[5].title}
            description={features[5].text}
            imageSize="large"
          />
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <DefButton size="large">About Us</DefButton>
      </div>
    </div>
  );
}
