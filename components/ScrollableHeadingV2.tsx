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
  const iconBox1Ref = useRef<HTMLDivElement>(null);
  const iconBox2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
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
          end: "+=4000",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Initial states
      gsap.set(slideRef.current, { autoAlpha: 0, scale: 0.9 });
      gsap.set(iconBox1Ref.current, { autoAlpha: 0, x: -100 });
      gsap.set(iconBox2Ref.current, { autoAlpha: 0, x: 100 });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 30 });

      // Slide: fade in gradually from start to 0.15
      tl.fromTo(
        slideRef.current,
        { autoAlpha: 0, scale: 0.9 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.15,
          ease: "power2.out",
          onStart: animateSlide,
        },
        0,
      )
        // Hold slide briefly
        .to(slideRef.current, { duration: 0.1 }, 0.15)
        // IconBox 1: slide in from left from 0.25 to 0.5
        .fromTo(
          iconBox1Ref.current,
          { autoAlpha: 0, x: -100 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          0.25,
        )
        // IconBox 2: slide in from right from 0.3 to 0.55
        .fromTo(
          iconBox2Ref.current,
          { autoAlpha: 0, x: 100 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          0.3,
        )
        // Hold after icon boxes
        .to(slideRef.current, { duration: 0.2 }, 0.55)
        // Button: fade in from 0.75 to 0.9
        .fromTo(
          buttonRef.current,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.15,
            ease: "power2.out",
          },
          0.75,
        )
        // Hold from 0.9 to end
        .to(slideRef.current, { duration: 0.1 }, 0.9);

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
            <div ref={iconBox1Ref} className="flex-1">
              <IconBox
                src="/icons/white/brain-links.svg"
                width={64}
                title="To rebuild property lending from the ground up with intelligent automation and unwavering compliance."
                titleClassName="!text-2xl"
                description=""
                imageSize="large"
              />
            </div>
            <div ref={iconBox2Ref} className="flex-1">
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

          <div ref={buttonRef} className="mt-8">
            <DefButton size="large">About us</DefButton>
          </div>
        </div>
      </div>
    </div>
  );
}
