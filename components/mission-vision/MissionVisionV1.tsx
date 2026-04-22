"use client";

import { forwardRef, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button as DefButton } from "@/components/ui";
import SoftAurora from "@/components/backgrounds/SoftAurora";

gsap.registerPlugin(ScrollTrigger);

// Splits a string into spans of individual letters.
// Whitespace is preserved as a non-animated span and line breaks render as <br />.
function renderLetters(text: string) {
  // Each word renders on its own line, inside its own clipping mask so
  // the per-letter translate animation reveals smoothly.
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, wordIdx) => (
    <span
      key={wordIdx}
      className="block overflow-hidden pb-[0.1em]"
      style={{ lineHeight: 1.05 }}
    >
      {Array.from(word).map((ch, i) => (
        <span
          key={i}
          data-mv-letter
          className="inline-block will-change-transform"
          style={{ transformOrigin: "0% 100%" }}
        >
          {ch}
        </span>
      ))}
    </span>
  ));
}

interface MissionVisionBlockProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const MissionVisionBlock = forwardRef<HTMLDivElement, MissionVisionBlockProps>(
  function MissionVisionBlock(
    { title, description, buttonText, buttonLink },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-mv-block
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-start gap-y-8 w-xl"
      >
        <h2
          data-mv-title
          className="text-[80px] font-normal font-bold uppercase leading-[1.05em]"
        >
          {renderLetters(`Our\n${title}`)}
        </h2>
        <div data-mv-item className="w-full h-[1px] bg-white/16"></div>
        <div data-mv-item className="text-xl">
          {description}
        </div>
        <div data-mv-item>
          <DefButton href={buttonLink}>{buttonText}</DefButton>
        </div>
      </div>
    );
  },
);

export default function MissionVisionV1() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !wrapperRef.current ||
        !innerRef.current ||
        !missionRef.current ||
        !visionRef.current
      )
        return;

      const blocks = [missionRef.current, visionRef.current];

      // Initial hidden state for both blocks
      blocks.forEach((block) => {
        const letters = block.querySelectorAll<HTMLElement>("[data-mv-letter]");
        const items = block.querySelectorAll<HTMLElement>("[data-mv-item]");
        gsap.set(block, { autoAlpha: 0 });
        gsap.set(letters, {
          yPercent: 110,
          rotate: 8,
          opacity: 0,
        });
        gsap.set(items, { y: 40, opacity: 0 });
      });

      const animateBlockIn = (block: HTMLElement) => {
        const letters = block.querySelectorAll<HTMLElement>("[data-mv-letter]");
        const items = block.querySelectorAll<HTMLElement>("[data-mv-item]");
        const tl = gsap.timeline();
        tl.set(block, { autoAlpha: 1 });
        // New split-letter animation: rise from below + small rotation unwind
        tl.to(letters, {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.035,
        });
        // Fade-in-up cascade for separator, description, button
        tl.to(
          items,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.18,
          },
          "-=0.55",
        );
        return tl;
      };

      const animateBlockOut = (block: HTMLElement) => {
        const letters = block.querySelectorAll<HTMLElement>("[data-mv-letter]");
        const items = block.querySelectorAll<HTMLElement>("[data-mv-item]");
        const tl = gsap.timeline();
        tl.to(items, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.05,
        });
        tl.to(
          letters,
          {
            yPercent: -110,
            rotate: -8,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            stagger: 0.015,
          },
          "-=0.35",
        );
        tl.set(block, { autoAlpha: 0 });
        return tl;
      };

      const section = innerRef.current;

      // Step state: 0 = nothing shown, 1 = mission shown, 2 = vision shown.
      let currentStep = 0;
      let activeTween: gsap.core.Timeline | null = null;

      const goToStep = (next: number) => {
        if (next === currentStep) return;
        activeTween?.kill();
        const tl = gsap.timeline();

        if (next === 0) {
          if (currentStep === 1) tl.add(animateBlockOut(missionRef.current!));
          if (currentStep === 2) tl.add(animateBlockOut(visionRef.current!));
        } else if (next === 1) {
          if (currentStep === 2) tl.add(animateBlockOut(visionRef.current!));
          tl.add(animateBlockIn(missionRef.current!));
        } else if (next === 2) {
          if (currentStep === 1) tl.add(animateBlockOut(missionRef.current!));
          tl.add(animateBlockIn(visionRef.current!));
        }

        currentStep = next;
        activeTween = tl;
      };

      const pinST = ScrollTrigger.create({
        trigger: section,
        start: "top top+=110px",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: [0, 1],
          duration: { min: 0.25, max: 0.6 },
          ease: "power1.inOut",
        },
        onEnter: () => goToStep(1),
        onEnterBack: () => {
          // Coming back up from below the pin end.
          goToStep(2);
        },
        onLeave: () => {
          // Scrolled past pin end — keep vision visible as section unpins.
          goToStep(2);
        },
        onLeaveBack: () => goToStep(0),
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.5) goToStep(1);
          else goToStep(2);
        },
      });

      // Refresh ScrollTrigger when upstream sections change height so the
      // pin start/end don't go stale mid-scroll.
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
        activeTween?.kill();
        pinST.kill();
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

        <div className="relative w-full h-[calc(100vh-126px)]">
          <MissionVisionBlock
            ref={missionRef}
            title="Mission"
            description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
            buttonText="Learn More"
            buttonLink="#"
          />

          <MissionVisionBlock
            ref={visionRef}
            title="Vision"
            description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
            buttonText="Learn More"
            buttonLink="#"
          />
        </div>
      </div>
    </div>
  );
}
