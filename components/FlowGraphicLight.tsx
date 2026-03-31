"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconBox from "./IconBox";

gsap.registerPlugin(ScrollTrigger);

export default function FlowGraphicLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const row1Card1Ref = useRef<HTMLDivElement>(null);
  const row1Card2Ref = useRef<HTMLDivElement>(null);
  const row1Card3Ref = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLImageElement>(null);
  const row2Card1Ref = useRef<HTMLDivElement | null>(null);
  const row2Card2Ref = useRef<HTMLDivElement | null>(null);
  const row2Card3Ref = useRef<HTMLDivElement | null>(null);
  const badge2Ref = useRef<HTMLDivElement | null>(null);

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
      badge1Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
    )
      .fromTo(
        row1Card1Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "+=0.2",
      )
      .fromTo(
        row1Card2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(
        row1Card3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(
        arrowsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "+=0.1",
      )
      .fromTo(
        row2Card1Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "+=0.2",
      )
      .fromTo(
        row2Card2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(
        row2Card3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(
        badge2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "+=0.1",
      );

    setupHoverEffect(row1Card1Ref);
    setupHoverEffect(row1Card2Ref);
    setupHoverEffect(row1Card3Ref);
    setupHoverEffect(row2Card1Ref);
    setupHoverEffect(row2Card2Ref);
    setupHoverEffect(row2Card3Ref);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* BADGE 1 */}
      <div
        ref={badge1Ref}
        className="mb-3 rounded-full px-3 py-1.5 border border-dashed border-[#b3b9ec] text-white bg-linear-to-r from-[#565E98] to-[#646BA0]"
      >
        Market Problems
      </div>

      {/* ROW 1 */}
      <div className="flex gap-4 w-full items-stretch">
        <div ref={row1Card1Ref} className="flex-1 relative">
          <IconBox
            src="/icons/white/eye-closed-white.svg"
            title="Capital providers must trust lenders to follow
lending rules with no real-time visibility"
          />
        </div>

        <div ref={row1Card2Ref} className="flex-1 relative">
          <IconBox
            src="/icons/white/arrows-white.svg"
            title="Lenders deal with 100+ manual touchpoints
per loan"
          />
        </div>

        <div ref={row1Card3Ref} className="flex-1 relative">
          <IconBox
            src="/icons/white/clock-white.svg"
            title="Borrowers face an opaque slow process"
          />
        </div>
      </div>

      {/* ARROWS */}
      <div className="flex justify-center">
        <img
          ref={arrowsRef}
          src="/global/arrows-connecting-light.svg"
          alt="Connecting arrows"
          className="w-full max-w-[760px] select-none"
        />
      </div>

      {/* ROW 2 */}
      <div className="flex gap-4 w-full items-stretch">
        <div ref={row2Card1Ref} className="flex-1 relative">
          <IconBox
            src="/icons/white/eye-white.svg"
            title="Enforced lending rules with real-time visibility for capital providers"
          />
        </div>

        <div ref={row2Card2Ref} className="flex-1 relative">
          <IconBox
            src="/icons/white/electricity-a-white.svg"
            title="Near-zero manual touch-points for lenders"
          />
        </div>

        <div ref={row2Card3Ref} className="flex-1 relative">
          <IconBox
            src="/icons/white/rocket-launch-white.svg"
            title="Transparent, fast lending for borrowers"
          />
        </div>
      </div>

      {/* BADGE 2 */}
      <div
        ref={badge2Ref}
        className="mt-3 rounded-full px-3 py-1.5 border border-dashed border-[#b3b9ec] text-white bg-linear-to-r from-[#565E98] to-[#646BA0]"
      >
        The Atomix Solution
      </div>
    </div>
  );
}
