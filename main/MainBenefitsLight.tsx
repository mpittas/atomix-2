"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button as DefButton } from "@/components/ui";
import DefHeading from "@/components/typo/DefHeading";
import { FiCheck } from "react-icons/fi";
import { IoShieldCheckmark } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const TAB_ANIMATION = {
  buttonDuration: 0.75,
  buttonStagger: 0.1,
  contentDuration: 1.4,
  contentStagger: 0.22,
  buttonEase: "power1.out",
  contentEase: "power2.out",
};

interface TabItem {
  icon: string;
  text: string;
}

interface TabData {
  title: string;
  description: string;
  mainImage: string;
  smallImages?: string[];
  smallImage?: string;
  items: TabItem[];
}

const tabsData: TabData[] = [
  {
    title: "Capital Providers",
    description:
      "Invest with full transparency, automated compliance, and access to diversified lending opportunities.",
    mainImage: "/images/dashboard-cp-main.svg",
    smallImages: [
      "/images/dashboard-cp-1.svg",
      "/images/dashboard-cp-2.svg",
      "/images/dashboard-cp-3.svg",
    ],
    smallImage: undefined as string | undefined,
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Blind trust replaced — with real-time transparency and verifiable audit trails",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Fraud eliminated at source — by design, not as an afterthought",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Due diligence costs slashed — through automated compliance checks",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Liquidity unlocked — via on-chain asset tokenization",
      },
      {
        icon: "/icons/white/path-arrows.svg",
        text: "Granularity penalty eliminated — enabling fractional investment",
      },
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Bolt-on compliance controls replaced by architecture — every decision is auditable",
      },
    ],
  },
  {
    title: "Lenders",
    description:
      "Automate lending workflows, access capital faster, and scale operations without increasing headcount.",
    mainImage: "/images/dashboard-lenders-main.svg",
    smallImage: "/images/dashboard-lenders-small.svg",
    items: [
      {
        icon: "/icons/white/shield-check-white.svg",
        text: "Underwriter bottleneck broken — goal-driven workflow automation processes loans at scale; human touchpoints only where chosen",
      },
      {
        icon: "/icons/white/user-minus.svg",
        text: "Smaller loans profitable — usage-based fees scale with loan size, no fixed processing floor",
      },
      {
        icon: "/icons/white/scales.svg",
        text: "Capital access opened — platform compliance and audit infrastructure attracts institutional and private investors directly",
      },
      {
        icon: "/icons/white/module-simple.svg",
        text: "Rule changes in minutes — no-code configuration means no developer dependency, no delays, no operational risk",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Faster completion cuts funding costs directly — every day removed from the cycle reduces the cost of capital per loan",
      },
      {
        icon: "/icons/white/electricity-simple.svg",
        text: "Earlier automated decisioning reduces abort rates — costs no longer absorbed across completed loans, improving per-loan economics across the book",
      },
    ],
  },
  {
    title: "Borrowers",
    description:
      "Borrowers move from enquiry to drawdown in a structured, transparent journey.",
    mainImage: "/images/dashboard-partner-main.svg",
    smallImage: "/images/dashboard-partner-small.svg",
    items: [
      {
        icon: "/icons/white/electricity-simple.svg",
        text: "One application, every lender — data entered once, used across the entire journey via unified workspace",
      },
      {
        icon: "/icons/white/rocket-simple.svg",
        text: "Certainty from the start — instant indicative offer refined automatically as more information is provided",
      },
      {
        icon: "/icons/white/path-arrows.svg",
        text: "Live loan status throughout — consistent outcomes, no chasing, no dependence on underwriter discretion",
      },
      {
        icon: "/icons/white/module-simple.svg",
        text: "Faster process — underwriting instant; legal and valuation steps coordinated within the platform, not left to fragment",
      },
    ],
  },
];

const getTabButtons = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.querySelectorAll("[data-tab]")) : [];

const getTabContent = (ref: React.RefObject<HTMLDivElement | null>) =>
  ref.current ? Array.from(ref.current.children) : [];

export default function MainBenefitsLight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);
  const initialAnimDone = useRef(false);
  const entranceStartedRef = useRef(false);

  const animateActivePanel = () => {
    const panel = contentRef.current?.firstElementChild as HTMLElement | null;
    if (!panel) return;

    const imageItems = panel.querySelectorAll(".wa-image-item");
    const textItems = panel.querySelectorAll("[data-wa-item]");
    const listItems = panel.querySelectorAll("[data-wa-items] > div");

    gsap.killTweensOf([imageItems, textItems, listItems]);

    gsap.set(imageItems, { autoAlpha: 0, y: 24, scale: 0.96 });
    gsap.set(textItems, { autoAlpha: 0, y: 18 });
    gsap.set(listItems, { autoAlpha: 0, y: 16 });

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.to(imageItems, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: TAB_ANIMATION.contentDuration,
      stagger: TAB_ANIMATION.contentStagger,
      ease: TAB_ANIMATION.contentEase,
    })
      .to(
        textItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
        "-=0.35",
      )
      .to(
        listItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
        "-=0.25",
      );
  };

  // Set initial hidden state for tab buttons and content
  useGSAP(() => {
    if (tabButtonsRef.current) {
      gsap.set(tabButtonsRef.current, { opacity: 0 });
    }

    const tabButtons = getTabButtons(tabButtonsRef);
    if (tabButtons.length) gsap.set(tabButtons, { opacity: 0, y: 15 });

    if (activePillRef.current) {
      gsap.set(activePillRef.current, { opacity: 0, scale: 0.85 });
    }

    const tabContent = getTabContent(contentRef);
    if (tabContent.length) gsap.set(tabContent, { opacity: 0, y: 30 });
  });

  // Tab-switch animation — skip on initial render (handled by entrance chain)
  useGSAP(
    () => {
      if (!initialAnimDone.current) return;
      animateActivePanel();
    },
    { dependencies: [activeIndex] },
  );

  // Called when DefHeading finishes its full animation sequence
  const startTabsEntrance = useCallback(() => {
    if (entranceStartedRef.current) return;
    entranceStartedRef.current = true;

    const tl = gsap.timeline({ delay: 1 });

    // 1. Background container fades in first
    if (tabButtonsRef.current) {
      tl.to(tabButtonsRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // 2. Active pill scales in
    if (activePillRef.current) {
      tl.to(
        activePillRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );
    }

    // 3. Tab buttons slide up and fade in with stagger
    const tabButtons = getTabButtons(tabButtonsRef);
    if (tabButtons.length) {
      tl.to(
        tabButtons,
        {
          opacity: 1,
          y: 0,
          duration: TAB_ANIMATION.buttonDuration,
          stagger: TAB_ANIMATION.buttonStagger,
          ease: TAB_ANIMATION.buttonEase,
        },
        "-=0.4",
      );
    }

    // Mark entrance done so tab-switch animation is unlocked
    tl.add(() => {
      initialAnimDone.current = true;
    });

    // 4. Tab content fade in up
    const tabContent = getTabContent(contentRef);
    if (tabContent.length) {
      tl.to(
        tabContent,
        {
          opacity: 1,
          y: 0,
          duration: TAB_ANIMATION.contentDuration,
          stagger: TAB_ANIMATION.contentStagger,
          ease: TAB_ANIMATION.contentEase,
        },
        "+=0.15",
      );
    }
  }, []);

  useGSAP(() => {
    if (!tabButtonsRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: tabButtonsRef.current,
      start: "top 92%",
      once: true,
      onEnter: startTabsEntrance,
    });

    return () => {
      trigger.kill();
    };
  }, [startTabsEntrance]);

  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-[#EBEFF2] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="relative z-10 flex flex-col gap-y-12 w-full max-w-[1200px] px-8 py-32">
        <DefHeading
          theme="dark"
          badgeText=""
          title="Benefits"
          description=""
          showBadge={false}
          onAnimationComplete={startTabsEntrance}
        />

        <div className="w-full flex flex-col gap-y-6">
          {/* Tab Buttons - Horizontal */}
          <div
            ref={tabButtonsRef}
            className="relative flex w-full bg-[#DFE4E8] rounded-2xl p-1.5"
          >
            {/* Sliding active pill */}
            <div
              ref={activePillRef}
              className="absolute top-1.5 bottom-1.5 rounded-2xl bg-white shadow-sm transition-all duration-300 ease-out pointer-events-none"
              style={{
                width: `calc((100% - 0.75rem) / ${tabsData.length})`,
                left: `calc(0.375rem + ${activeIndex} * (100% - 0.75rem) / ${tabsData.length})`,
              }}
            />

            {tabsData.map((tab, index) => (
              <div
                key={tab.title}
                data-tab
                onClick={() => setActiveIndex(index)}
                className={`flex-1 flex items-center justify-center rounded-xl p-5 cursor-pointer transition-colors duration-300 relative z-10 ${
                  index === activeIndex
                    ? "text-[#011F27] font-semibold"
                    : "text-[#5B6F75] font-medium hover:text-[#3a4a4e]"
                }`}
              >
                <span className="text-base">{tab.title}</span>
              </div>
            ))}
          </div>

          {/* Tab content with card layout */}
          <div ref={contentRef} key={activeIndex} className="">
            <div
              className="group relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md p-2 overflow-hidden transition-all duration-300"
              style={{
                boxShadow:
                  "inset 0 1px 2px rgba(255,255,255,0.6), inset 5px 5px 20px rgba(10, 21, 44, 0.06)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute -top-5 -right-5 w-[45%] h-[45%] rounded-full bg-white/60  blur-xl" />
                <div className="absolute -bottom-5 -left-5 w-[45%] h-[45%] rounded-full bg-white/60  blur-xl" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 relative">
                {/* Left side - Content */}
                <div className="p-14">
                  <h2
                    data-wa-item
                    className="text-4xl font-semibold mb-4 text-[#011F27]"
                  >
                    {tabsData[activeIndex].title}
                  </h2>
                  <p data-wa-item className="text-[#495F64] mb-10">
                    {tabsData[activeIndex].description}
                  </p>
                  <ul data-wa-items className="space-y-5">
                    {tabsData[activeIndex].items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="">
                          <IoShieldCheckmark className="w-6 h-6 text-[#39C6ED]" />
                        </div>
                        <span className="text-[#495F64]">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right side - Images (user will provide) */}
                <div className="bg-[#004152] rounded-2xl relative min-h-[400px] lg:min-h-full overflow-hidden">
                  <div className="w-50 h-50 rounded-full blur-[100px] bg-white/50 absolute -top-25 -right-25"></div>
                  {/* Placeholder for user images */}

                  <Image
                    src="/dashboard/benefits-tab-1-img-lg.svg"
                    alt=""
                    width={600}
                    height={400}
                    className="absolute top-1/2 -translate-y-1/2 -right-10 object-contain rounded-lg w-[85%] h-auto"
                  />

                  <Image
                    src="/dashboard/benefits-tab-1-img-sm.png"
                    alt=""
                    width={600}
                    height={400}
                    className="absolute top-1/2 -translate-y-1/2 right-70 object-contain rounded-lg w-[40%] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
