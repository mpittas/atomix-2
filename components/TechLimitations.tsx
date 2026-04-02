"use client";

import React from "react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

export default function TechLimitations() {
  return (
    <div className="py-36">
      <DefHeading
        theme="light"
        badgeText="Lorem ipsum"
        title="Why Existing Technology Falls Short"
        description="The problem is structural — and so is the Atomix solution."
      />

      <div className="grid grid-cols-3 gap-4 mt-16 w-full mx-auto">
        <IconBox
          src="/icons/white/money-coins-white.svg"
          title="Task-level automation leaves underwriters reviewing everything"
          description="Costs stay high, scaling still requires hiring"
        />
        <IconBox
          src="/icons/white/clock-white.svg"
          title="AI cannot guarantee compliance"
          description="a 1% error rate means thousands of non-compliant loans, with no audit trail"
        />
        <IconBox
          src="/icons/white/arrows-white.svg"
          title="No existing platform enforces end-to-end compliance or connects all parties in a single ecosystem"
          description=""
        />
      </div>
    </div>
  );
}
