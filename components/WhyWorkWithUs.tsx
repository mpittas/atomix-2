"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";
import { Button as DefButton } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
      gsap.set(itemsRef.current?.children || [], {
        opacity: 0,
        y: 50,
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
        itemsRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
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
        badgeText="Careers"
        title="Why Work With Us"
        description="Join us in building the future of lending technology."
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
            src={careers[0].icon}
            title={careers[0].title}
            titleClassName="text-md font-semibold"
            description={careers[0].text}
          />
        </div>
        <div
          ref={(el) => {
            if (el) itemsRef.current?.appendChild(el);
          }}
          className="flex-1 relative"
        >
          <IconBox
            src={careers[1].icon}
            title={careers[1].title}
            titleClassName="text-md font-semibold"
            description={careers[1].text}
          />
        </div>
        <div
          ref={(el) => {
            if (el) itemsRef.current?.appendChild(el);
          }}
          className="flex-1 relative"
        >
          <IconBox
            src={careers[2].icon}
            title={careers[2].title}
            titleClassName="text-md font-semibold"
            description={careers[2].text}
          />
        </div>
      </div>

      <div ref={buttonRef} className="mt-14 text-center">
        <DefButton size="large">Learn more</DefButton>
      </div>
    </div>
  );
}
