"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { FaGlobe, FaUsers } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa6";

gsap.registerPlugin(Draggable);

interface WhyCardProps {
  title: string;
  description: string;
  buttonText?: string;
  linkText?: string;
}

interface OverlayItemCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function WhyCard({ title, description, buttonText, linkText }: WhyCardProps) {
  return (
    <div className="text-white flex flex-col items-start gap-y-7 max-w-sm">
      <div className="text-5xl uppercase">{title}</div>
      <div className="text-lg">{description}</div>
      <a
        href={linkText || "#"}
        className="py-2 px-4 border border-white rounded-full"
      >
        {buttonText || "See Opportunities"}
      </a>
    </div>
  );
}

function OverlayItemCard({ icon, title, description }: OverlayItemCardProps) {
  return (
    <div className="flex flex-col items-start text-left gap-y-3 rounded-[20px] p-4 bg-[#003746]">
      <div>{icon}</div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-white/80">{description}</div>
    </div>
  );
}

function OverlayContent({
  innerRef,
}: {
  innerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const overlayItems: OverlayItemCardProps[] = [
    {
      icon: <FaUsers className="h-8 w-8" />,
      title: "Small Team, Big Impact",
      description:
        "Join a focused team where every contribution directly shapes the product, technology, and company.",
    },
    {
      icon: <FaMicrochip className="h-8 w-8" />,
      title: "Cutting-Edge Technology",
      description:
        "Work across AI, automation, data systems, and blockchain-backed infrastructure.",
    },
    {
      icon: <FaGlobe className="h-8 w-8" />,
      title: "Real-World Financial Infrastructure",
      description:
        "Build technology that powers real lending markets and impacts billions in asset-backed finance.",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto w-full px-8 h-full flex flex-col justify-center items-end">
      <div
        ref={innerRef}
        className="flex flex-col items-end text-white text-center gap-y-3 max-w-md"
        style={{ opacity: 0 }}
      >
        {overlayItems.map((item, index) => (
          <OverlayItemCard
            key={`${item.title}-${index}`}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default function SliderWhyWorkWithUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fadeCardRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !handleRef.current) return;

    const container = containerRef.current;
    let maxX = container.offsetWidth / 2;

    const update = (x: number) => {
      const progress = maxX > 0 ? gsap.utils.clamp(0, 1, x / maxX) : 0;
      if (overlayRef.current) {
        gsap.set(overlayRef.current, {
          clipPath: `inset(0 ${(1 - progress) * 50}% 0 50%)`,
        });
      }
      if (fadeCardRef.current) {
        gsap.set(fadeCardRef.current, { opacity: 1 - progress });
      }
      if (overlayContentRef.current) {
        gsap.set(overlayContentRef.current, { opacity: progress });
      }
      if (dividerRef.current) {
        gsap.set(dividerRef.current, { x });
      }
    };

    update(0);

    const instance = Draggable.create(handleRef.current, {
      type: "x",
      bounds: { minX: 0, maxX },
      inertia: false,
      cursor: "ew-resize",
      onDrag() {
        update(this.x);
      },
      onThrowUpdate() {
        update(this.x);
      },
    })[0];

    const handleResize = () => {
      maxX = container.offsetWidth / 2;
      instance.applyBounds({ minX: 0, maxX });
      update(instance.x);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      instance.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center py-28 select-none"
    >
      {/* Base content */}
      <div className="max-w-[1440px] mx-auto w-full px-8 mt-14 relative z-10">
        <div className="w-full flex justify-between">
          <WhyCard
            title="Team"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius lorem eget leo vehicula consectetur."
            buttonText="See Team"
            linkText="#"
          />
          <div ref={fadeCardRef}>
            <WhyCard
              title="OPPORTUNITIES"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius lorem eget leo vehicula consectetur."
              buttonText="See Opportunities"
              linkText="#"
            />
          </div>
        </div>
      </div>

      {/* Overlay content revealed on drag (covers the OPPORTUNITIES side) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] pointer-events-none"
        // style={{ clipPath: "inset(0 50% 0 50%)" }}
      >
        <OverlayContent innerRef={overlayContentRef} />
      </div>

      {/* Vertical divider line (moves with the handle) */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 z-30 pointer-events-none"
      />

      {/* Draggable handle */}
      <div
        ref={handleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/60 flex items-center justify-center bg-white/5 backdrop-blur-sm cursor-ew-resize"
        aria-label="Drag to reveal"
        role="slider"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M15 6l6 6-6 6" />
          <path d="M9 6l-6 6 6 6" />
        </svg>
      </div>
    </div>
  );
}
