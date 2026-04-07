"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";
import SoftAurora from "@/components/backgrounds/SoftAurora";

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
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
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
        title: "Handle 100+ <br>touchpoints per loan",
        description: "Sit amet consectetur adipiscing elit",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Smaller loans are uneconomic",
        description: "Sit amet consectetur adipiscing elit",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Growth requires<br>hiring",
        description: "Sit amet consectetur adipiscing elit",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Fraud and misrepresentation are systemic risks",
        description: "Sit amet consectetur adipiscing elit",
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
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Lorem ipsum dolor",
        description:
          "Sit amet consectetur adipiscing elit sed do eiusmod tempor",
      },
    ],
  },
];

export default function ScrollableTabsv2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const iconBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const targetProgress = index / 3 + 1 / 6;
    const scrollToY = st.start + (st.end - st.start) * targetProgress;
    gsap.to(window, {
      scrollTo: { y: scrollToY },
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Set initial states - make tabs visible initially
      gsap.set(tabsSectionRef.current, { opacity: 1, y: 0 });

      // Set all icon box groups hidden initially except the first one
      iconBoxRefs.current.forEach((group, index) => {
        if (group) {
          if (index === 0) {
            gsap.set(group.children, { scale: 1, opacity: 1 });
          } else {
            gsap.set(group.children, { scale: 0, opacity: 0 });
          }
        }
      });

      // Create pinned scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=10px",
          end: () => `+=${window.innerHeight * 3 * 1.8}`, // Calculate based on window height
          pin: true,
          pinSpacing: true,
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

      // Normalize timeline to exactly 1.0 so positions = scroll progress
      tl.set({}, {}, 1);

      // Animate each tab's IconBox group independently
      tabsData.forEach((_, tabIdx) => {
        const group = iconBoxRefs.current[tabIdx];
        if (!group) return;

        const segStart = tabIdx / 3; // 0, 0.333, 0.666
        const segEnd = (tabIdx + 1) / 3;
        const inStart = tabIdx === 0 ? 0.04 : segStart + 0.02;
        const outStart = segEnd - 0.08;
        const isLastTab = tabIdx === tabsData.length - 1;

        // Animate in: staggered scale + opacity
        tl.to(
          group.children,
          {
            scale: 1,
            opacity: 1,
            stagger: 0.035,
            duration: 0.12,
            ease: "back.out(1.5)",
          },
          inStart,
        );

        // Animate out (skip for last tab)
        if (!isLastTab) {
          tl.to(
            group.children,
            {
              scale: 0,
              opacity: 0,
              stagger: -0.012,
              duration: 0.04,
              ease: "back.in(1.5)",
            },
            outStart,
          );
        }
      });

      scrollTriggerRef.current = tl.scrollTrigger!;

      // Refresh ScrollTrigger to ensure proper calculations with multiple pinned sections
      ScrollTrigger.refresh();

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center py-16 px-4 gap-y-16 relative z-[120]"
    >
      {/* Top - DefHeading */}
      <DefHeading
        theme="light"
        badgeText="The Market Reality"
        title="Market Problems in Bridging Loans"
        description="Property lending is manual, slow and opaque — at every level."
        showBadge={false}
      />

      {/* Bottom Section - Tabs and IconBoxes */}
      <div
        ref={tabsSectionRef}
        className="flex flex-col items-center w-full max-w-[1200px] px-8 bg-red-500/0"
        id="main-scoll-tabs"
      >
        {/* Tab Buttons */}
        <div className="flex gap-4 mb-6 w-full">
          {tabsData.map((tab, index) => (
            <div
              key={tab.title}
              onClick={() => handleTabClick(index)}
              className={`flex-1 flex flex-col gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 ${
                index === activeIndex
                  ? "bg-[#eaeff1] text-black"
                  : "bg-[#124652]"
              }`}
            >
              <h3
                className={`text-xl font-semibold text-center ${
                  index === activeIndex ? "text-[#0f1b1e]" : "text-white"
                }`}
              >
                {tab.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Section - Stacked IconBox groups for each tab */}
        <div className="relative w-full" style={{ minHeight: 200 }}>
          {tabsData.map((tab, tabIdx) => (
            <div
              key={tab.title}
              ref={(el) => {
                iconBoxRefs.current[tabIdx] = el;
              }}
              className="grid grid-cols-4 gap-3 w-full"
              style={{
                position: tabIdx === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                right: 0,
                pointerEvents: tabIdx === activeIndex ? "auto" : "none",
              }}
            >
              {tab.iconBoxes.map((iconBox, index) => (
                <IconBox
                  key={`${tabIdx}-${index}`}
                  src={iconBox.src}
                  title={iconBox.title}
                  description={iconBox.description}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
