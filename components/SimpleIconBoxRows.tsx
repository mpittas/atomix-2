"use client";

import IconBox from "@/components/IconBox";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CapitalProvidersContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray(containerRef.current.children);

      gsap.fromTo(
        cards,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "back.out(1.5)",
          stagger: 0.2,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div className="flex flex-col gap-8">
      <div ref={containerRef} className="grid grid-cols-4 gap-6">
        <IconBox
          src="/icons/white/money-coins-white.svg"
          title="High Fixed Fees"
          description="Make smaller, most in-demand loans economic"
        />
        <IconBox
          src="/icons/white/clock-white.svg"
          title="Slow Process"
          description=">35-day completions"
        />
        <IconBox
          src="/icons/white/arrows-white.svg"
          title="Repeat Data Entry"
          description="Enter same data for each lender application"
        />
        <IconBox
          src="/icons/white/eye-white-crossed.svg"
          title="Opaque"
          description="Process lacks transparency, and consistency"
        />
      </div>
    </div>
  );
}

export function LendersContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray(containerRef.current.children);

      gsap.fromTo(
        cards,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "back.out(1.5)",
          stagger: 0.2,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div className="flex flex-col gap-8">
      <div ref={containerRef} className="grid grid-cols-4 gap-6">
        <IconBox
          src="/icons/white/money-coins-white.svg"
          title="High Fixed Fees 2"
          description="Make smaller, most in-demand loans economic"
        />
        <IconBox
          src="/icons/white/clock-white.svg"
          title="Slow Process 2"
          description=">35-day completions"
        />
        <IconBox
          src="/icons/white/arrows-white.svg"
          title="Repeat Data Entry 2"
          description="Enter same data for each lender application"
        />
        <IconBox
          src="/icons/white/eye-white-crossed.svg"
          title="Opaque 2"
          description="Process lacks transparency, and consistency"
        />
      </div>
    </div>
  );
}

export function BorrowersContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray(containerRef.current.children);

      gsap.fromTo(
        cards,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.2,
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div className="flex flex-col gap-8">
      <div ref={containerRef} className="grid grid-cols-4 gap-6">
        <IconBox
          src="/icons/white/money-coins-white.svg"
          title="High Fixed Fees 3"
          description="Make smaller, most in-demand loans economic"
        />
        <IconBox
          src="/icons/white/clock-white.svg"
          title="Slow Process 3"
          description=">35-day completions"
        />
        <IconBox
          src="/icons/white/arrows-white.svg"
          title="Repeat Data Entry 3"
          description="Enter same data for each lender application"
        />
        <IconBox
          src="/icons/white/eye-white-crossed.svg"
          title="Opaque3"
          description="Process lacks transparency, and consistency"
        />
      </div>
    </div>
  );
}
