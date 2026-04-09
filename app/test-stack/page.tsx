"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import {
  FaRobot,
  FaShieldVirus,
  FaBoxOpen,
  FaServer,
  FaTimeline,
  FaLock,
  FaBuildingColumns,
  FaLinkSlash,
  FaTriangleExclamation,
} from "react-icons/fa6";

const stackItems = [
  {
    icon: <FaRobot className="h-7 w-7" />,
    title: "Task-level automation leaves underwriters reviewing everything",
    description: "Costs stay high, scaling still requires hiring",
  },
  {
    icon: <FaShieldVirus className="h-7 w-7" />,
    title: "AI cannot guarantee compliance",
    description:
      "a 1% error rate means thousands of non-compliant loans, with no audit trail",
  },
  {
    icon: <FaBoxOpen className="h-7 w-7" />,
    title: "Black-box reasoning fails audit requirements",
    description: "No traceable logic, no decision trail, no accountability",
  },
  {
    icon: <FaServer className="h-7 w-7" />,
    title:
      "Legacy systems are expensive to configure and impossible to adapt quickly",
    description:
      "New products and rule changes require developers, long lead times and significant cost",
  },
  {
    icon: <FaTimeline className="h-7 w-7" />,
    title: "No process orchestration",
    description:
      "Existing systems cannot ensure the right parties verify the right documents at the right time",
  },
  {
    icon: <FaLock className="h-7 w-7" />,
    title: "Existing tech cannot enforce capital provider criteria",
    description:
      "Lenders cannot demonstrate compliance, blocking access to institutional funding",
  },
  {
    icon: <FaBuildingColumns className="h-7 w-7" />,
    title:
      "No existing platform enforces end-to-end compliance or connects lenders to capital at scale",
    description: "",
  },
  {
    icon: <FaLinkSlash className="h-7 w-7" />,
    title:
      "Incumbents lack the blockchain layer and regulatory architecture needed to unlock secondary liquidity",
    description: "",
  },
  {
    icon: <FaTriangleExclamation className="h-7 w-7" />,
    title: "The root cause is infrastructure, not intent",
    description:
      "Legacy systems were never designed to handle the volume, complexity or transparency this market demands",
  },
];

export default function TestStackPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Set initial states
      stackRefs.current.forEach((ref) => {
        if (ref) {
          gsap.set(ref, { autoAlpha: 0, y: 30 });
        }
      });

      // Animate in with stagger
      gsap.to(stackRefs.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[#004054] px-6 py-24 md:px-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <DefHeading
            theme="light"
            badgeText=""
            showBadge={false}
            title="Why Existing Technology Falls Short"
            description="The problem is structural — and so is the Atomix solution."
            className="mx-0 max-w-xl items-start text-left"
          />
        </div>

        <div className="relative pb-32">
          {stackItems.map((item, index) => (
            <div
              key={item.title}
              className={index === 0 ? "sticky" : "-mt-24 sticky md:-mt-20"}
              style={{
                top: `${96 + index * 20}px`,
                zIndex: index + 1,
              }}
            >
              <div
                ref={(element) => {
                  stackRefs.current[index] = element;
                }}
                className="relative flex min-h-[220px] flex-col items-center gap-1 overflow-hidden rounded-2xl border border-dashed border-[#82b0ba] bg-[#124652] p-7 text-center will-change-transform"
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute -right-4 -top-8 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
                  <div className="absolute -bottom-8 -left-4 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
                </div>

                <div className="relative flex flex-col items-center gap-1">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div
                    className="text-lg font-semibold leading-[1.3em] text-white"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  {item.description && (
                    <div className="mt-2 text-md text-white/80">
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
