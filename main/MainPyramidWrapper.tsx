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

    const sectionHeight = section.offsetHeight;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top+=110px",
        end: `+=${sectionHeight * 3}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });

    // As the user scrolls, slide the pyramid from the centered position
    // to its original left-column position.
    tl.to(pyramidCol, { xPercent: 0, ease: "none", duration: 0.3 }, 0)
      // Icon boxes fade/slide in during the same early portion of the
      // pinned scroll. Because the timeline is scrubbed, scrolling back
      // up naturally reverses this into an animate-out.
      .to(
        boxes,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.25,
          stagger: 0.08,
        },
        0.1,
      );

    return () => {
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
          <AtomixPyramidNewDesign />
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
