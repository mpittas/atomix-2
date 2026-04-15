"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import AtomixPyramidNewDesign from "@/animations/AtomixPyramidNewDesign";
import { FiCheck, FiX } from "react-icons/fi";

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

            <div className="flex-1 flex flex-col justify-center gap-12 pl-12 pr-4 relative left-6">
              {/* Simple SaaS */}
              <div className="flex items-start gap-4">
                <img
                  src="/icons/white/shield-check-white.svg"
                  alt="Disconnected stacks"
                  className="w-10 h-10 shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Simple SaaS
                  </h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    automated and easy to change,
                    <br />
                    but simple products only
                  </p>
                </div>
              </div>

              {/* Bespoke builds */}
              <div className="flex items-start gap-4">
                <img
                  src="/icons/white/target-arrow.svg"
                  alt="Disconnected stacks"
                  className="w-10 h-10 shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Bespoke builds
                  </h3>
                  <p className="text-white/80 text-base leading-relaxed mb-4">
                    automated and complex, but £500k+
                    <br />
                    upfront and expensive to change
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-3 text-gray-300">
                      <FiCheck className="text-white/80 w-5 h-5 shrink-0" />{" "}
                      Automated
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <FiCheck className="text-white/80 w-5 h-5 shrink-0" />{" "}
                      Complex logic
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <FiX className="text-white/80 w-5 h-5 shrink-0" /> £600k,
                      slow to change
                    </li>
                  </ul>
                </div>
              </div>

              {/* Disconnected stacks */}
              <div className="flex items-start gap-4">
                <img
                  src="/icons/white/module-simple.svg"
                  alt="Disconnected stacks"
                  className="w-10 h-10 shrink-0 mt-1"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Disconnected stacks
                  </h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    complex and configurable, but humans are
                    <br />
                    the glue; nothing is truly automated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
