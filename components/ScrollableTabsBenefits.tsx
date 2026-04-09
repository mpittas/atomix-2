"use client";

import { type ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import {
  FaArrowTrendUp,
  FaChartColumn,
  FaChartPie,
  FaCircleCheck,
  FaCoins,
  FaCopy,
  FaDoorOpen,
  FaEye,
  FaFileContract,
  FaGauge,
  FaKey,
  FaMoneyBill,
  FaNetworkWired,
  FaPaintbrush,
  FaPuzzlePiece,
  FaRobot,
  FaScaleBalanced,
  FaShieldHalved,
  FaSliders,
  FaTag,
  FaUnlock,
  FaWandMagicSparkles,
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
  visibility: <FaEye className="h-10 w-10" />,
  policy: <FaShieldHalved className="h-10 w-10" />,
  audit: <FaFileContract className="h-10 w-10" />,
  gateway: <FaDoorOpen className="h-10 w-10" />,
  granularity: <FaChartPie className="h-10 w-10" />,
  tokenisation: <FaUnlock className="h-10 w-10" />,
  automation: <FaRobot className="h-10 w-10" />,
  growth: <FaArrowTrendUp className="h-10 w-10" />,
  whitelabel: <FaPaintbrush className="h-10 w-10" />,
  nocode: <FaWandMagicSparkles className="h-10 w-10" />,
  api: <FaPuzzlePiece className="h-10 w-10" />,
  fees: <FaCoins className="h-10 w-10" />,
  access: <FaKey className="h-10 w-10" />,
  pricing: <FaTag className="h-10 w-10" />,
  dataOnce: <FaCopy className="h-10 w-10" />,
  decision: <FaCircleCheck className="h-10 w-10" />,
  status: <FaGauge className="h-10 w-10" />,
  workspace: <FaNetworkWired className="h-10 w-10" />,
  optimiser: <FaSliders className="h-10 w-10" />,
  analytics: <FaChartColumn className="h-10 w-10" />,
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
        icon: icons.visibility,
        title: "Live visibility into every loan",
        description:
          "Status, policy adherence and portfolio analytics on demand",
      },
      {
        icon: icons.policy,
        title:
          "Rules enforced automatically and every decision immutably on-chain",
        description: "Compliance instant, continuous and tamper-proof",
      },
      {
        icon: icons.audit,
        title:
          "Regulatory and third-party policy requirements enforced at every stage, including title insurance",
        description: "",
      },
      {
        icon: icons.gateway,
        title: "Aggregated lender gateway",
        description:
          "One integration connects institutional and private capital to multiple lenders, collapsing per-lender due diligence costs",
      },
      {
        icon: icons.granularity,
        title: "Granularity no longer penalised",
        description:
          "Automated reporting makes a diversified small-loan portfolio no more demanding than a concentrated one",
      },
      {
        icon: icons.tokenisation,
        title: "RWA tokenisation and tokenised liquidity pools",
        description:
          "Loans become tradeable digital assets, unlocking secondary markets and continuous capital flow",
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
        title: "Full workflow automation ",
        description:
          "Goal-driven reasoning finds the fastest compliant route; manual touchpoints by lender choice only",
      },
      {
        icon: icons.growth,
        title: "Scale volume without scaling headcount",
        description: "Pay-as-you-go, no fixed overhead",
      },
      {
        icon: icons.whitelabel,
        title: "White-label ready",
        description:
          "Fully configurable branding, workflows and lending rules adapted to any product or market without rebuilding the platform",
      },
      {
        icon: icons.nocode,
        title: "No-code, AI-assisted configuration",
        description:
          "Build, modify and deploy credit rules and products in natural language",
      },
      {
        icon: icons.api,
        title: "Modular, open API architecture",
        description:
          "AI where it adds value; connects to data providers,valuers and third-party systems",
      },
      {
        icon: icons.fees,
        title: "Fees scale with loan size",
        description:
          "Smaller, high-demand loans become profitable to originate",
      },
      {
        icon: icons.access,
        title:
          "Platform compliance and audit infrastructure unlocks access to institutional and private capital",
        description: "Replacing slow, costly due diligence",
      },
      {
        icon: icons.pricing,
        title: "Live competitive positioning and risk-adjusted pricing",
        description: "Driven by real market data",
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
        icon: icons.dataOnce,
        title: "Enter data once",
        description: "Shared across all lenders and parties throughout",
      },
      {
        icon: icons.decision,
        title: "Instant, consistent decisions",
        description: "Automated policy enforcement, no underwriter discretion",
      },
      {
        icon: icons.status,
        title: "Live loan status and next steps",
        description: "Transparent throughout, no chasing",
      },
      {
        icon: icons.workspace,
        title: "Unified workspace",
        description: "All parties connected in real time, no handoff delays",
      },
      {
        icon: icons.optimiser,
        title: "Loan optimiser",
        description:
          "Matched lenders, predicted rates and approval likelihood at a glance",
      },
      {
        icon: icons.analytics,
        title: "Portfolio analytics",
        description:
          "Track and optimise financing across an entire property portfolio",
      },
    ],
  },
];

export default function ScrollableTabsBenefits() {
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
        title="Benefits"
        description="Purpose-built lending infrastructure that reduces friction, accelerates decisions, and creates measurable advantages for capital providers, lenders, and borrowers alike."
        showBadge={false}
      />

      {/* Bottom Section - Tabs and IconBoxes */}
      <div
        ref={tabsSectionRef}
        className="flex flex-col w-full max-w-[1200px] px-8 bg-red-500/0"
        id="benefits-scroll-tabs"
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
              className={`grid ${tabIdx === 1 ? "grid-cols-4" : "grid-cols-3"} gap-3 w-full`}
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
