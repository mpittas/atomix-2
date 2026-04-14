"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";
import { Button as DefButton } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const leftPathRef = useRef<SVGPathElement>(null);
  const rightPathRef = useRef<SVGPathElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { overwrite: "auto" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // 1. Animate images from sides
      tl.fromTo(
        leftImageRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        "0",
      ).fromTo(
        rightImageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        "0",
      );

      // 2. Animate SVG paths from start to end simultaneously
      const animatePath = (path: SVGPathElement | null) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, {
          attr: {
            "stroke-dasharray": `${len} ${len}`,
            "stroke-dashoffset": `${len}`,
          },
        });
        gsap.to(path, {
          attr: { "stroke-dashoffset": "0" },
          duration: 2,
          ease: "power2.inOut",
        });
      };

      tl.add(() => {
        animatePath(leftPathRef.current);
        animatePath(rightPathRef.current);
      }, "+=0.4");

      // 3. Animate background with fade-in and scale-in
      tl.fromTo(
        backgroundRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "+=0.4",
      );

      // 4. Animate four titles with staggered fade-in after background completes
      tl.fromTo(
        titleRefs.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "+=0.3",
      );

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="">
      <DefHeading
        theme="light"
        badgeText=""
        title="Current status"
        description="Atomix is live and building — two product launches confirmed for 2026."
        showBadge={false}
      />

      <div className="mt-14 flex items-stretch gap-6 max-w-[1180px] mx-auto">
        <div ref={leftImageRef} className="flex-1 relative">
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
        <div ref={rightImageRef} className="flex-1 relative">
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
            ref={leftPathRef}
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
            ref={rightPathRef}
            d="M 323 2 L 323 25 Q 323 40 308 40 L 17 40 Q 2 40 2 55 L 2 78"
            fill="none"
            stroke="#90abb3"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative max-w-[1180px] mx-auto flex gap-2 mt-6">
        <div
          ref={backgroundRef}
          className="absolute -top-6 -bottom-6 -right-6 -left-6 rounded-xl bg-white/10 border border-dashed border-white/40"
        ></div>

        <div
          ref={(el) => {
            if (el) titleRefs.current[0] = el;
          }}
          className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold"
        >
          Loan origination
          <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          </div>
        </div>

        <div
          ref={(el) => {
            if (el) titleRefs.current[1] = el;
          }}
          className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold"
        >
          Lawyer workflow
          <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          </div>
        </div>

        <div
          ref={(el) => {
            if (el) titleRefs.current[2] = el;
          }}
          className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold"
        >
          Loan management
          <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
          </div>
        </div>

        <div
          ref={(el) => {
            if (el) titleRefs.current[3] = el;
          }}
          className="relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer py-5 px-1 overflow-hidden bg-[#124652] text-white text-center text-lg font-semibold"
        >
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
