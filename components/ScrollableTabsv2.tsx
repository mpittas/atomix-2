"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const iconBoxesRef = useRef<HTMLDivElement>(null);
  const tabsSectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedIn = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHeadingComplete = useCallback(() => {
    if (!tabsSectionRef.current) return;
    gsap.fromTo(
      tabsSectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    );

    hasAnimatedIn.current = true;
    if (iconBoxesRef.current) {
      gsap.fromTo(
        iconBoxesRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          stagger: 0.2,
          delay: 0.3,
          ease: "back.out(1.5)",
        },
      );
    }
  }, []);

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
      if (!sectionRef.current || !wrapperRef.current) return;

      // Create pinned scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top+=10px",
          end: `bottom top+=10px`,
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
    if (activeIndex === 0 && !hasAnimatedIn.current) return;

    const boxes = iconBoxesRef.current.children;
    gsap.fromTo(
      boxes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        stagger: 0.15,
        ease: "back.out(1.5)",
      },
    );
  }, [activeIndex]);

  useEffect(() => {
    if (!iconBoxesRef.current) return;
    gsap.set(iconBoxesRef.current.children, { scale: 0, opacity: 0 });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative px-18 py-36 rounded-3xl bg-linear-to-b from-[#0B4858] to-[#81A6AF] relative overflow-hidden h-[calc(100vh-20px)]"
    >
      <div className="absolute -top-0 left-0 w-full h-[500px]">
        <SoftAurora
          speed={1.3}
          scale={1.2}
          brightness={0.65}
          color1="#78cfe3"
          color2="#87b9d4"
          noiseFrequency={1}
          noiseAmplitude={3.5}
          bandHeight={0.85}
          bandSpread={1}
          octaveDecay={0.12}
          layerOffset={0.5}
          colorSpeed={1}
          enableMouseInteraction={false}
          mouseInfluence={0.2}
        />
      </div>
      <div
        ref={wrapperRef}
        className=" flex flex-col items-center py-16 px-4 gap-y-24"
      >
        {/* Top - DefHeading */}
        <DefHeading
          theme="light"
          badgeText="The Market Reality"
          title="Market Problems in Bridging Loans"
          description="Opaque systems limit control, visibility and trust across capital providers, lenders and borrowers."
          onAnimationComplete={handleHeadingComplete}
        />

        {/* Bottom Section - Tabs and IconBoxes */}
        <div
          ref={tabsSectionRef}
          className="flex flex-col items-center w-full max-w-6xl"
          id="main-scoll-tabs"
          style={{ opacity: 0 }}
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
