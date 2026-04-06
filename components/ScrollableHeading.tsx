"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";
import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";

gsap.registerPlugin(ScrollTrigger);

interface SlideData {
  badge: string;
  text: string;
}

const slides: SlideData[] = [
  {
    badge: "Mission",
    text: "To rebuild property lending from the ground up with intelligent automation and unwavering compliance.",
  },
  {
    badge: "Vision",
    text: "A future where every property loan is processed with speed, transparency, and zero compromise on integrity.",
  },
];

export default function ScrollableHeading() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const splitText1Ref = useRef<any>(null);
  const splitText2Ref = useRef<any>(null);
  const hasAnimated1Ref = useRef(false);
  const hasAnimated2Ref = useRef(false);

  const animateSlide1 = useCallback(() => {
    if (!hasAnimated1Ref.current) {
      hasAnimated1Ref.current = true;
      splitText1Ref.current?.play();
    }
  }, []);

  const animateSlide2 = useCallback(() => {
    if (!hasAnimated2Ref.current) {
      hasAnimated2Ref.current = true;
      splitText2Ref.current?.play();
    }
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const slide1Progress = 1 / 3;
      const slide2Progress = 2 / 3;
      const endProgress = 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800",
          scrub: 1,
          snap: {
            snapTo: [0, slide1Progress, slide2Progress, endProgress],
            duration: 0.25,
            delay: 0,
            ease: "power2.out",
          },
          pin: true,
          pinSpacing: true,
        },
      });

      // Initial states
      gsap.set(slide1Ref.current, { autoAlpha: 0, scale: 0.9 });
      gsap.set(slide2Ref.current, { autoAlpha: 0, scale: 0.9 });

      // Slide 1: fade in at start, hold, fade out at slide2Progress
      tl.to(
        slide1Ref.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          onStart: animateSlide1,
        },
        0,
      )
        .addLabel("slide1Visible", 0.2)
        .to(
          slide1Ref.current,
          {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.in",
          },
          slide1Progress - 0.2,
        )
        // Slide 2: fade in at slide1Progress, hold, fade out at end
        .to(
          slide2Ref.current,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            onStart: animateSlide2,
          },
          slide1Progress,
        )
        .addLabel("slide2Visible", slide1Progress + 0.2)
        .to(
          slide2Ref.current,
          {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.in",
          },
          slide2Progress - 0.2,
        );

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden h-[calc(100vh-20px)]"
    >
      <div className="flex flex-col items-center justify-center h-full py-16 px-4">
        {/* Slide 1 - Mission */}
        <div
          ref={slide1Ref}
          className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <BadgeHeadingPill>{slides[0].badge}</BadgeHeadingPill>
          <SplitText
            ref={splitText1Ref}
            text={slides[0].text}
            className="text-5xl leading-[1.2em] font-semibold text-white"
            startPaused={true}
            enableShine={true}
          />

          <DefButton size="large">Contact Us</DefButton>
        </div>

        {/* Slide 2 - Vision */}
        <div
          ref={slide2Ref}
          className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <BadgeHeadingPill>{slides[1].badge}</BadgeHeadingPill>
          <SplitText
            ref={splitText2Ref}
            text={slides[1].text}
            className="text-5xl leading-[1.2em] font-semibold text-white"
            startPaused={true}
            enableShine={true}
          />

          <DefButton size="large">Contact Us</DefButton>
        </div>
      </div>
    </div>
  );
}
