"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconBox from "./IconBox";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FlowCardsHor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<HTMLImageElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const arrow2Ref = useRef<HTMLImageElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const arrow3Ref = useRef<HTMLImageElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const setupHoverEffect = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    const element = ref.current;

    element.addEventListener("mouseenter", () => {
      gsap.to(element, {
        scale: 1.2,
        zIndex: 10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        scale: 1,
        zIndex: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      card1Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
    )
      .fromTo(
        arrow1Ref.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        card2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.2",
      )
      .fromTo(
        arrow2Ref.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        card3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.2",
      )
      .fromTo(
        arrow3Ref.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        card4Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.2",
      );

    setupHoverEffect(card1Ref);
    setupHoverEffect(card2Ref);
    setupHoverEffect(card3Ref);
    setupHoverEffect(card4Ref);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center gap-1 px-8"
    >
      <div ref={card1Ref} className="w-56 relative">
        <IconBox
          src="/icons/white/shield-check-white.svg"
          width={48}
          title="Solution"
        />
      </div>

      <Image
        ref={arrow1Ref}
        src="/icons/dashed-arrow-light.svg"
        alt="arrow"
        width={20}
        height={20}
        className="flex-shrink-0"
      />

      <div ref={card2Ref} className="w-64 relative">
        <IconBox
          src="/icons/white/module-electricity-white.svg"
          width={48}
          title="Collaborative, trusted, end-to-end automation"
        />
      </div>

      <Image
        ref={arrow2Ref}
        src="/icons/dashed-arrow-light.svg"
        alt="arrow"
        width={20}
        height={20}
        className="flex-shrink-0"
      />

      <div ref={card3Ref} className="w-64 relative">
        <IconBox
          src="/icons/white/stop-icon-white.svg"
          width={48}
          title="Existing technology does not deliver this"
        />
      </div>

      <Image
        ref={arrow3Ref}
        src="/icons/dashed-arrow-light.svg"
        alt="arrow"
        width={20}
        height={20}
        className="flex-shrink-0"
      />

      <div ref={card4Ref} className="w-56 relative">
        <IconBox
          src="/icons/white/atomix-icon.svg"
          width={48}
          title="Atomix does!"
          titleClassName="font-semibold"
        />
      </div>
    </div>
  );
}
