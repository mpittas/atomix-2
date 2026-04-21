"use client";

import { useRef } from "react";
import IconBox from "@/components/IconBox";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";
import { Button as DefButton } from "@/components/ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

export default function MissionVisionV2() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !innerRef.current) return;

      const section = innerRef.current;
      const iconItems = section.querySelectorAll<HTMLElement>(
        "[data-mv2-icon-item]",
      );
      const buttonItem = section.querySelector<HTMLElement>(
        "[data-mv2-button-item]",
      );

      gsap.set(iconItems, { autoAlpha: 0, scale: 0.88, y: 30 });
      if (buttonItem) {
        gsap.set(buttonItem, { autoAlpha: 0, scale: 0.88, y: 30 });
      }

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=110px",
          end: () => `+=${section.offsetHeight * 5.5}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (iconItems[0]) {
        master.to(iconItems[0], {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (iconItems[1]) {
        master.to(
          iconItems[1],
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.35",
        );
      }

      if (buttonItem) {
        master.to(buttonItem, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        });
      }

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

      return () => {
        resizeObserver.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
        master.scrollTrigger?.kill();
        master.kill();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef}>
      <div
        ref={innerRef}
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
        <div className="relative w-full max-w-[860px] px-4">
          <div className="flex flex-col items-center gap-6 w-full">
            <div data-mv2-icon-item>
              <IconBox
                icon={<BadgeHeadingPill color="dark">Mission</BadgeHeadingPill>}
                description=""
                title="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
                titleClassName="!text-2xl"
              />
            </div>
            <div data-mv2-icon-item>
              <IconBox
                icon={<BadgeHeadingPill color="dark">Vision</BadgeHeadingPill>}
                description=""
                title="Interconnected marketplaces — borrowers, lenders, capital providers and investors, each connected within a single ecosystem. Distribution partners deploy their own discrete, white-labelled environments within the same infrastructure. Property lending reimagined — starting in the UK, built for global scale."
                titleClassName="!text-2xl"
              />
            </div>
            <div data-mv2-button-item className="mt-2">
              <DefButton>Learn more</DefButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
