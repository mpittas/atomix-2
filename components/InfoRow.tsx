"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface InfoRowProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}

export default function InfoRow({
  imageSrc = "/images/dashboard-capital-providers.svg",
  imageAlt = "Shield check icon",
  title = "Capital Providers",
  subtitle,
  reverse = false,
  children,
}: InfoRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      leftSideRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
    ).fromTo(
      rightSideRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3",
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <div
        ref={leftSideRef}
        className={`${reverse ? "md:order-2" : "md:order-1"} bg-red-500/0`}
      >
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>

      <div
        ref={rightSideRef}
        className={`${reverse ? "md:order-1" : "md:order-2"} bg-green-500/0`}
      >
        <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
        {subtitle && <p className="text-lg text-white/85 mb-9">{subtitle}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
