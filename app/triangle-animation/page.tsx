"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import AtomixPyramidNewDesign from "@/animations/AtomixPyramidNewDesign";

export default function TriangleAnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // Simple rotation and scaling animation for a triangle
      gsap.to(triangleRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Subtle pulse animation
      gsap.to(triangleRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#004054]">
      <Header />

      <div className="pt-23">
        <AtomixPyramidNewDesign />
      </div>

      <Footer />
    </div>
  );
}
