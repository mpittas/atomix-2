"use client";

import React from "react";
import Link from "next/link";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";
import { Button as DefButton } from "@/components/ui";

const products = [
  {
    icon: "/images/dashboard-lenders-main.svg",
    title: "Cash home-buyer MVP",
    subtitle: "Launching Q2 2026",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "/images/dashboard-cp-main.svg",
    title: "Auction finance MVP",
    subtitle: "Launching Q3 2026",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function CurrentStatusDiagram() {
  return (
    <div className="">
      <DefHeading
        theme="light"
        badgeText=""
        title="Current status"
        description="Atomix is live and building — two product launches confirmed for 2026."
        showBadge={false}
      />

      <div className="mt-14 flex items-stretch gap-6 max-w-[1180px] mx-auto">
        <div className="flex-1 relative">
          <IconBox
            src={products[0].icon}
            title={products[0].title}
            titleClassName="text-md font-semibold"
            fullWidthImage
            description={
              <>
                <div className="text-sm text-white/80">
                  {products[0].subtitle}
                </div>
                <div className="mt-2">{products[0].text}</div>
              </>
            }
            imageSize="large"
          />
        </div>
        <div className="flex-1 relative">
          <IconBox
            src={products[1].icon}
            title={products[1].title}
            titleClassName="text-md font-semibold"
            fullWidthImage
            description={
              <>
                <div className="text-sm text-white/80">
                  {products[1].subtitle}
                </div>
                <div className="mt-2">{products[1].text}</div>
              </>
            }
            imageSize="large"
          />
        </div>
      </div>

      <div className="max-w-[260px] mx-auto flex justify-center">
        <svg
          viewBox="0 0 325 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="-mr-[2px]"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            d="M 2 2 L 2 25 Q 2 40 17 40 L 308 40 Q 323 40 323 55 L 323 78"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <svg
          viewBox="0 0 325 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="-ml-[2px]"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            d="M 323 2 L 323 25 Q 323 40 308 40 L 17 40 Q 2 40 2 55 L 2 78"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="max-w-[1180px] mx-auto p-6 rounded-xl bg-white/10 border border-dashed border-white/40 flex gap-2">
        <div className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold">
          Loan origination
          <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold">
          Lawyer workflow
          <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold">
          Loan management
          <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          </div>
        </div>

        <div className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold">
          Capital provider dashboards
          <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      <div className="mt-14 text-center">
        <Link href="/current-status-v1">
          <DefButton size="large">Learn more</DefButton>
        </Link>
      </div>
    </div>
  );
}
