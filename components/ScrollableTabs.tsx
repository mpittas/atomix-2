"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface TabData {
  title: string;
  items: string[];
  iconBoxes: {
    src: string;
    title: string;
    description: string;
  }[];
}

const tabsData: TabData[] = [
  {
    title: "Capital Providers",
    items: [
      "Invest with full transparency",
      "Automated compliance checks",
      "Diversified lending opportunities",
      "Real-time portfolio tracking",
    ],
    iconBoxes: [
      {
        src: "/icons/white/money-coins-white.svg",
        title: "High Fixed Fees",
        description: "Make smaller, most in-demand loans economic",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Slow Process",
        description: ">35-day completions",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Repeat Data Entry",
        description: "Enter same data for each lender application",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Opaque",
        description: "Process lacks transparency, and consistency",
      },
    ],
  },
  {
    title: "Lenders",
    items: [
      "Automate lending workflows",
      "Access capital faster",
      "Scale without adding headcount",
      "Reduce manual touchpoints",
    ],
    iconBoxes: [
      {
        src: "/icons/white/money-coins-white.svg",
        title: "High Fixed Fees 2",
        description: "Make smaller, most in-demand loans economic",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Slow Process 2",
        description: ">35-day completions",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Repeat Data Entry 2",
        description: "Enter same data for each lender application",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Opaque 2",
        description: "Process lacks transparency, and consistency",
      },
    ],
  },
  {
    title: "Borrowers",
    items: [
      "Faster loan approvals",
      "Transparent process tracking",
      "Reduced documentation burden",
      "Better rate accessibility",
    ],
    iconBoxes: [
      {
        src: "/icons/white/money-coins-white.svg",
        title: "High Fixed Fees 3",
        description: "Make smaller, most in-demand loans economic",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Slow Process 3",
        description: ">35-day completions",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Repeat Data Entry 3",
        description: "Enter same data for each lender application",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Opaque 3",
        description: "Process lacks transparency, and consistency",
      },
    ],
  },
];

export default function ScrollableTabs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const iconBoxesRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const targetProgress = index / 3 + 1 / 6;
    const scrollToY = st.start + (st.end - st.start) * targetProgress;
    gsap.to(window, {
      scrollTo: { y: scrollToY },
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !wrapperRef.current) return;

      // Create pinned scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 0.8}`,
          pin: wrapperRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            let newIndex = 0;
            if (progress < 0.33) {
              newIndex = 0;
            } else if (progress < 0.66) {
              newIndex = 1;
            } else {
              newIndex = 2;
            }
            setActiveIndex(newIndex);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger!;

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  const currentTab = tabsData[activeIndex];

  useEffect(() => {
    if (!iconBoxesRef.current) return;

    const boxes = iconBoxesRef.current.children;
    gsap.fromTo(
      boxes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.3)",
      },
    );
  }, [activeIndex]);

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={wrapperRef}
        className="h-screen flex flex-col items-center justify-between py-16 px-4"
      >
        {/* Top - DefHeading */}
        <DefHeading
          theme="light"
          badgeText="The Market Reality"
          title="Market Problems in Bridging Loans"
          description="Opaque systems limit control, visibility and trust across capital providers, lenders and borrowers."
        />

        {/* Bottom Section - Tabs and IconBoxes */}
        <div className="flex flex-col items-center w-full max-w-6xl">
          {/* Tab Buttons */}
          <div className="flex gap-3 mb-6 w-full">
            {tabsData.map((tab, index) => (
              <div
                key={tab.title}
                onClick={() => handleTabClick(index)}
                className={`flex-1 flex flex-col gap-4 p-8 rounded-2xl transition-all duration-500 cursor-pointer ${
                  index === activeIndex
                    ? "bg-[#eaeff1] text-black"
                    : "bg-white/15 opacity-60"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold text-left ${
                    index === activeIndex ? "text-[#0f1b1e]" : "text-white"
                  }`}
                >
                  {tab.title}
                </h3>
                <ul className="flex flex-col gap-1">
                  {tab.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`text-md ${
                        index === activeIndex
                          ? "text-[#0f1b1e]/80"
                          : "text-white/50"
                      }`}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section - 4 IconBoxes */}
          <div
            ref={iconBoxesRef}
            className="grid grid-cols-4 gap-3 w-full max-w-6xl"
          >
            {currentTab.iconBoxes.map((iconBox, index) => (
              <IconBox
                key={`${activeIndex}-${index}`}
                src={iconBox.src}
                title={iconBox.title}
                description={iconBox.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
