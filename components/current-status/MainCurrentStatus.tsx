"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import CurrentStatusConnectorsV2 from "@/main/CurrentStatusConnectorsV2";
import DefHeading from "@/components/typo/DefHeading";
import { FaHouse, FaGavel } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { Button as DefButton } from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface StatusCardProps {
  quarter: string;
  title: string;
  description: string;
  marketInfo: string;
  icon?: ReactNode;
}

function StatusCard({
  quarter,
  title,
  description,
  marketInfo,
  icon,
}: StatusCardProps) {
  return (
    <div
      data-cs-top-card
      className="flex-1 relative rounded-3xl border border-[#1491B3] bg-[#003746] p-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 -bottom-8 right-4 w-[15%] rotate-20 bg-[#58fffc]/15 blur-2xl" />
        <div className="absolute -top-8 -bottom-8 right-65 w-[3%] rotate-20 bg-[#58fffc]/15 blur-xl" />
      </div>

      <div className="relative flex flex-col justify-between h-full">
        <div data-cs-top-card-content>
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full px-4 py-1 text-sm font-semibold uppercase text-white bg-linear-to-r from-[#3C6671] to-[#184A57]">
              {quarter}
            </span>
          </div>

          <h3 className="text-3xl leading-6 font-semibold text-white">
            {title}
          </h3>

          <p data-cs-top-card-desc className="mt-4 text-white/80">
            {description}
          </p>
        </div>

        <div
          data-cs-top-card-market
          className="mt-4 rounded-xl bg-white/7 p-2.5 text-lg leading-6 text-white flex items-center gap-2"
        >
          {icon ? (
            <span className="shrink-0 text-white mr-1">{icon}</span>
          ) : null}
          <span>{marketInfo}</span>
        </div>
      </div>
    </div>
  );
}

interface StatusFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function StatusFeatureCard({
  icon,
  title,
  description,
}: StatusFeatureCardProps) {
  return (
    <div
      data-cs-feature-card
      className="relative rounded-3xl border border-[#1491B3] bg-[#003746] p-6 overflow-hidden flex flex-col gap-y-3 text-left"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 -bottom-8 right-4 w-[15%] rotate-20 bg-[#58fffc]/15 blur-2xl" />
        <div className="absolute -top-8 -bottom-8 right-65 w-[3%] rotate-20 bg-[#58fffc]/15 blur-xl" />
      </div>
      <div className="text-white">{icon}</div>
      <h4 className="text-2xl font-semibold text-white">{title}</h4>
      <div className="text-white/80">{description}</div>
    </div>
  );
}

interface TabData {
  title: string;
  description: string;
  mainImage: string;
  smallImages: string[];
}

const TABS: TabData[] = [
  {
    title: "Loan\norigination",
    description:
      "Data entered once, then structured workflow from application to drawdown.",
    mainImage: "/dashboard/current-status-dashboard-1.svg",
    smallImages: ["/dashboard/current-status-dashboard-1-small.svg"],
  },
  {
    title: "Lawyer workflow",
    description: "End-to-end legal, no chasing.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-2-small-1.svg",
      "/dashboard/current-status-dashboard-2-small-2.svg",
    ],
  },
  {
    title: "Loan management",
    description: "Automated lifecycle, start to finish.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-3-small-1.svg",
      "/dashboard/current-status-dashboard-3-small-2.svg",
    ],
  },
  {
    title: "Capital provider dashboards",
    description: "Real-time loan insights, all in one place.",
    mainImage: "/dashboard/current-status-dashboard-2.svg",
    smallImages: [
      "/dashboard/current-status-dashboard-4-small-1.svg",
      "/dashboard/current-status-dashboard-4-small-2.svg",
      "/dashboard/current-status-dashboard-4-small-3.svg",
    ],
  },
];

export default function CurrentStatusV2() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const topCards =
        section.querySelectorAll<HTMLElement>("[data-cs-top-card]");
      const topCardsRow = topCards[0]?.parentElement ?? null;
      const topCardDescriptions = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-desc]",
      );
      const topCardMarketInfo = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-market]",
      );
      const inlineConnector1 = section.querySelector<SVGPathElement>(
        "[data-cs-inline-connector-1]",
      );
      const inlineConnector2 = section.querySelector<SVGPathElement>(
        "[data-cs-inline-connector-2]",
      );
      const connector1 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-1]",
      );
      const connector2 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-2]",
      );
      const connector3 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-3]",
      );
      const connector4 = section.querySelector<SVGPathElement>(
        "[data-cs-connector-4]",
      );
      const statement1 = section.querySelector<HTMLElement>(
        "[data-cs-statement-1]",
      );
      const verticalLine = section.querySelector<HTMLElement>(
        "[data-cs-vertical-line]",
      );
      const statement2 = section.querySelector<HTMLElement>(
        "[data-cs-statement-2]",
      );
      const featureCards = section.querySelectorAll<HTMLElement>(
        "[data-cs-feature-card]",
      );
      const buttons = section.querySelectorAll<HTMLElement>(
        "[data-cs-buttons] > *",
      );
      const bottomConnectorSequence = [
        connector1,
        connector2,
        connector3,
        connector4,
      ];

      gsap.set(topCards, { autoAlpha: 0, y: 60 });
      gsap.set([statement1, statement2], {
        autoAlpha: 0,
        y: 60,
      });
      gsap.set(verticalLine, {
        scaleY: 0,
        transformOrigin: "top center",
      });
      gsap.set([topCardDescriptions, topCardMarketInfo], {
        overflow: "hidden",
      });
      gsap.set(featureCards, {
        autoAlpha: 0,
        y: 0,
        scale: 0.9,
        transformOrigin: "center center",
      });
      gsap.set(buttons, { autoAlpha: 0, y: 20 });

      if (inlineConnector1) {
        const length = inlineConnector1.getTotalLength();
        gsap.set(inlineConnector1, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      }
      if (inlineConnector2) {
        const length = inlineConnector2.getTotalLength();
        gsap.set(inlineConnector2, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      }

      bottomConnectorSequence.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(topCards, {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: "power2.out",
        stagger: 0.5,
      })
        .to(inlineConnector1, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(inlineConnector2, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          statement1,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          verticalLine,
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          statement2,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=0.5",
        );

      for (let index = 0; index < bottomConnectorSequence.length; index += 1) {
        const path = bottomConnectorSequence[index];
        const card = featureCards[index];
        const isFirstStep = index === 0;

        if (path) {
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            isFirstStep ? "-=1" : ">",
          );
        }

        if (card) {
          tl.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 0,
              scale: 0.9,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.35,
              ease: "power2.out",
              immediateRender: false,
            },
            ">",
          );
        }
      }

      tl.to(
        buttons,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=6",
      );

      if (topCardsRow) {
        const topCardsCollapseTl = gsap.timeline({
          scrollTrigger: {
            trigger: topCardsRow,
            start: "bottom 70%",
            toggleActions: "play none none none",
          },
        });

        topCardsCollapseTl
          .to(
            topCardDescriptions,
            {
              autoAlpha: 0,
              y: -10,
              height: 0,
              marginTop: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            topCardMarketInfo,
            {
              autoAlpha: 0,
              y: -10,
              height: 0,
              marginTop: 0,
              paddingTop: 0,
              paddingBottom: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            "<",
          );
      }
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center py-28"
    >
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

      <DefHeading
        theme="light"
        badgeText=""
        title="Current Status"
        description="Atomix is live and building — two product launches confirmed for 2026: quick home sale MVP (Q2) and auction finance MVP (Q3)."
        showBadge={false}
      />

      <div className="max-w-[1200px] mx-auto px-8 mt-14 flex flex-col">
        <div className="flex gap-x-6">
          <StatusCard
            quarter="Q2 2026"
            title="Quick Home Sale MVP"
            description="Quick home sale providers depend on speed and certainty of funding. Atomix is built for this model — repeat, high-volume bridging with a pre-approved offer generated instantly and a process that removes friction at every step."
            marketInfo="Part of the £350bn UK annual property loan market"
            icon={<FaHouse className="h-6 w-6" />}
          />

          <StatusCard
            quarter="Q3 2026"
            title="Auction Finance MVP"
            description="Pre-approved finance embedded into the auction experience — certainty of funding before the hammer falls, within the 28-day completion window."
            marketInfo="Unlocking £5.5bn stalled by 30-day completion requirements"
            icon={<FaGavel className="h-6 w-6" />}
          />
        </div>

        <div className="flex justify-center">
          <div className="w-[440px] -mr-[2px]">
            <svg
              viewBox="0 0 325 80"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                overflow: "visible",
              }}
            >
              <path
                data-cs-inline-connector-1
                className="status-connector-path"
                d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
                fill="none"
                stroke="#90abb3"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="w-[440px] -ml-[2px]">
            <svg
              viewBox="0 0 325 80"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                overflow: "visible",
              }}
            >
              <path
                data-cs-inline-connector-2
                className="status-connector-path"
                d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
                fill="none"
                stroke="#90abb3"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div
          data-cs-statement-1
          className="text-3xl text-white text-center font-semibold py-4"
        >
          Atomix is live and building — two product launches confirmed for 2026:
          quick home sale MVP (Q2) and auction finance MVP (Q3).
        </div>

        <div className="flex justify-center ">
          <div
            data-cs-vertical-line
            className="h-12 bg-white/60 w-[3px] rounded-lg"
          ></div>
        </div>

        <div
          data-cs-statement-2
          className="text-3xl text-white text-center font-semibold py-4"
        >
          Statement 2 comes here
        </div>

        <div data-cs-connectors>
          {/* ds */}
          <CurrentStatusConnectorsV2 />
        </div>

        <div className="-mt-1 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TABS.map((tab) => (
            <StatusFeatureCard
              key={tab.title}
              icon={<TbTargetArrow className="h-10 w-10" />}
              title={tab.title}
              description={tab.description}
            />
          ))}
        </div>

        <div data-cs-buttons className="w-full flex gap-x-4 justify-center">
          <DefButton>Learn more</DefButton>

          <DefButton variant="dark">Watch Videos</DefButton>
        </div>
      </div>
    </div>
  );
}
