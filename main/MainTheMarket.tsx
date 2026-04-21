"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DefHeading from "@/components/typo/DefHeading";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";

function getCountParts(value: string) {
  const match = value.match(/^([^\d.-]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return {
      prefix: "",
      target: 0,
      decimals: 0,
    };
  }

  const [, prefix, numericPart] = match;
  const decimals = numericPart.includes(".")
    ? numericPart.split(".")[1].length
    : 0;

  return {
    prefix,
    target: Number(numericPart),
    decimals,
  };
}

function formatCount(value: number, decimals: number) {
  if (decimals === 0) {
    return Math.round(value).toString();
  }

  return value.toFixed(decimals);
}

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
  const countParts = getCountParts(value);

  return (
    <div
      className={`relative h-full overflow-hidden rounded-3xl bg-[#003746] p-6 ${className || ""}`}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#4a8a9a]/10 via-transparent to-transparent" /> */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-8 -bottom-8 right-4 w-[15%] rotate-20 bg-[#58fffc]/15 blur-2xl" />
        <div className="absolute -top-8 -bottom-8 right-65 w-[3%] rotate-20 bg-[#58fffc]/15 blur-xl" />
      </div>

      <div className="relative z-10">
        <BadgeHeadingPill color="dark" size="small">
          {badge}
        </BadgeHeadingPill>
        <div className="mt-4 flex items-baseline gap-1">
          <span
            className="text-5xl font-bold text-white market-count-value"
            data-count-prefix={countParts.prefix}
            data-count-target={countParts.target}
            data-count-decimals={countParts.decimals}
          >
            {`${countParts.prefix}${formatCount(0, countParts.decimals)}`}
          </span>
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
  const countParts = getCountParts(value);

  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span
          className="text-5xl font-bold text-white market-count-value"
          data-count-prefix={countParts.prefix}
          data-count-target={countParts.target}
          data-count-decimals={countParts.decimals}
        >
          {`${countParts.prefix}${formatCount(0, countParts.decimals)}`}
        </span>
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
  const revealStartedRef = useRef(false);

  // Set initial hidden state for each reveal item
  useGSAP(() => {
    if (contentRef.current) {
      const revealItems = contentRef.current.querySelectorAll(
        ".market-reveal-item",
      );
      gsap.set(revealItems, { opacity: 0, y: 30 });
    }
  });

  // Animate content in when heading completes
  const handleHeadingComplete = () => {
    if (!contentRef.current || revealStartedRef.current) return;

    revealStartedRef.current = true;
    const revealItems = contentRef.current.querySelectorAll(
      ".market-reveal-item",
    );
    const countValues = contentRef.current.querySelectorAll<HTMLElement>(
      ".market-count-value",
    );

    const tl = gsap.timeline();

    tl.to(revealItems, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.3,
      ease: "power2.out",
    });

    countValues.forEach((element, index) => {
      const target = Number(element.dataset.countTarget ?? "0");
      const decimals = Number(element.dataset.countDecimals ?? "0");
      const prefix = element.dataset.countPrefix ?? "";
      const counter = { value: 0 };

      tl.to(
        counter,
        {
          value: target,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = `${prefix}${formatCount(counter.value, decimals)}`;
          },
        },
        index * 0.3,
      );
    });
  };

  return (
    <div className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center">
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
          description="UK property lending is large, active and chronically under-automated."
          showBadge={false}
          onAnimationComplete={handleHeadingComplete}
        />

        <div ref={contentRef} className="w-full space-y-2">
          {/* Top row - 3 main stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="market-reveal-item">
              <MainStatCard
                badge="Total Market"
                value="£350"
                unit="bn"
                description="total annual UK property loan originations"
                className="rounded-r-none rounded-b-none"
              />
            </div>
            <div className="market-reveal-item">
              <MainStatCard
                badge="Core Atomix Market"
                value="£60"
                unit="bn"
                description="Bridging, buy-to-let and SME CRE term loans – the Atomix target segment"
                className="rounded-none"
              />
            </div>
            <div className="market-reveal-item">
              <MainStatCard
                badge="Immediate Opportunity"
                value="£11.5"
                unit="bn"
                description="Annual UK bridging originations - majority processed manually, smaller loans structurally underserved"
                className="rounded-l-none rounded-b-none"
              />
            </div>
          </div>

          {/* Second row - 2 stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="market-reveal-item">
              <MainStatCard
                badge="US Market"
                value="£2"
                unit="tn"
                description="Global expansion - same model, next market"
                className="rounded-t-none rounded-r-none"
              />
            </div>
            <div className="market-reveal-item">
              <MainStatCard
                badge="Global Market"
                value="£4"
                unit="tn"
                description="Global expansion - same model, next market"
                className="rounded-t-none rounded-l-none"
              />
            </div>
          </div>

          {/* Bottom section - 6 simple stat boxes in 3x2 grid */}
          <div className="pt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14">
            <div className="market-reveal-item">
              <SimpleStatBox
                value="70"
                unit="%"
                description="of bridging loans originate through brokers — smaller loans unprofitable to service; automation changes this"
              />
            </div>
            <div className="market-reveal-item">
              <SimpleStatBox
                value="30"
                unit="%"
                description="of commercial lending already direct-to-customer — a growing channel Atomix supports natively"
              />
            </div>
            <div className="market-reveal-item">
              <SimpleStatBox
                value="70"
                unit="%"
                description="of lenders actively considering technology investment — Atomix pay-as-you-go model removes the barrier to entry"
              />
            </div>
            <div className="market-reveal-item">
              <SimpleStatBox
                value="64"
                unit="%"
                description="of leading non-bank lenders need to raise or refinance within 12 months — compliance and transparency is the unlock"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
