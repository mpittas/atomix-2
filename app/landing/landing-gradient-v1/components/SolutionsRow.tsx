"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconBox from "@/components/IconBox";

gsap.registerPlugin(ScrollTrigger);

function IconText({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={icon} alt="" className="w-10 h-10" />
      <p className="text-md font-semibold text-white text-center">{text}</p>
    </div>
  );
}

function SquareBadge({ text }: { text: string }) {
  return (
    <div className="w-full px-3 py-2 border border-dashed border-[#82b0ba] rounded-md text-center text-sm text-white font-bold bg-gradient-to-r from-[#124652] to-[#1e5a68]">
      {text}
    </div>
  );
}

export default function SolutionsRow() {
  const containerRef = useRef<HTMLDivElement>(null);

  const iconText1Ref = useRef<HTMLDivElement>(null);
  const iconText2Ref = useRef<HTMLDivElement>(null);
  const iconText3Ref = useRef<HTMLDivElement>(null);

  const connector1Ref = useRef<HTMLDivElement>(null);
  const connector3Ref = useRef<HTMLDivElement>(null);

  // Top dashed line refs
  const topArrow1Ref = useRef<HTMLImageElement>(null);
  const topArrow2Ref = useRef<HTMLImageElement>(null);
  const topArrow3Ref = useRef<HTMLImageElement>(null);
  const topArrow4Ref = useRef<HTMLImageElement>(null);

  // Bottom dashed line refs
  const bottomArrow1Ref = useRef<HTMLImageElement>(null);
  const bottomArrow2Ref = useRef<HTMLImageElement>(null);
  const bottomArrow3Ref = useRef<HTMLImageElement>(null);
  const bottomArrow4Ref = useRef<HTMLImageElement>(null);

  const row2Box1Ref = useRef<HTMLDivElement>(null);
  const row2Box2Ref = useRef<HTMLDivElement>(null);
  const row2Box3Ref = useRef<HTMLDivElement>(null);
  const row2Box4Ref = useRef<HTMLDivElement>(null);
  const row2Box5Ref = useRef<HTMLDivElement>(null);
  const row2Box6Ref = useRef<HTMLDivElement>(null);

  const row3Connector2Ref = useRef<HTMLDivElement>(null);
  const row3Connector3Ref = useRef<HTMLDivElement>(null);
  const row3Badge1Ref = useRef<HTMLDivElement>(null);
  const row3Badge2Ref = useRef<HTMLDivElement>(null);
  const row3Badge3Ref = useRef<HTMLDivElement>(null);

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
      [iconText1Ref.current, iconText2Ref.current, iconText3Ref.current],
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.5, ease: "power2.out" },
    )
      .fromTo(
        connector1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        "<",
      )
      // Top arrows - animate with clip-path to create drawing effect (top to bottom)
      .fromTo(
        [
          topArrow1Ref.current,
          topArrow2Ref.current,
          topArrow3Ref.current,
          topArrow4Ref.current,
        ],
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "<",
      )
      .fromTo(
        connector3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        "<",
      )
      .fromTo(
        row2Box1Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=1.25",
      )
      .fromTo(
        row2Box2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.1",
      )
      .fromTo(
        row2Box3Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.1",
      )
      .fromTo(
        row2Box4Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.1",
      )
      .fromTo(
        row2Box5Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.1",
      )
      .fromTo(
        row2Box6Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.1",
      )
      // Bottom arrows - animate with clip-path to create drawing effect (top to bottom)
      .fromTo(
        [
          bottomArrow1Ref.current,
          bottomArrow2Ref.current,
          bottomArrow3Ref.current,
          bottomArrow4Ref.current,
        ],
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1",
      )
      .fromTo(
        row3Connector2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        row3Connector3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        "<",
      )
      .fromTo(
        [row3Badge1Ref.current, row3Badge2Ref.current, row3Badge3Ref.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );

    setupHoverEffect(row2Box1Ref);
    setupHoverEffect(row2Box2Ref);
    setupHoverEffect(row2Box3Ref);
    setupHoverEffect(row2Box4Ref);
    setupHoverEffect(row2Box5Ref);
    setupHoverEffect(row2Box6Ref);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-0">
      {/* Row 1: 1 col / 4 cols / 1 col */}
      <div className="grid grid-cols-6 gap-4">
        {/* COLUMN 1 */}
        <div className="bg-blue-500/0 col-span-1 flex flex-col items-center gap-y-3">
          <div ref={iconText1Ref}>
            <IconText icon="/icons/white/ai-chip.svg" text="AI" />
          </div>
          <div
            ref={connector1Ref}
            className="h-18 w-1 border-l border-dashed border-[#999fc7] mx-auto"
          ></div>
        </div>

        {/* COLUMN 2 */}
        <div className="bg-purple-500/0 col-span-4 flex flex-col items-center gap-y-3">
          <div ref={iconText2Ref}>
            <IconText
              icon="/icons/white/brain-links.svg"
              text="Complex Reasoning"
            />
          </div>

          <div className="w-full min-h-[72px] bg-red-500/0 relative">
            <img
              ref={topArrow1Ref}
              src="/dashed-lines/connect-arrow-top-1.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 left-[81px]"
            />

            <img
              ref={topArrow2Ref}
              src="/dashed-lines/connect-arrow-top-2.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 left-[296px]"
            />

            <img
              ref={topArrow3Ref}
              src="/dashed-lines/connect-arrow-top-3.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 right-[81px]"
            />

            <img
              ref={topArrow4Ref}
              src="/dashed-lines/connect-arrow-top-4.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 right-[296px]"
            />
          </div>
        </div>

        {/* COLUMN 3 */}
        <div className="bg-green-500/0 col-span-1 flex flex-col items-center gap-y-3">
          <div ref={iconText3Ref}>
            <IconText icon="/icons/white/blockchain.svg" text="Blockchain" />
          </div>
          <div
            ref={connector3Ref}
            className="h-18 w-1 border-l border-dashed border-white/70 mx-auto"
          ></div>
        </div>
      </div>

      {/* Row 2: 1 col / 1 col / 1 col / 1 col / 1 col / 1 col */}
      <div className="grid grid-cols-6 gap-4">
        <div ref={row2Box1Ref} className="col-span-1 relative">
          <IconBox
            src="/icons/white/document-check.svg"
            imageSize="small"
            title="Rule first architecture"
            description={
              <div className="flex flex-col gap-y-2">
                <div>Uses AI to build loan products</div>
                <div>The system builds optimal workflows automatically</div>
              </div>
            }
            className="!p-4"
          />
        </div>
        <div ref={row2Box2Ref} className="col-span-1 relative">
          <IconBox
            src="/icons/white/puzzle-piece.svg"
            imageSize="small"
            title="Composable logic blocks"
            description="Adapts to any loan type or complexity without developer involvement"
            className="!p-4"
          />
        </div>
        <div ref={row2Box3Ref} className="col-span-1 relative">
          <IconBox
            src="/icons/white/target-arrow.svg"
            imageSize="small"
            title="Goal-driven reasoning"
            description="Adjusts underwriting strategies in real time, delivering the most efficient route to a viable loan"
            className="!p-4"
          />
        </div>
        <div ref={row2Box4Ref} className="col-span-1 relative">
          <IconBox
            src="/icons/white/shield-check-white.svg"
            imageSize="small"
            title="Automated policy enforcement"
            description="Credit rules are reliably automatically enforced, ensuring every loan complies"
            className="!p-4"
          />
        </div>
        <div ref={row2Box5Ref} className="col-span-1 relative">
          <IconBox
            src="/icons/white/users-group.svg"
            imageSize="small"
            title="Unified workspace"
            description="All stakeholders collaborate in real time with live loan status visible to all"
            className="!p-4"
          />
        </div>
        <div ref={row2Box6Ref} className="col-span-1 relative">
          <IconBox
            src="/icons/white/dolcument-search.svg"
            imageSize="small"
            title="Blockchain audit layer"
            description="Immutable record of every decision for trust-less verification"
            className="!p-4"
          />
        </div>
      </div>

      {/* Row 3: 4 cols / 1 col / 1 col */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-cyan-500/0 col-span-4 flex flex-col items-center">
          <div className="w-full min-h-[72px] bg-red-500/0 relative">
            <img
              ref={bottomArrow1Ref}
              src="/dashed-lines/connect-arrow-bottom-1.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 left-[81px]"
            />

            <img
              ref={bottomArrow2Ref}
              src="/dashed-lines/connect-arrow-bottom-2.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 left-[296px]"
            />

            <img
              ref={bottomArrow3Ref}
              src="/dashed-lines/connect-arrow-bottom-3.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 right-[81px]"
            />

            <img
              ref={bottomArrow4Ref}
              src="/dashed-lines/connect-arrow-bottom-4.svg"
              alt="Connecting dashed lines"
              className="object-contain absolute bottom-0 right-[296px]"
            />
          </div>

          <div ref={row3Badge1Ref} className="w-full">
            <SquareBadge text="Full automation end-to-end" />
          </div>
        </div>
        <div className="bg-violet-500/0 col-span-1 flex flex-col items-center">
          <div
            ref={row3Connector2Ref}
            className="h-18 w-1 border-l border-dashed border-white/70 mx-auto"
          ></div>
          <div ref={row3Badge2Ref}>
            <SquareBadge text="Collaboration" />
          </div>
        </div>
        <div className="bg-emerald-500/0 col-span-1 flex flex-col items-center">
          <div
            ref={row3Connector3Ref}
            className="h-18 w-1 border-l border-dashed border-white/70 mx-auto"
          ></div>
          <div ref={row3Badge3Ref}>
            <SquareBadge text="Trust" />
          </div>
        </div>
      </div>
    </div>
  );
}
