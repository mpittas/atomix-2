"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
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
          className="mt-4 rounded-xl bg-white/7 p-2.5 text-sm text-white flex items-center gap-2"
        >
          {icon ? <span className="shrink-0 text-white">{icon}</span> : null}
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
      className="relative rounded-3xl border border-[#1491B3] bg-[#003746] p-6 overflow-hidden flex flex-col gap-y-3"
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

export default function CurrentStatusV1() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const topCards =
        section.querySelectorAll<HTMLElement>("[data-cs-top-card]");
      const topCardDescriptions = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-desc]",
      );
      const topCardMarketInfo = section.querySelectorAll<HTMLElement>(
        "[data-cs-top-card-market]",
      );

      const middleRow = section.querySelector<HTMLElement>(
        "[data-cs-middle-row]",
      );
      const middleTitle = section.querySelector<HTMLElement>(
        "[data-cs-middle-title]",
      );
      const middleSubtitle = section.querySelector<HTMLElement>(
        "[data-cs-middle-subtitle]",
      );
      const middleImage = section.querySelector<HTMLElement>(
        "[data-cs-middle-image]",
      );

      const connectorWrap = section.querySelector<HTMLElement>(
        "[data-cs-connectors]",
      );
      const connectorPaths = section.querySelectorAll<SVGPathElement>(
        "[data-cs-connectors] path",
      );

      const featureCards = section.querySelectorAll<HTMLElement>(
        "[data-cs-feature-card]",
      );
      const buttons = section.querySelectorAll<HTMLElement>(
        "[data-cs-buttons] > *",
      );

      gsap.set(topCards, { autoAlpha: 0, y: 48 });

      gsap.set([middleRow, middleTitle, middleSubtitle, middleImage], {
        autoAlpha: 0,
        y: 36,
      });
      gsap.set(featureCards, { autoAlpha: 0, y: 34 });
      gsap.set(buttons, { autoAlpha: 0, y: 26 });

      if (connectorWrap) {
        gsap.set(connectorWrap, { autoAlpha: 1 });
      }

      connectorPaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: `${length}`,
          strokeDashoffset: length,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "+=1200",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      tl.to(topCards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      })
        .to(
          [topCardDescriptions, topCardMarketInfo],
          {
            autoAlpha: 0,
            y: -8,
            duration: 0.3,
            ease: "power2.inOut",
            stagger: 0.03,
          },
          "+=0.1",
        )
        .to(
          topCardDescriptions,
          {
            height: 0,
            marginTop: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          ">-0.05",
        )
        .to(
          topCardMarketInfo,
          {
            height: 0,
            marginTop: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          middleRow,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.15",
        )
        .to(
          middleTitle,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          middleSubtitle,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          middleImage,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.15",
        )
        .to(
          connectorPaths,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.1",
        )
        .to(featureCards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.16,
        })
        .to(buttons, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        });
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
        <div className="flex gap-x-6 mb-6">
          <StatusCard
            quarter="Q2 2026"
            title="Quick Home Sale MVP"
            description="Quick home sale providers depend on speed and certainty of funding. Atomix is built for this model — repeat, high-volume bridging with a pre-approved offer generated instantly and a process that removes friction at every step."
            marketInfo="Part of the £350bn UK annual property loan market"
            icon={<FaHouse className="h-4 w-4" />}
          />

          <StatusCard
            quarter="Q3 2026"
            title="Auction Finance MVP"
            description="Pre-approved finance embedded into the auction experience — certainty of funding before the hammer falls, within the 28-day completion window."
            marketInfo="Unlocking £5.5bn stalled by 30-day completion requirements"
            icon={<FaGavel className="h-4 w-4" />}
          />
        </div>

        <div
          data-cs-middle-row
          className="relative rounded-3xl border border-[#1491B3] bg-[#003746] p-10 pb-0 relative"
        >
          <div className="absolute z-1 bottom-0 left-0 right-0 h-[120px] bg-linear-to-b from-[#003746]/0 to-[#003746] rounded-b-3xl"></div>
          <div
            data-cs-middle-title
            className="text-white text-xl font-semibold mb-1"
          >
            Loan origination
          </div>

          <div
            data-cs-middle-subtitle
            className="text-white text-white/80 mb-6"
          >
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet
          </div>

          <div data-cs-middle-image className="relative w-full relative">
            <div className="w-full">
              <Image
                src="/dashboard/current-status-dashboard-1.svg"
                alt=""
                width={600}
                height={400}
                className="block w-full h-auto rounded-lg"
              />
            </div>

            <Image
              src="/dashboard/current-status-dashboard-1-small.svg"
              alt=""
              width={320}
              height={200}
              className="object-cover rounded-lg absolute top-16 -right-19 z-2"
            />
          </div>
        </div>

        <div data-cs-connectors>
          <CurrentStatusConnectorsV2 />
        </div>

        <div className="-mt-1 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatusFeatureCard
            icon={<TbTargetArrow className="h-10 w-10" />}
            title="Loan
origination"
            description="Data entered once, then structured workflow from application to drawdown."
          />
          <StatusFeatureCard
            icon={<TbTargetArrow className="h-10 w-10" />}
            title="Lawyer workflow"
            description="End-to-end legal, no chasing."
          />
          <StatusFeatureCard
            icon={<TbTargetArrow className="h-10 w-10" />}
            title="Loan management"
            description="Automated lifecycle, start to finish."
          />
          <StatusFeatureCard
            icon={<TbTargetArrow className="h-10 w-10" />}
            title="Capital provider dashboards"
            description="Real-time loan insights, all in one place."
          />
        </div>

        <div data-cs-buttons className="w-full flex gap-x-4 justify-center">
          <DefButton>Learn more</DefButton>

          <DefButton variant="dark">Watch Videos</DefButton>
        </div>
      </div>
    </div>
  );
}
