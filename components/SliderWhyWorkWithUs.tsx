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
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
}

interface OverlayItemCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function WhyCard({
  title,
  description,
  buttonText,
  linkText,
  className = "text-white",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "border-white",
}: WhyCardProps) {
  return (
    <div className={`${className} flex flex-col items-start gap-y-7 max-w-sm`}>
      <div className={`text-5xl uppercase ${titleClassName}`}>{title}</div>
      <div className={`text-lg ${descriptionClassName}`}>{description}</div>
      <a
        href={linkText || "#"}
        className={`py-3.5 px-7 border font-semibold rounded-full ${buttonClassName} transition-all duration-300 hover:bg-white hover:text-black`}
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
    {
      icon: <FaUsers className="h-8 w-8" />,
      title: "Ownership From Day One",
      description:
        "Take ownership of key systems early and help define both architecture and product direction.",
    },
    {
      icon: <FaMicrochip className="h-8 w-8" />,
      title: "Fast Product Iteration",
      description:
        "Ship quickly with short feedback loops, rapid experiments, and direct collaboration across teams.",
    },
    {
      icon: <FaGlobe className="h-8 w-8" />,
      title: "Global Scope, Practical Impact",
      description:
        "Deliver infrastructure used across regions, turning complex financial workflows into scalable products.",
    },
  ];

  const leftOverlayItems = overlayItems.slice(0, 3);
  const rightOverlayItems = overlayItems.slice(3, 6);

  return (
    <div ref={innerRef} className="w-full h-full flex">
      <div className="flex-1 min-h-[100px] bg-[#EBEFF2] flex justify-center items-center">
        <div
          className="max-w-lg flex flex-col items-end text-white text-center gap-y-3"
          data-overlay-content
          style={{ opacity: 0 }}
        >
          {leftOverlayItems.map((item, index) => (
            <OverlayItemCard
              key={`${item.title}-${index}`}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[100px] bg-[#499DB8] flex justify-center items-center">
        <div
          className="max-w-lg flex flex-col items-end text-white text-center gap-y-3"
          data-overlay-content
          style={{ opacity: 0 }}
        >
          {rightOverlayItems.map((item, index) => (
            <OverlayItemCard
              key={`${item.title}-${index}`}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SliderWhyWorkWithUs() {
  const DEBUG_SHOW_FULL_OVERLAY = false;
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
      const signedProgress = maxX > 0 ? gsap.utils.clamp(-1, 1, x / maxX) : 0;
      const rightProgress = Math.max(0, signedProgress);
      const leftProgress = Math.max(0, -signedProgress);
      const revealProgress = Math.abs(signedProgress);
      const contentOpacity = gsap.utils.clamp(0, 1, revealProgress * 12);
      if (overlayRef.current) {
        const leftInset = (1 - leftProgress) * 50;
        const rightInset = (1 - rightProgress) * 50;
        gsap.set(overlayRef.current, {
          clipPath: DEBUG_SHOW_FULL_OVERLAY
            ? "inset(0 0 0 0)"
            : `inset(0 ${rightInset}% 0 ${leftInset}%)`,
        });
      }
      if (fadeCardRef.current) {
        gsap.set(fadeCardRef.current, { opacity: 1 - rightProgress });
      }
      if (overlayContentRef.current) {
        gsap.set(
          overlayContentRef.current.querySelectorAll("[data-overlay-content]"),
          {
            opacity: DEBUG_SHOW_FULL_OVERLAY ? 1 : contentOpacity,
          }
        );
      }
      if (dividerRef.current) {
        gsap.set(dividerRef.current, { x });
      }
    };

    update(0);

    const instance = Draggable.create(handleRef.current, {
      type: "x",
      bounds: { minX: -maxX, maxX },
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
      instance.applyBounds({ minX: -maxX, maxX });
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
      className="min-h-[calc(100vh-126px)] rounded-3xl bg-[#499DB8] relative overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Base content */}
      <div className="w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="w-full flex justify-between flex-1">
          <div className="w-1/2 bg-[#499DB8] flex flex-col items-center justify-center">
            <WhyCard
              title="Team"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius lorem eget leo vehicula consectetur."
              buttonText="See Team"
              linkText="#"
            />
          </div>
          <div
            className="w-1/2 bg-[#EBEFF2]  flex flex-col items-center justify-center"
          >
            <div ref={fadeCardRef}>
              <WhyCard
                title="OPPORTUNITIES"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius lorem eget leo vehicula consectetur."
                buttonText="See Opportunities"
                linkText="#"
                className="text-[#011F27]"
                descriptionClassName="text-[#4B6166]"
                buttonClassName="border-[#d2d5d8] hover:bg-[#d2d5d8] bg-transparent text-[#011F27]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay content revealed on drag (covers the OPPORTUNITIES side) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20"
        // style={{ clipPath: "inset(0 50% 0 50%)" }}
      >
        <OverlayContent innerRef={overlayContentRef} />
      </div>

      {/* Vertical divider line (moves with the handle) */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 left-1/2 w-px bg-transparent z-30 pointer-events-none"
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
