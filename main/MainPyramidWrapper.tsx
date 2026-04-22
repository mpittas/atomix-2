"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AtomixPyramidNewDesign from "@/animations/AtomixPyramidNewDesign";
import { FiCheck, FiX } from "react-icons/fi";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

type IconBoxData = {
  icon: string;
  title: string;
  description: string;
  items?: Array<{ icon: React.ReactNode; text: string }>;
};

const iconBoxesData: IconBoxData[] = [
  {
    icon: "/icons/white/shield-check-white.svg",
    title: "Simple SaaS",
    description: "automated and easy to change, but simple products only",
  },
  {
    icon: "/icons/white/target-arrow.svg",
    title: "Bespoke builds",
    description:
      "automated and complex, but £500k+ upfront and expensive to change",
    items: [
      {
        icon: <FiCheck className="text-white/80 w-5 h-5 shrink-0" />,
        text: "Automated",
      },
      {
        icon: <FiCheck className="text-white/80 w-5 h-5 shrink-0" />,
        text: "Complex logic",
      },
      {
        icon: <FiX className="text-white/80 w-5 h-5 shrink-0" />,
        text: "£600k, slow to change",
      },
    ],
  },
  {
    icon: "/icons/white/module-simple.svg",
    title: "Disconnected stacks",
    description:
      "complex and configurable, but humans are the glue; nothing is truly automated",
  },
];

export default function MainPyramidWrapper() {
  const pyramidSectionRef = useRef<HTMLDivElement>(null);
  const pyramidColRef = useRef<HTMLDivElement>(null);
  const iconBoxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pyramidApiRef = useRef<{ setSlider: (v: number) => void } | null>(null);

  useGSAP(() => {
    const section = pyramidSectionRef.current;
    const pyramidCol = pyramidColRef.current;
    const boxes = iconBoxRefs.current.filter(
      (box): box is HTMLDivElement => box !== null,
    );
    if (!section || !pyramidCol || boxes.length === 0) return;

    // Initial state: pyramid horizontally centered in the wrapper,
    // icon boxes hidden and slightly offset for entry animation.
    gsap.set(pyramidCol, { xPercent: 50 });
    gsap.set(boxes, { autoAlpha: 0, y: 32 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top+=110px",
        end: () => `+=${section.offsetHeight * 3}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    const pyramidProgress = { value: 0 };

    // Upstream sections (e.g. MainProblemsTabs) change height when their
    // tabs switch between 3- and 4-column layouts. Window resize alone
    // won't catch that, so observe the document height and refresh
    // ScrollTrigger whenever it changes — otherwise the pin start/end
    // stay stale and the pyramid section jumps mid-scroll.
    let rafId = 0;
    let lastHeight = document.body.scrollHeight;
    const refreshST = () => {
      rafId = 0;
      const h = document.body.scrollHeight;
      if (h === lastHeight) return;
      lastHeight = h;
      ScrollTrigger.refresh();
    };
    const resizeObserver = new ResizeObserver(() => {
      if (rafId) return;
      rafId = requestAnimationFrame(refreshST);
    });
    resizeObserver.observe(document.body);

    tl.to(pyramidProgress, {
      value: 1,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        pyramidApiRef.current?.setSlider(pyramidProgress.value);
      },
    })
      .to(pyramidCol, { xPercent: 0, ease: "none", duration: 0.22 }, 0.66)
      .to(
        boxes,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.25,
          stagger: 0.08,
        },
        0.8,
      );

    return () => {
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={pyramidSectionRef}
      className="min-h-[calc(100vh-126px)] rounded-3xl bg-linear-to-b from-[#0B4858] via-[#1e5360] to-[#0B4858] relative overflow-hidden flex flex-col justify-center items-center"
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

      <div className="max-w-[1200px] min-h-[200px] my-auto flex">
        <div ref={pyramidColRef} className="flex-1">
          <AtomixPyramidNewDesign
            disableScrollTrigger
            onReady={(api) => {
              pyramidApiRef.current = api;
              api.setSlider(0);
            }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-12 pl-20 max-w-lg">
          {iconBoxesData.map((box, index) => (
            <div
              key={index}
              ref={(el) => {
                iconBoxRefs.current[index] = el;
              }}
              className="flex items-start gap-4"
            >
              <img
                src={box.icon}
                alt={box.title}
                className="w-10 h-10 shrink-0 mt-1"
              />
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {box.title}
                </h3>
                <p
                  className={`text-white/80 text-base leading-relaxed ${
                    box.items ? "mb-4" : ""
                  }`}
                >
                  {box.description}
                </p>
                {box.items && (
                  <ul className="space-y-1">
                    {box.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center gap-3 text-white/80"
                      >
                        {item.icon} {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
