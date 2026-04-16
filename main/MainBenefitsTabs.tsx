"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button as DefButton } from "@/components/ui";
import DefHeading from "@/components/typo/DefHeading";
import IconBoxHorizontal from "@/components/IconBoxHorizontal";
import SoftAurora from "@/components/backgrounds/SoftAurora";

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

export default function MainBenefitsTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<HTMLDivElement>(null);
  const initialAnimDone = useRef(false);
  const learnMoreRef = useRef<HTMLDivElement>(null);

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
      duration: 0.45 * 3,
      stagger: 0.08 * 3,
      ease: "power2.out",
    })
      .to(
        textItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4 * 3,
          stagger: 0.06 * 3,
          ease: "power2.out",
        },
        `-=${0.2 * 3}`,
      )
      .to(
        listItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4 * 3,
          stagger: 0.08 * 3,
          ease: "power2.out",
        },
        `-=${0.12 * 3}`,
      );
  };

  // Set initial hidden state for tab buttons and content
  useGSAP(() => {
    if (tabButtonsRef.current) {
      gsap.set(Array.from(tabButtonsRef.current.children), {
        opacity: 0,
        y: 30,
      });
    }
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
    }
    if (learnMoreRef.current) {
      gsap.set(learnMoreRef.current, { opacity: 0, y: 20 });
    }
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
  const handleHeadingComplete = useCallback(() => {
    const tl = gsap.timeline();

    // 1. Tab buttons fade in up with stagger
    if (tabButtonsRef.current) {
      tl.to(Array.from(tabButtonsRef.current.children), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });
    }

    // Mark entrance done so tab-switch animation is unlocked
    tl.add(() => {
      initialAnimDone.current = true;
    });

    // 2. Tab content fade in up
    if (contentRef.current) {
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "+=0.15",
      );
      tl.add(animateActivePanel, "-=0.8");
    }

    // 3. Learn more button fade in up
    if (learnMoreRef.current) {
      tl.to(
        learnMoreRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8",
      );
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#486c74] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-[500px]">
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

      <div className="relative z-10 flex flex-col gap-y-12 w-full max-w-[1200px] px-8 py-32">
        <DefHeading
          theme="light"
          badgeText=""
          title="Benefits"
          description=""
          showBadge={false}
          onAnimationComplete={handleHeadingComplete}
        />

        <div className="w-full flex flex-col gap-y-6">
          {/* Tab Buttons - Horizontal */}
          <div ref={tabButtonsRef} className="flex gap-4 w-full">
            {tabsData.map((tab, index) => (
              <div
                key={tab.title}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-1 flex flex-col justify-center gap-4 rounded-xl transition-all duration-500 cursor-pointer p-5 overflow-hidden ${
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

          {/* Tab content with two-column layout */}
          <div
            ref={contentRef}
            key={activeIndex}
            className="relative mt-8 md:mt-10"
          >
            {activeIndex === 0 && (
              <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="relative w-full pr-8 pb-8">
                      <div>
                        <Image
                          src={tabsData[0].mainImage}
                          alt=""
                          width={600}
                          height={400}
                          className="wa-image-item object-contain rounded-lg w-full h-auto"
                        />
                      </div>

                      <div className="absolute bottom-0 right-0 w-50 min-h-20 flex flex-col gap-2">
                        {(tabsData[0].smallImages || []).map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            alt=""
                            width={200}
                            height={100}
                            className="wa-image-item object-contain rounded-lg w-full h-auto"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      data-wa-item
                      className="text-3xl font-bold mb-4 text-white"
                    >
                      Capital Providers
                    </h2>
                    <div data-wa-item className="text-lg text-white/80 mb-8">
                      {tabsData[0].description}
                    </div>
                    <div data-wa-items className="grid grid-cols-1 gap-6">
                      {tabsData[0].items.map((item, index) => (
                        <div key={index}>
                          <IconBoxHorizontal src={item.icon}>
                            <div className="">
                              <span className="font-semibold text-white">
                                {item.text}
                              </span>
                            </div>
                          </IconBoxHorizontal>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeIndex === 1 && (
              <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="order-1">
                    <div className="relative w-full pr-8 pb-8">
                      <div className="relative">
                        <div>
                          <Image
                            src={tabsData[1].mainImage}
                            alt=""
                            width={600}
                            height={400}
                            className="wa-image-item object-contain rounded-lg w-full h-auto"
                          />
                        </div>

                        {tabsData[1].smallImage && (
                          <Image
                            src={tabsData[1].smallImage}
                            alt=""
                            width={360}
                            height={200}
                            className="wa-image-item object-cover rounded-lg absolute -bottom-4 left-1/2 -translate-x-1/2"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      data-wa-item
                      className="text-3xl font-bold mb-4 text-white"
                    >
                      Lenders
                    </h2>
                    <div data-wa-item className="text-lg text-white/80 mb-8">
                      {tabsData[1].description}
                    </div>
                    <div data-wa-items className="flex flex-col gap-y-6">
                      {tabsData[1].items.map((item, index) => (
                        <div key={index}>
                          <IconBoxHorizontal src={item.icon}>
                            <div className="max-w-[500px]">
                              <span className="font-semibold text-white">
                                {item.text}
                              </span>
                            </div>
                          </IconBoxHorizontal>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeIndex === 2 && (
              <div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="relative w-full pr-8 pb-8">
                      <div className="relative">
                        <div>
                          <Image
                            src={tabsData[2].mainImage}
                            alt=""
                            width={600}
                            height={400}
                            className="wa-image-item object-contain rounded-lg w-full h-auto"
                          />
                        </div>

                        {tabsData[2].smallImage && (
                          <Image
                            src={tabsData[2].smallImage}
                            alt=""
                            width={200}
                            height={100}
                            className="wa-image-item object-contain absolute bottom-0 right-0 h-auto"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      data-wa-item
                      className="text-3xl font-bold mb-4 text-white"
                    >
                      Borrowers
                    </h2>
                    <div data-wa-item className="text-lg text-white/80 mb-8">
                      {tabsData[2].description}
                    </div>
                    <div data-wa-items className="flex flex-col gap-y-6">
                      {tabsData[2].items.map((item, index) => (
                        <div key={index}>
                          <IconBoxHorizontal src={item.icon}>
                            <div className="max-w-[500px]">
                              <span className="font-semibold text-white">
                                {item.text}
                              </span>
                            </div>
                          </IconBoxHorizontal>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div ref={learnMoreRef} className="w-full flex justify-center">
          <DefButton size="large" href="/landing-platform-benefits">
            Learn more
          </DefButton>
        </div>
      </div>
    </div>
  );
}
