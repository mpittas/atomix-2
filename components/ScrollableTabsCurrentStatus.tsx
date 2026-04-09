"use client";

import { type ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import {
  FaUserCheck,
  FaBolt,
  FaSliders,
  FaListCheck,
  FaFileSignature,
  FaShieldHalved,
  FaTriangleExclamation,
  FaMoneyBillTransfer,
  FaCalculator,
  FaLink,
  FaEye,
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
  selfServe: <FaUserCheck className="h-10 w-10" />,
  autoEligibility: <FaBolt className="h-10 w-10" />,
  configurable: <FaSliders className="h-10 w-10" />,
  managed: <FaListCheck className="h-10 w-10" />,
  signature: <FaFileSignature className="h-10 w-10" />,
  insurance: <FaShieldHalved className="h-10 w-10" />,
  breach: <FaTriangleExclamation className="h-10 w-10" />,
  distributions: <FaMoneyBillTransfer className="h-10 w-10" />,
  quotes: <FaCalculator className="h-10 w-10" />,
  blockchain: <FaLink className="h-10 w-10" />,
  visibility: <FaEye className="h-10 w-10" />,
};

const tabsData: TabData[] = [
  {
    title: "Loan origination",
    items: [
      "Invest with full transparency",
      "Automated compliance checks",
      "Diversified lending opportunities",
      "Real-time portfolio tracking",
    ],
    iconBoxes: [
      {
        icon: icons.selfServe,
        title: "Borrower journey entirely self-served",
        description:
          "Data entered once at source, structured workflow guides every step from application to drawdown",
      },
      {
        icon: icons.autoEligibility,
        title: "Automated eligibility checking in real time",
        description:
          "Survey data, property criteria and underwriting rules assessed instantly, pre-approved offer calculated without manual intervention",
      },
      {
        icon: icons.configurable,
        title: "Fully configurable by the originator",
        description:
          "Branding, lending rules, eligibility criteria and workflows defined without developer involvement",
      },
    ],
  },
  {
    title: "Lawyer workflow",
    items: [
      "Automate lending workflows",
      "Access capital faster",
      "Scale without adding headcount",
      "Reduce manual touchpoints",
    ],
    iconBoxes: [
      {
        icon: icons.managed,
        title: "Fully managed on-platform",
        description:
          "Instructions, checklists, document signing and pre-drawdown conditions coordinated automatically, no manual chasing",
      },
      {
        icon: icons.signature,
        title: "Integrated e-signature",
        description:
          "Facility agreements and board resolutions signed and witnessed digitally, no printing or posting required",
      },
      {
        icon: icons.insurance,
        title: "Insurance and title requirements governed by the platform",
        description:
          "Minimising unnecessary searches and reducing due diligence time",
      },
    ],
  },
  {
    title: "Loan management",
    items: [
      "Faster loan approvals",
      "Transparent process tracking",
      "Reduced documentation burden",
      "Better rate accessibility",
    ],
    iconBoxes: [
      {
        icon: icons.breach,
        title: "Breach and default detection automated",
        description:
          "Missed payments flagged instantly, all stakeholders notified in real time without manual intervention",
      },
      {
        icon: icons.distributions,
        title:
          "Payment distributions defined once by the originator and executed automatically ",
        description:
          "Capital providers see exactly what they are owed, when calculated and when paid",
      },
      {
        icon: icons.quotes,
        title: "Borrowers self-serve redemption quotes at any time",
        description:
          "Full breakdown of outstanding principal, accrued interest and charges, configurable to the originator's terms",
      },
      {
        icon: icons.blockchain,
        title:
          "Every payment, charge, distribution and action recorded on blockchain throughout the loan lifecycle",
        description:
          "immutable, independently verifiable from drawdown to closure",
      },
    ],
  },
  {
    title: "Capital provider dashboards",
    items: [
      "Real-time portfolio visibility",
      "Automated compliance reporting",
      "Performance analytics",
      "Risk monitoring",
    ],
    iconBoxes: [
      {
        icon: icons.visibility,
        title: "Real-time visibility across all funded loans",
        description:
          "every activity recorded on blockchain, accessible to private and institutional investors alike",
      },
    ],
  },
];

export default function ScrollableTabsCurrentStatus() {
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
        title="Current status"
        description="Atomix is live and building — two product launches confirmed for 2026: cash home-buyer MVP
(Q2) and auction finance MVP (Q3). Both products include the following modules:"
        showBadge={false}
      />

      {/* Bottom Section - Tabs and IconBoxes */}
      <div
        ref={tabsSectionRef}
        className="flex flex-col w-full max-w-[1200px] px-8 bg-red-500/0"
        id="current-status-scroll-tabs"
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
