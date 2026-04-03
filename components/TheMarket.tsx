"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "./IconBox";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const marketStats = [
  {
    icon: "/icons/white/globe.svg",
    value: "£350bn",
    description: "in total annual UK property loan originations",
  },
  {
    icon: "/icons/white/money-coins-white.svg",
    value: "£60bn",
    description:
      "across bridging, buy-to-let and SME CRE term loans — the core Atomix market",
  },
  {
    icon: "/icons/white/clock-white.svg",
    value: "£5.5bn",
    description:
      "in auction property sales stalled by 30-day completion requirements that manual lending cannot meet",
  },
  {
    icon: "/icons/white/arrows-white.svg",
    value: "$2 trillion",
    description:
      "The US commercial real estate market represents a further opportunity — on the same model",
  },
];

export default function TheMarket() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsTlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        y: 0,
        scale: 0.75,
      });

      statsTlRef.current = gsap.timeline({ paused: true });
      statsTlRef.current.to(statsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.15,
      });

      return () => {
        statsTlRef.current?.kill();
      };
    },
    { scope: sectionRef },
  );

  const handleHeadingAnimationComplete = () => {
    statsTlRef.current?.play();
  };

  return (
    <div ref={sectionRef} className="py-36">
      <DefHeading
        theme="light"
        badgeText="Opportunity"
        title="The Market"
        description="UK property lending is large, active and chronically under-automated."
        onAnimationComplete={handleHeadingAnimationComplete}
      />

      <div
        ref={statsRef}
        className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {marketStats.map((stat, index) => (
          <div key={index}>
            <IconBox
              src={stat.icon}
              imageSize="medium"
              title={`<span class="text-3xl font-bold block">${stat.value}</span>`}
              description={stat.description}
              titleClassName="text-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
