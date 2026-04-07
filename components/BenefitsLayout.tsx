"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import IconBoxHorizontal from "./IconBoxHorizontal";
import DefHeading from "./typo/DefHeading";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function BenefitsLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
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

      // Set initial states for all panels
      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        gsap.set(panel, { autoAlpha: 0, y: 36 });
        const items = panel.querySelectorAll(".benefit-animate-item");
        gsap.set(items, { autoAlpha: 0, y: 28 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "center center",
          end: () => `+=${window.innerHeight * maxStep * 4}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            let nextIndex = 0;
            if (p >= 2 / 3) nextIndex = 2;
            else if (p >= 1 / 3) nextIndex = 1;
            setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger!;

      // Normalize timeline to exactly 1.0 so positions = scroll progress
      tl.set({}, {}, 1);

      // Each tab gets ~0.333 of the timeline.
      // Within each segment:
      //   0%–50%  → content reveals (items stagger in)
      //   50%–85% → hold (fully visible)
      //   85%–100% → quick fade out & switch
      tabs.forEach((_, tabIdx) => {
        const panel = panelRefs.current[tabIdx];
        if (!panel) return;

        const items = panel.querySelectorAll(".benefit-animate-item");
        const segSize = 1 / tabs.length;
        const segStart = tabIdx * segSize;
        const segEnd = (tabIdx + 1) * segSize;
        const isLastTab = tabIdx === tabs.length - 1;

        // Content reveal occupies first 50% of segment
        const revealStart = tabIdx === 0 ? 0.01 : segStart + 0.005;
        const revealDur = segSize * 0.5;

        // Panel fade in
        tl.to(
          panel,
          {
            autoAlpha: 1,
            y: 0,
            duration: revealDur * 0.15,
            ease: "power3.out",
          },
          revealStart,
        );

        // Items stagger in across the reveal zone
        tl.to(
          items,
          {
            autoAlpha: 1,
            y: 0,
            stagger: revealDur * 0.08,
            duration: revealDur * 0.12,
            ease: "power3.out",
          },
          revealStart + revealDur * 0.1,
        );

        // Quick transition out (skip for last tab)
        if (!isLastTab) {
          const outStart = segEnd - segSize * 0.05;
          tl.to(
            items,
            {
              autoAlpha: 0,
              y: -20,
              stagger: -0.004,
              duration: segSize * 0.03,
              ease: "power2.in",
            },
            outStart,
          );
          tl.to(
            panel,
            {
              autoAlpha: 0,
              y: -36,
              duration: segSize * 0.03,
              ease: "power2.in",
            },
            outStart + 0.005,
          );
        }
      });

      return () => {
        scrollTriggerRef.current = null;
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="relative w-full">
      <div ref={wrapperRef} className="bg-red-500/0 flex flex-col gap-y-8">
        <div className="max-w-[1060px] mx-auto">
          <DefHeading
            theme="light"
            badgeText=""
            showBadge={false}
            title="Benefits"
            description="Purpose-built lending infrastructure that reduces friction, accelerates decisions, and creates measurable advantages for capital providers, lenders, and borrowers alike."
          />
        </div>

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

        <div className="relative mt-8 md:mt-10">
          {/* Panel 0: Capital Providers */}
          <div
            ref={(el) => {
              panelRefs.current[0] = el;
            }}
            style={{ visibility: "hidden" }}
          >
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
          </div>

          {/* Panel 1: Lenders */}
          <div
            ref={(el) => {
              panelRefs.current[1] = el;
            }}
            className="absolute top-0 left-0 right-0"
            style={{ visibility: "hidden" }}
          >
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
          </div>

          {/* Panel 2: Borrowers */}
          <div
            ref={(el) => {
              panelRefs.current[2] = el;
            }}
            className="absolute top-0 left-0 right-0"
            style={{ visibility: "hidden" }}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
}
