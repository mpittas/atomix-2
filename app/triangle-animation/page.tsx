"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import AtomixPyramidNewDesign from "@/animations/AtomixPyramidNewDesign";

gsap.registerPlugin(ScrollTrigger);

export default function TriangleAnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pyramidSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = pyramidSectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top top+=96px",
      end: "+=2000",
      pin: true,
      pinSpacing: true,
      scrub: true,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#004054]">
      <Header />

      <div className="pt-23">
        <div className="min-h-screen bg-red-500/50"></div>
        <div ref={pyramidSectionRef}>
          <div className="max-w-[1200px] min-h-[200px] mx-auto flex pt-[56px]">
            <div className="flex-1">
              <AtomixPyramidNewDesign />
            </div>

            <div className="flex-1 bg-yellow-500/10"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
