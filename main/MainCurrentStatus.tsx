"use client";

import { type ReactNode, useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FaGavel,
  FaHouse,
  FaSliders,
  FaRotate,
  FaChartPie,
} from "react-icons/fa6";
import DefHeading from "@/components/typo/DefHeading";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import CurrentStatusConnectors from "@/main/CurrentStatusConnectors";

interface StatusLaunchBoxProps {
  tag: string;
  launchLabel: string;
  title: string;
  description: string;
  highlight: string;
  highlightIcon: ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

function StatusLaunchBox({
  tag,
  launchLabel,
  title,
  description,
  highlight,
  highlightIcon,
  imageSrc,
  imageAlt,
  className = "",
}: StatusLaunchBoxProps) {
  return (
    <article
      className={`rounded-3xl border border-[#1491B3] bg-[#003746] p-10 ${className}`}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full border border-[#4a8a9a]/50 bg-[#38b8b8]/25 px-4 py-1 text-sm font-semibold uppercase text-[#2de1d1]">
          {tag}
        </span>
        <span className="text-sm font-medium text-white/80">{launchLabel}</span>
      </div>

      <h3 className="text-3xl leading-6 font-semibold text-white">{title}</h3>

      <p className="mt-4 text-white/80">{description}</p>

      <div className="mt-4 rounded-xl bg-white/7 p-2.5 text-sm text-white flex items-center gap-2">
        <span className="text-white">{highlightIcon}</span>
        <span>{highlight}</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/20 bg-white/8">
        <img src={imageSrc} alt={imageAlt} className="h-auto w-full" />
      </div>
    </article>
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
    <div className="flex flex-col gap-y-3">
      <div className="text-white">{icon}</div>
      <h4 className="text-lg leading-6 font-semibold text-white">{title}</h4>
      <div className="text-sm text-white/80">{description}</div>
    </div>
  );
}

export default function MainCurrentStatus() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Set initial hidden state
  useGSAP(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
    }
  });

  // Animate content in when heading completes
  const handleHeadingComplete = useCallback(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
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
          title="Current Status"
          description="Atomix is live and building — two product launches confirmed for 2026: quick home sale MVP (Q2) and auction finance MVP (Q3)."
          showBadge={false}
          onAnimationComplete={handleHeadingComplete}
        />

        <div className="flex flex-col justify-center items-center">
          <div
            ref={contentRef}
            className="w-full grid grid-cols-1 lg:grid-cols-2 -mb-[2px]"
          >
            <StatusLaunchBox
              tag="Q2 2026"
              launchLabel="Launching Q2 2026"
              title="Quick Home Sale MVP"
              description="Quick home sale providers depend on speed and certainty of funding. Atomix is built for this model — repeat, high-volume bridging with a pre-approved offer generated instantly and a process that removes friction at every step."
              highlight="Part of the £350bn UK annual property loan market"
              highlightIcon={<FaHouse className="h-4 w-4" />}
              imageSrc="/images/quick-home-sale-dashboard.svg"
              imageAlt="Quick Home Sale MVP dashboard"
              className="rounded-r-none border-r-0"
            />

            <StatusLaunchBox
              tag="Q3 2026"
              launchLabel="Launching Q3 2026"
              title="Auction Finance MVP"
              description="Pre-approved finance embedded into the auction experience — certainty of funding before the hammer falls, within the 28-day completion window."
              highlight="Unlocking £5.5bn stalled by 30-day completion requirements"
              highlightIcon={<FaGavel className="h-4 w-4" />}
              imageSrc="/images/auction-finance-mvp-dashboard.svg"
              imageAlt="Auction Finance MVP dashboard"
              className="rounded-l-none"
            />
          </div>

          <CurrentStatusConnectors />

          <div className="-mt-[2px] p-8 rounded-3xl border border-[#1491B3] bg-[#003746]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <StatusFeatureCard
                icon={<FaSliders className="h-7 w-7" />}
                title="Loan origination"
                description="Data entered once, eligibility checked instantly, indicative offer returned in real time — fully configurable by stakeholders, no developer involvement."
              />
              <StatusFeatureCard
                icon={<FaGavel className="h-7 w-7" />}
                title="Lawyer workflow"
                description="Every legal step managed on-platform — from instruction to execution, no manual chasing, no fragmented communication."
              />
              <StatusFeatureCard
                icon={<FaRotate className="h-7 w-7" />}
                title="Loan management"
                description="Automated lifecycle management from drawdown to exit — breach detection, payment distributions and borrower self-service, every action on blockchain."
              />
              <StatusFeatureCard
                icon={<FaChartPie className="h-7 w-7" />}
                title="Capital provider dashboards"
                description="Real-time visibility across every funded loan — performance, distributions and compliance in a single dedicated dashboard."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
