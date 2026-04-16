"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import SoftAurora from "@/components/backgrounds/SoftAurora";

interface MainStatCardProps {
  badge: string;
  value: string;
  unit: string;
  description: string;
  className?: string;
}

function MainStatCard({
  badge,
  value,
  unit,
  description,
  className,
}: MainStatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#4a8a9a]/50 bg-[#0a3d4d]/60 p-6 ${className || ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a8a9a]/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <span className="inline-block rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#0B4858]">
          {badge}
        </span>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-5xl font-bold text-white">{value}</span>
          <span className="text-2xl font-medium text-white">{unit}</span>
        </div>
        <p className="mt-3 text-md leading-relaxed text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
}

interface SimpleStatBoxProps {
  value: string;
  unit?: string;
  description: string;
}

function SimpleStatBox({ value, unit, description }: SimpleStatBoxProps) {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-bold text-white">{value}</span>
        {unit && (
          <span className="text-2xl font-medium text-white">{unit}</span>
        )}
      </div>
      <p className="mt-3 text-md leading-relaxed text-white/80">
        {description}
      </p>
    </div>
  );
}

export default function MainTheMarket() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Set initial hidden state
  useGSAP(() => {
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
    }
  });

  // Animate content in when heading completes
  const handleHeadingComplete = () => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  };

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
          title="The Market"
          description=""
          showBadge={false}
          onAnimationComplete={handleHeadingComplete}
        />

        <div ref={contentRef} className="w-full space-y-4">
          {/* Top row - 3 main stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            <MainStatCard
              badge="Total Market"
              value="£350"
              unit="bn"
              description="total annual UK property loan originations"
              className="rounded-r-none border-r-0"
            />
            <MainStatCard
              badge="Core Atomix Market"
              value="£60"
              unit="bn"
              description="Bridging, buy-to-let and SME CRE term loans – the Atomix target segment"
              className="rounded-none"
            />
            <MainStatCard
              badge="Immediate Opportunity"
              value="£11.5"
              unit="bn"
              description="Annual UK bridging originations - majority processed manually, smaller loans structurally underserved"
              className="rounded-l-none border-l-0"
            />
          </div>

          {/* Second row - 2 stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <MainStatCard
              badge="US Market"
              value="£2"
              unit="tn"
              description="Global expansion - same model, next market"
              className="rounded-r-none border-r-0"
            />
            <MainStatCard
              badge="Global Market"
              value="£4"
              unit="tn"
              description="Global expansion - same model, next market"
              className="rounded-l-none"
            />
          </div>

          {/* Bottom section - 6 simple stat boxes in 3x2 grid */}
          <div className="pt-14 grid grid-cols-1 md:grid-cols-3 gap-x-14 gap-y-14">
            <SimpleStatBox
              value="70"
              unit="%"
              description="of bridging loans originate through brokers — smaller loans unprofitable to service; automation changes this"
            />
            <SimpleStatBox
              value="30"
              unit="%"
              description="of commercial lending already direct-to-customer — a growing channel Atomix supports natively"
            />
            <SimpleStatBox
              value="£5.5"
              unit="bn"
              description="in auction sales stalled by 28-day completion requirements manual lending cannot meet"
            />
            <SimpleStatBox
              value="70"
              unit="%"
              description="of lenders actively considering technology investment — Atomix pay-as-you-go model removes the barrier to entry"
            />
            <SimpleStatBox
              value="64"
              unit="%"
              description="of leading non-bank lenders need to raise or refinance within 12 months — compliance and transparency is the unlock"
            />
            <SimpleStatBox
              value="£2"
              unit="tn"
              description="the US commercial real estate market opportunity, addressable on the same model"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
