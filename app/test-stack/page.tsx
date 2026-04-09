"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
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
  const stackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-[#004054] py-36 px-8">
      <div className="max-w-[900px] mx-auto">
        <DefHeading
          theme="light"
          badgeText=""
          showBadge={false}
          title="Why Existing Technology Falls Short"
          description="The problem is structural — and so is the Atomix solution."
        />

        <div className="space-y-4 mt-16">
          {stackItems.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                stackRefs.current[index] = el;
              }}
              className="border border-dashed border-[#82b0ba] bg-[#124652] rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-white">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-white mt-3">{item.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
