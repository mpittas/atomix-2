"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";
import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger);

interface SlideData {
  badge: string;
  text: string;
}

const slide: SlideData = {
  badge: "Our Values",
  text: "Building the future of property lending with innovation, trust, and excellence at our core.",
};

export default function ScrollableHeadingV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<any>(null);
  const hasAnimatedRef = useRef(false);

  const animateSlide = useCallback(() => {
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      splitTextRef.current?.play();
    }
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Initial state
      gsap.set(slideRef.current, { autoAlpha: 0, scale: 0.9 });

      // Slide: fade in gradually from start to 0.5
      tl.fromTo(
        slideRef.current,
        { autoAlpha: 0, scale: 0.9 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onStart: animateSlide,
        },
        0,
      )
        // Hold slide from 0.5 to 1.0
        .to(slideRef.current, { duration: 0.5 }, 0.5);

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden h-[calc(100vh-20px)] z-[60]"
    >
      <div className="flex flex-col items-center justify-center h-full py-16 px-4">
        {/* Single Slide with Two Columns */}
        <div
          ref={slideRef}
          className="text-white max-w-[1200px] mx-auto flex flex-col gap-y-12 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Two Columns with IconBox */}
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
            <div className="flex-1">
              <IconBox
                src="/icons/white/brain-links.svg"
                width={64}
                title="To rebuild property lending from the ground up with intelligent automation and unwavering compliance."
                titleClassName="!text-2xl"
                description=""
                imageSize="large"
              />
            </div>
            <div className="flex-1">
              <IconBox
                src="/icons/white/shield-check-white.svg"
                width={64}
                title="A future where every property loan is processed with speed, transparency, and zero compromise on integrity"
                titleClassName="!text-2xl"
                description=""
                imageSize="large"
              />
            </div>
          </div>

          <DefButton size="large" className="mt-8">
            About us
          </DefButton>
        </div>
      </div>
    </div>
  );
}
