"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import IconBoxHorizontal from "./IconBoxHorizontal";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function BenefitsLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const tabs = ["Capital Providers", "Lenders", "Borrowers"];

  const handleTabClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) {
      setActiveIndex(index);
      return;
    }

    const maxStep = Math.max(tabs.length - 1, 1);
    const targetProgress = index / maxStep;
    const scrollToY = st.start + (st.end - st.start) * targetProgress;

    gsap.to(window, {
      scrollTo: { y: scrollToY },
      duration: 0.45,
      ease: "power2.inOut",
    });
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !wrapperRef.current) return;

      const maxStep = Math.max(tabs.length - 1, 1);

      const st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "center center",
        end: () => `+=${window.innerHeight * maxStep * 0.9}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            tabs.length - 1,
            Math.round(self.progress * maxStep),
          );
          setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        scrollTriggerRef.current = null;
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!panelRef.current) return;

      const items = panelRef.current.querySelectorAll(".benefit-animate-item");
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
      );

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.13,
          delay: 0.1,
          ease: "power3.out",
        },
      );
    },
    { scope: panelRef, dependencies: [activeIndex], revertOnUpdate: true },
  );

  return (
    <div ref={sectionRef} className="relative w-full">
      <div ref={wrapperRef} className="bg-red-500/0 flex flex-col gap-y-8">
        <div className="flex gap-4 w-full">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabClick(index)}
              className={`flex-1 flex flex-col gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 ${
                index === activeIndex
                  ? "bg-[#eaeff1] text-black"
                  : "bg-[#124652]"
              }`}
              type="button"
            >
              <h3
                className={`text-xl font-semibold text-center ${
                  index === activeIndex ? "text-[#0f1b1e]" : "text-white"
                }`}
              >
                {tab}
              </h3>
            </button>
          ))}
        </div>

        <div ref={panelRef} className="mt-8 md:mt-10">
          {activeIndex === 0 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="bg-green-500/0 benefit-animate-item">
                <div className="relative w-full pr-8 pb-8 bg-red-500/0">
                  <div className="benefit-animate-item">
                    <Image
                      src="/images/dashboard-cp-main.svg"
                      alt=""
                      width={600}
                      height={400}
                      className="object-contain rounded-lg w-full h-auto"
                    />
                  </div>

                  <div className="absolute bottom-0 right-0 w-50 bg-blue-500/0 min-h-20 flex flex-col gap-2">
                    <Image
                      src="/images/dashboard-cp-1.svg"
                      alt=""
                      width={200}
                      height={100}
                      className="object-contain rounded-lg w-full h-auto benefit-animate-item"
                    />

                    <Image
                      src="/images/dashboard-cp-2.svg"
                      alt=""
                      width={200}
                      height={100}
                      className="object-contain rounded-lg w-full h-auto benefit-animate-item"
                    />

                    <Image
                      src="/images/dashboard-cp-3.svg"
                      alt=""
                      width={200}
                      height={100}
                      className="object-contain rounded-lg w-full h-auto benefit-animate-item"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/0">
                <h2 className="text-3xl font-bold mb-4 text-white benefit-animate-item">
                  Capital Providers
                </h2>
                <div className="text-lg text-white/80 mb-8 benefit-animate-item">
                  Invest with full transparency, automated compliance, and
                  access to diversified lending opportunities.
                </div>
                <div className="flex flex-col gap-y-6">
                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Continuous compliance assuranceless
                        </span>{" "}
                        variance, easier audits
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/target-arrow.svg">
                      <div className="max-w-[340px]">
                        <span className="font-semibold">
                          Deploy capital exactly as intended <br></br>
                        </span>{" "}
                        with lower risk and lower upfront costs
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/module-simple.svg">
                      <div className="max-w-[340px]">
                        <span className="font-semibold">
                          One platform, many lenders<br></br>
                        </span>{" "}
                        removes barriers for all investor types
                      </div>
                    </IconBoxHorizontal>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 1 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="bg-green-500/0 order-1 benefit-animate-item">
                <div className="relative w-full pr-8 pb-8 bg-red-500/0">
                  <div className="relative">
                    <div className="benefit-animate-item">
                      <Image
                        src="/images/dashboard-lenders-main.svg"
                        alt=""
                        width={600}
                        height={400}
                        className="object-contain rounded-lg w-full h-auto"
                      />
                    </div>

                    <Image
                      src="/images/dashboard-lenders-small.svg"
                      alt=""
                      width={360}
                      height={200}
                      className="object-cover rounded-lg absolute -bottom-4 left-1/2 -translate-x-1/2 benefit-animate-item"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/0">
                <h2 className="text-3xl font-bold mb-4 text-white benefit-animate-item">
                  Lenders
                </h2>
                <div className="text-lg text-white/80 mb-8 benefit-animate-item">
                  Automate lending workflows, access capital faster, and scale
                  operations without increasing headcount.
                </div>
                <div className="flex flex-col gap-y-6">
                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/shield-check-white.svg">
                      <div className="max-w-[500px]">
                        <span className="font-semibold text-white">
                          Access funding at any scale <br></br>
                        </span>{" "}
                        platform handles compliance, auditing and access,
                        attracting both institutional and private investors
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/user-minus.svg">
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Scale business without scaling workforce <br></br>
                        </span>{" "}
                        grow volume without hiring
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/scales.svg">
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Costs scale with loan size <br></br>
                        </span>{" "}
                        making smaller in-demand loans profitable
                      </div>
                    </IconBoxHorizontal>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 2 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="bg-green-500/0 benefit-animate-item">
                <div className="relative w-full pr-8 pb-8 bg-red-500/0">
                  <div className="relative">
                    <div className="benefit-animate-item">
                      <Image
                        src="/images/dashboard-partner-main.svg"
                        alt=""
                        width={600}
                        height={400}
                        className="object-contain rounded-lg w-full h-auto"
                      />
                    </div>

                    <Image
                      src="/images/dashboard-partner-small.svg"
                      alt=""
                      width={200}
                      height={100}
                      className="object-contain absolute bottom-0 right-0 h-auto benefit-animate-item"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/0">
                <h2 className="text-3xl font-bold mb-4 text-white benefit-animate-item">
                  Borrowers
                </h2>
                <div className="text-lg text-white/80 mb-8 benefit-animate-item">
                  Borrowers move from enquiry to drawdown in a structured,
                  transparent journey.
                </div>
                <div className="flex flex-col gap-y-6">
                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/electricity-simple.svg">
                      <div className="max-w-[400px]">
                        <span className="font-semibold text-white">
                          Receive instant offer <br></br>
                        </span>{" "}
                        that improves as you add more details
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/rocket-simple.svg">
                      <div className="max-w-[340px]">
                        <span className="font-semibold text-white">
                          Complete in &lt; 2 days<br></br>
                        </span>{" "}
                        meet deadlines, seize opportunities
                      </div>
                    </IconBoxHorizontal>
                  </div>

                  <div className="benefit-animate-item">
                    <IconBoxHorizontal src="/icons/white/path-arrows.svg">
                      <div className="max-w-[440px]">
                        <span className="font-semibold text-white">
                          Always know your status and next steps<br></br>
                        </span>{" "}
                        no chasing, no guessing, consistent outcomes
                      </div>
                    </IconBoxHorizontal>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
