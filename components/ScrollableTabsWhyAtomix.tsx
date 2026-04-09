"use client";

import { type ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import {
  FaEye,
  FaFileCircleCheck,
  FaBuilding,
  FaUnlock,
  FaChartPie,
  FaRobot,
  FaCoins,
  FaDoorOpen,
  FaBolt,
  FaGaugeHigh,
  FaCircleCheck,
  FaPaste,
  FaBullseye,
  FaSignal,
  FaRocket,
  FaShieldHalved,
  FaLock,
  FaMagnifyingGlassDollar,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import DefHeading from "@/components/typo/DefHeading";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface TabData {
  title: string;
  items: string[];
  iconBoxes: {
    src?: string;
    icon?: ReactNode;
    title: string;
    description: string;
  }[];
}

const icons = {
  trust: <FaEye className="h-10 w-10" />,
  security: <FaLock className="h-10 w-10" />,
  compliance: <FaShieldHalved className="h-10 w-10" />,
  dueDiligence: <FaMagnifyingGlassDollar className="h-10 w-10" />,
  architecture: <FaBuilding className="h-10 w-10" />,
  liquidity: <FaUnlock className="h-10 w-10" />,
  granularity: <FaChartPie className="h-10 w-10" />,
  automation: <FaRobot className="h-10 w-10" />,
  profitable: <FaCoins className="h-10 w-10" />,
  capitalAccess: <FaDoorOpen className="h-10 w-10" />,
  speed: <FaBolt className="h-10 w-10" />,
  performance: <FaGaugeHigh className="h-10 w-10" />,
  decisioning: <FaCircleCheck className="h-10 w-10" />,
  unified: <FaPaste className="h-10 w-10" />,
  certainty: <FaBullseye className="h-10 w-10" />,
  liveStatus: <FaSignal className="h-10 w-10" />,
  fastProcess: <FaRocket className="h-10 w-10" />,
  growth: <FaMoneyBillTrendUp className="h-10 w-10" />,
};

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
        icon: icons.trust,
        title: "Blind trust replaced",
        description:
          "Automated policy enforcement means capital is deployed exactly as intended, every time",
      },
      {
        icon: icons.security,
        title: "Fraud eliminated at source",
        description:
          "Immutable on-chain audit makes rule-breaking impossible to hide",
      },
      {
        icon: icons.dueDiligence,
        title: "Due diligence costs slashed",
        description:
          "Continuous automated compliance replaces manual audits and self-certification",
      },
      {
        icon: icons.architecture,
        title: "Bolt-on compliance controls replaced by architecture",
        description:
          "The platform's native design makes costly post-hoc controls redundant",
      },
      {
        icon: icons.liquidity,
        title: "Liquidity unlocked",
        description:
          "RWA tokenisation turns static loan positions into tradeable digital assets",
      },
      {
        icon: icons.granularity,
        title: "Granularity penalty eliminated",
        description:
          "A diversified portfolio of smaller loans is no more demanding to monitor than a concentrated one",
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
        icon: icons.automation,
        title: "Underwriter bottleneck broken",
        description:
          "Goal-driven workflow automation processes loans at scale; human touchpoints only where chosen",
      },
      {
        icon: icons.profitable,
        title: "Smaller loans profitable",
        description:
          "Usage-based fees scale with loan size, no fixed processing floor",
      },
      {
        icon: icons.capitalAccess,
        title: "Capital access opened",
        description:
          "Platform compliance and audit infrastructure attracts institutional and private investors directly",
      },
      {
        icon: icons.speed,
        title: "Rule changes in minutes ",
        description:
          "No-code configuration means no developer dependency, no delays, no operational risk",
      },
      {
        icon: icons.performance,
        title: "Faster completion cuts funding costs directly",
        description:
          "Every day removed from the cycle reduces the cost of capital per loan",
      },
      {
        icon: icons.decisioning,
        title: "Earlier automated decisioning reduces abort rates",
        description:
          "Costs no longer absorbed across completed loans, improving per-loan economics across the book",
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
        icon: icons.unified,
        title: "One application, every lender",
        description:
          "Data entered once, used across the entire journey via unified workspace",
      },
      {
        icon: icons.certainty,
        title: "Certainty from the start",
        description:
          "Instant indicative offer refined automatically as more information is provided",
      },
      {
        icon: icons.liveStatus,
        title: "Live loan status throughout",
        description:
          "Consistent outcomes, no chasing, no dependence on underwriter discretion",
      },
      {
        icon: icons.fastProcess,
        title: "Faster process",
        description:
          "Underwriting instant; legal and valuation steps coordinated within the platform, not left to fragment",
      },
    ],
  },
];

export default function ScrollableTabsWhyAtomix() {
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
      if (!sectionRef.current) return;

      // Set initial states - make tabs visible initially
      gsap.set(tabsSectionRef.current, { opacity: 1, y: 0 });

      // Set all icon box groups hidden initially — all animate in via scroll timeline
      iconBoxRefs.current.forEach((group) => {
        if (group) {
          gsap.set(group.children, { scale: 0.8, opacity: 0, y: 30 });
        }
      });

      // Create pinned scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=10000",
          pin: true,
          pinSpacing: true,
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
      className="flex flex-col items-center px-4 gap-y-16 relative z-[120]"
    >
      {/* Top - DefHeading */}
      <DefHeading
        theme="light"
        badgeText=""
        title="Why Atomix"
        description="The platform was built to solve specific, structural problems. These are the results."
        showBadge={false}
      />

      {/* Bottom Section - Tabs and IconBoxes */}
      <div
        ref={tabsSectionRef}
        className="flex flex-col w-full max-w-[1200px] px-8 bg-red-500/0"
        id="why-atomix-scroll-tabs"
      >
        {/* Tab Buttons - Horizontal */}
        <div className="flex gap-4 w-full">
          {tabsData.map((tab, index) => (
            <div
              key={tab.title}
              onClick={() => handleTabClick(index)}
              className={`relative flex-1 flex flex-col gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 overflow-hidden ${
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
        <div className="relative mt-8" style={{ minHeight: 200 }}>
          {tabsData.map((tab, tabIdx) => (
            <div
              key={tab.title}
              ref={(el) => {
                iconBoxRefs.current[tabIdx] = el;
              }}
              className="grid grid-cols-3 gap-3 w-full "
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
                    icon={iconBox.icon}
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
  );
}
