"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export interface ScrollableTabsSectionTabData {
  title: string;
  items: string[];
  iconBoxes: {
    src: string;
    title: string;
    description: string;
  }[];
}

const missionTabsData: ScrollableTabsSectionTabData[] = [
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
        title: "Replace blind trust with real-time visibility",
        description:
          "Live loan status, policy adherence and portfolio analytics on demand",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Every rule enforced automatically",
        description:
          "Capital deployed exactly as intended, no self-certification required",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Every loan auditable",
        description:
          "Decisions immutably recorded on-chain; compliance instant and continuous",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Single integration, multiple lenders",
        description:
          "Institutional and private capital connected with  lower barriers and lower due diligence costs",
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
        title: "Significantly reduce manual touchpoints",
        description:
          "End-to-end workflow automation; underwriter intervention only by lender choice",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Access funding at any scale",
        description:
          "Platform handles compliance, auditing and capital provider access, attracting both institutional and private investors",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Smaller loans become economical",
        description:
          "Fees scale with loan size, making sub-£300k bridging viable to originate",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Scale volume without scaling headcount",
        description: "Pay-as-you-go, no fixed technology overhead",
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
        title: "Enter data once",
        description:
          "Shared across all lenders and parties for the full loan journey",
      },
      {
        src: "/icons/white/clock-white.svg",
        title: "Track progress in real time",
        description:
          "Live loan status, transparent next steps, no chasing required",
      },
      {
        src: "/icons/white/arrows-white.svg",
        title: "Instant, consistent underwriting process",
        description:
          "All parties connected in a unified workspace, no handoff delays",
      },
      {
        src: "/icons/white/eye-white-crossed.svg",
        title: "Always know your status and next steps",
        description:
          "Donsistent outcomes, no dependence on underwriter discretion",
      },
    ],
  },
];

interface ScrollableTabsSectionProps {
  title?: string;
  sectionId?: string;
  description?: string;
  badgeText?: string;
  tabsData?: ScrollableTabsSectionTabData[];
}

export function ScrollableTabsSection({
  title = "Mission",
  sectionId = "mission",
  description = "Fix UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild.",
  badgeText = "The Market Reality",
  tabsData = missionTabsData,
}: ScrollableTabsSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const iconBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const segSize = 1 / tabsData.length;
    const segStart = index * segSize;
    const inStart = index === 0 ? 0.04 : segStart + 0.02;
    const animationComplete = inStart + 0.12 + 0.035 * 3;
    const targetProgress = animationComplete;
    const scrollToY = st.start + (st.end - st.start) * targetProgress;
    const progressDelta = Math.abs(st.progress - targetProgress);
    const scrollDuration = gsap.utils.clamp(
      1.8,
      3.2,
      1.8 + progressDelta * 2.0,
    );
    gsap.to(window, {
      scrollTo: { y: scrollToY },
      duration: scrollDuration,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  useGSAP(
    () => {
      if (!wrapperRef.current || !contentRef.current || !sectionRef.current)
        return;

      gsap.set(contentRef.current, { autoAlpha: 0, y: 80 });
      gsap.set(tabsSectionRef.current, { opacity: 1, y: 0 });
      setActiveIndex(0);

      iconBoxRefs.current.forEach((group) => {
        if (group) {
          gsap.set(group.children, { scale: 0.8, opacity: 0, y: 30 });
        }
      });

      const pinTrigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "bottom bottom",
        end: "+=10000",
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      });

      const contentTween = gsap.to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "bottom bottom",
          end: "+=1500",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "bottom bottom",
          end: "+=10000",
          pin: false,
          pinSpacing: false,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              tabsData.length - 1,
              Math.floor(self.progress * tabsData.length),
            );
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

        const segSize = 1 / tabsData.length;
        const segStart = tabIdx * segSize;
        const segEnd = (tabIdx + 1) * segSize;
        const inStart = tabIdx === 0 ? 0.04 : segStart + 0.02;
        const outStart = segEnd - 0.08;
        const isLastTab = tabIdx === tabsData.length - 1;

        // Animate in: individually placed cards spread across the segment
        const cardCount = group.children.length;
        const availableRange = outStart - inStart - 0.02;
        const cardSpacing = availableRange / cardCount;
        Array.from(group.children).forEach((child, i) => {
          tl.to(
            child,
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: cardSpacing * 1.2,
              ease: "power2.out",
            },
            inStart + i * cardSpacing,
          );
        });

        // Animate out (skip for last tab)
        if (!isLastTab) {
          tl.to(
            group.children,
            {
              scale: 0.8,
              opacity: 0,
              y: -20,
              stagger: -0.012,
              duration: 0.06,
              ease: "power2.in",
            },
            outStart,
          );
        }
      });

      scrollTriggerRef.current = tl.scrollTrigger!;

      return () => {
        contentTween.scrollTrigger?.kill();
        contentTween.kill();
        pinTrigger.kill();
        tl.kill();
      };
    },
    { scope: wrapperRef, dependencies: [sectionId, tabsData] },
  );

  return (
    <div
      ref={wrapperRef}
      className="bg-white px-3 mb-6 py-3"
      id={`${sectionId}-wrapper`}
    >
      <div className="flex flex-col h-[calc(100vh-120px)] bg-[#004054]/100 rounded-3xl overflow-hidden relative items-center justify-center">
        <div
          ref={contentRef}
          id={`${sectionId}-content`}
          style={{ visibility: "hidden" }}
        >
          <div
            ref={sectionRef}
            className="flex flex-col items-center py-16 px-4 gap-y-16 relative z-[120]"
          >
            {/* Top - DefHeading */}
            <DefHeading
              theme="light"
              badgeText={badgeText}
              title={title}
              description={description}
              showBadge={false}
            />

            {/* Bottom Section - Tabs and IconBoxes */}
            <div
              ref={tabsSectionRef}
              className="flex flex-col items-center w-full max-w-[1200px] px-8 bg-red-500/0 gap-8"
              id={`${sectionId}-main-scoll-tabs`}
            >
              {/* Tab Buttons - Horizontal */}
              <div className="flex flex-row gap-3 w-full justify-center">
                {tabsData.map((tab, index) => (
                  <div
                    key={tab.title}
                    onClick={() => handleTabClick(index)}
                    className={`relative flex flex-col gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 overflow-hidden flex-1  ${
                      index === activeIndex
                        ? "bg-[#eaeff1] text-black"
                        : "bg-[#124652]"
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
                      <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
                    </div>
                    <h3
                      className={`text-lg font-semibold text-center relative z-10 ${
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
                    className="grid grid-cols-4 gap-3 w-full "
                    style={{
                      position: tabIdx === 0 ? "relative" : "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      pointerEvents: tabIdx === activeIndex ? "auto" : "none",
                    }}
                  >
                    {tab.iconBoxes.map((iconBox, index) => (
                      <div key={`${tabIdx}-${index}`} className="relative">
                        <IconBox
                          src={iconBox.src}
                          title={iconBox.title}
                          description={iconBox.description}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScrollableTabsMission() {
  return <ScrollableTabsSection />;
}
