"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";
import { Button as DefButton } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const products = [
  {
    icon: "/icons/white/globe.svg",
    title: "Product Alpha",
    text: "Our first major product launch coming in Q2 2026, designed to revolutionize digital asset management.",
  },
  {
    icon: "/icons/white/ai-chip.svg",
    title: "Product Beta",
    text: "The second product scheduled for Q4 2026, focusing on AI-powered financial analytics.",
  },
];

export default function CurrentStatus() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const itemsTlRef = useRef<gsap.core.Timeline | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Find badge and description elements within the section
      const badgeEl = sectionRef.current?.querySelector("[data-badge]");
      const descEl = sectionRef.current?.querySelector("[data-description]");

      // Set initial states
      const children = Array.from(itemsRef.current?.children || []);
      gsap.set(children[0], {
        opacity: 0,
        x: -100,
        scale: 0.9,
      });
      gsap.set(children[1], {
        opacity: 0,
        x: 100,
        scale: 0.9,
      });

      if (badgeEl) {
        gsap.set(badgeEl, {
          opacity: 0,
          y: -30,
        });
      }

      if (descEl) {
        gsap.set(descEl, {
          opacity: 0,
          y: 30,
        });
      }

      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.95,
        });
      }

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 40%",
          scrub: 2,
        },
      });

      // Animate badge
      if (badgeEl) {
        mainTl.to(
          badgeEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "0",
        );
      }

      // Animate description
      if (descEl) {
        mainTl.to(
          descEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "0.2",
        );
      }

      // Animate items
      mainTl.to(
        children,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        "0.4",
      );

      // Animate button
      if (buttonRef.current) {
        mainTl.to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "0.8",
        );
      }

      itemsTlRef.current = mainTl;

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
    <div ref={sectionRef} className="">
      <DefHeading
        theme="light"
        badgeText=""
        title="Current status"
        description="Atomix is live and building — two product launches confirmed for 2026."
        showBadge={false}
      />

      <div
        ref={itemsRef}
        className="mt-14 flex items-stretch gap-6 max-w-[1100px] mx-auto"
      >
        <div
          ref={(el) => {
            if (el) itemsRef.current?.appendChild(el);
          }}
          className="flex-1 relative"
        >
          <IconBox
            src={products[0].icon}
            title={products[0].title}
            titleClassName="text-md font-semibold"
            description={products[0].text}
          />
        </div>
        <div
          ref={(el) => {
            if (el) itemsRef.current?.appendChild(el);
          }}
          className="flex-1 relative"
        >
          <IconBox
            src={products[1].icon}
            title={products[1].title}
            titleClassName="text-md font-semibold"
            description={products[1].text}
          />
        </div>
      </div>
    </div>
  );
}
