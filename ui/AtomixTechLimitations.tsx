"use client";

import React from "react";
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
import IconBox from "@/components/IconBox";

const techLimitationsData = [
  {
    icon: <FaRobot className="h-10 w-10" />,
    title: "Task-level automation leaves underwriters reviewing everything",
    description: "Costs stay high, scaling still requires hiring",
  },
  {
    icon: <FaShieldVirus className="h-10 w-10" />,
    title: "AI cannot guarantee compliance",
    description:
      "a 1% error rate means thousands of non-compliant loans, with no audit trail",
  },
  {
    icon: <FaBoxOpen className="h-10 w-10" />,
    title: "Black-box reasoning fails audit requirements",
    description: "No traceable logic, no decision trail, no accountability",
  },
  {
    icon: <FaServer className="h-10 w-10" />,
    title:
      "Legacy systems are expensive to configure and impossible to adapt quickly",
    description:
      "New products and rule changes require developers, long lead times and significant cost",
  },
  {
    icon: <FaTimeline className="h-10 w-10" />,
    title: "No process orchestration",
    description:
      "Existing systems cannot ensure the right parties verify the right documents at the right time",
  },
  {
    icon: <FaLock className="h-10 w-10" />,
    title: "Existing tech cannot enforce capital provider criteria",
    description:
      "Lenders cannot demonstrate compliance, blocking access to institutional funding",
  },
  {
    icon: <FaBuildingColumns className="h-10 w-10" />,
    title:
      "No existing platform enforces end-to-end compliance or connects lenders to capital at scale",
    description: "",
  },
  {
    icon: <FaLinkSlash className="h-10 w-10" />,
    title:
      "Incumbents lack the blockchain layer and regulatory architecture needed to unlock secondary liquidity",
    description: "",
  },
  {
    icon: <FaTriangleExclamation className="h-10 w-10" />,
    title: "The root cause is infrastructure, not intent",
    description:
      "Legacy systems were never designed to handle the volume, complexity or transparency this market demands",
  },
];

export default function AtomixTechLimitations() {
  return (
    <>
      <div className="flex flex-col gap-y-6 items-center text-center max-w-6xl mx-auto mb-16">
        <h2 className="text-5xl leading-[1.2em] font-semibold text-white">
          Why Existing Technology Falls Short
        </h2>
        <p className="text-white/80 text-lg">
          The problem is structural — and so is the Atomix solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-auto">
        {techLimitationsData.map((item, index) => (
          <IconBox
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </>
  );
}
