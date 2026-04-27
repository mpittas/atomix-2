"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import Image from "next/image";
import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
import type { SplitTextHandle } from "@/components/typo/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import IconBox from "@/components/IconBox";
import IconBoxLight from "@/components/IconBoxLight";
import { TbEyeClosed } from "react-icons/tb";
import { IoShieldCheckmark } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const aboutAtomixItems = [
  {
    icon: <IoShieldCheckmark />,
    title: "What we are",
    subtitle:
      "a Platform-as-a-Service automating the full lifecycle of property loans, end-to-end; fully configurable and white-label ready",
  },
  {
    icon: <IoShieldCheckmark />,
    title: "What sets us apart",
    subtitle:
      "rules-first architecture, immutable on-chain audit and goal-driven intelligence operating within both; compliance enforced at every level, not bolted on",
  },
  {
    icon: <IoShieldCheckmark />,
    title: "Who we serve",
    subtitle: "lenders, capital providers, brokers and borrowers",
  },
  {
    icon: <IoShieldCheckmark />,
    title: "Where we operate",
    subtitle: "UK-based, with global expansion built into the model",
  },
];

function renderTypewriterTitle(title: string) {
  const lines = [title];
  return lines.map((line, lineIdx) => (
    <span key={lineIdx} className="block leading-[1.05]">
      {Array.from(line).map((ch, i) => (
        <span
          key={`${lineIdx}-${i}`}
          data-hero-type-char
          className="inline-block opacity-0"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  ));
}

interface MissionVisionCardProps {
  cardRef: RefObject<HTMLDivElement | null>;
  title: string;
  description: string;
}

function MissionVisionCard({
  cardRef,
  title,
  description,
}: MissionVisionCardProps) {
  return (
    <div
      ref={cardRef}
      className="absolute left-1/2 top-1/2 -translate-1/2 md:p-8 text-left flex flex-col justify-center gap-5 w-xl"
    >
      <h3 className="text-4xl md:text-8xl uppercase leading-[1.05]">
        {renderTypewriterTitle(title)}
      </h3>
      <div data-hero-item className="w-full h-px bg-white/20 mb-3" />
      <div data-hero-item className="text-base md:text-xl leading-relaxed mb-6">
        {description}
      </div>
      <div data-hero-item>
        <DefButton href="#" size="large">
          Learn More
        </DefButton>
      </div>
    </div>
  );
}

export default function MainHero() {
  const title1SplitRef = useRef<SplitTextHandle>(null);
  const title2SplitRef = useRef<SplitTextHandle>(null);
  const missionCardRef = useRef<HTMLDivElement>(null);
  const visionCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!missionCardRef.current || !visionCardRef.current) return;

    const missionChars = missionCardRef.current.querySelectorAll<HTMLElement>(
      "[data-hero-type-char]",
    );
    const missionItems =
      missionCardRef.current.querySelectorAll<HTMLElement>("[data-hero-item]");
    const visionChars = visionCardRef.current.querySelectorAll<HTMLElement>(
      "[data-hero-type-char]",
    );
    const visionItems =
      visionCardRef.current.querySelectorAll<HTMLElement>("[data-hero-item]");

    // --- PAGE LOAD ANIMATION ---
    const loadTl = gsap.timeline({ delay: 0.15 });

    loadTl
      .fromTo(
        "#def-hero-logo",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
      .set("#def-hero-split-text", { autoAlpha: 1 }, 0.3)
      .add(() => title1SplitRef.current?.play(), 0.3)
      .fromTo(
        "#def-hero-load-btn",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.8,
      )
      .fromTo(
        "#def-hero-images",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.6,
      );

    // --- Set initial hidden states for scroll-animated elements ---
    gsap.set("#def-hero-title-2-bg", { autoAlpha: 0 });
    gsap.set("#def-hero-title-2", { autoAlpha: 0, scale: 0 });
    gsap.set("#def-hero-title-2-list .hero-list-item", {
      autoAlpha: 0,
      y: 40,
    });
    gsap.set("#def-hero-title-2-heading", { autoAlpha: 1, y: 0 });
    gsap.set("#def-hero-mission-vision", { autoAlpha: 0 });
    gsap.set(missionCardRef.current, { autoAlpha: 0 });
    gsap.set(visionCardRef.current, { autoAlpha: 0 });
    gsap.set(missionChars, { opacity: 0 });
    gsap.set(visionChars, { opacity: 0 });
    gsap.set(missionItems, { y: 40, opacity: 0 });
    gsap.set(visionItems, { y: 40, opacity: 0 });

    // --- SCROLL TIMELINE (scrub, no snap) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=7000",
        scrub: 2.5,
        pin: true,
      },
    });

    // Stage 1: Title 1 exits upward, images rise to center
    tl.to("#def-hero-title-1", { top: "-20%", opacity: 0, duration: 1 }, 0).to(
      "#def-hero-images",
      { top: "50%", y: "-50%", duration: 1 },
      0,
    );

    // Stage 2: Images split, title 2 scales in
    tl.addLabel("centerReached", 1)
      .to(
        "#def-hero-image-mobile",
        { xPercent: -300, duration: 1.35, ease: "power2.inOut" },
        "centerReached",
      )
      .to(
        "#def-hero-image-desktop",
        { xPercent: 170, duration: 1.35, ease: "power2.inOut" },
        "centerReached",
      )
      .to(
        "#def-hero-title-2-bg",
        { autoAlpha: 1, duration: 1.35, ease: "power1.out" },
        "centerReached",
      )
      .to(
        "#def-hero-title-2",
        { autoAlpha: 1, scale: 1, duration: 1.35, ease: "power1.out" },
        "centerReached",
      )
      .call(() => title2SplitRef.current?.play(), [], "centerReached+=0.6");

    // Stage 3: List items and button
    tl.addLabel("title2Visible")
      .to(
        "#def-hero-title-2-list .hero-list-item",
        {
          autoAlpha: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          stagger: 0.72,
        },
        "title2Visible+=0.9",
      )
      .addLabel("listVisible")

      // Stage 4: Fade out list items, reveal mission/vision boxes in place
      .to(
        "#def-hero-title-2-list .hero-list-item",
        { autoAlpha: 0, y: -40, duration: 1, ease: "power2.in", stagger: 0.2 },
        "listVisible+=2.1",
      )
      .to(
        "#def-hero-title-2-heading",
        { autoAlpha: 0, y: -24, duration: 1, ease: "power2.in" },
        "listVisible+=2.1",
      )
      .to(
        "#def-hero-title-2-bg",
        { autoAlpha: 0, duration: 0.5, ease: "power2.in" },
        "listVisible+=4.7",
      )
      .to(
        "#def-hero-mission-vision",
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        "listVisible+=4.7",
      )
      .addLabel("missionVisible", "listVisible+=4.9")
      .fromTo(
        missionCardRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
        "missionVisible",
      )
      .to(
        missionChars,
        {
          opacity: 1,
          duration: 0.06,
          ease: "none",
          stagger: 0.095,
        },
        "missionVisible",
      )
      .to(
        missionItems,
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power2.out",
          stagger: 0.28,
        },
        "missionVisible+=0.45",
      )
      .addLabel("visionVisible", "missionVisible+=2.4")
      .to(
        missionItems,
        {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.05,
        },
        "visionVisible",
      )
      .to(
        missionChars,
        {
          opacity: 0,
          duration: 0.03,
          ease: "none",
          stagger: { each: 0.018, from: "end" },
        },
        "visionVisible+=0.05",
      )
      .to(
        missionCardRef.current,
        { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" },
        "visionVisible+=0.3",
      )
      .fromTo(
        visionCardRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.55, ease: "power2.inOut" },
        "visionVisible+=0.3",
      )
      .to(
        visionChars,
        {
          opacity: 1,
          duration: 0.06,
          ease: "none",
          stagger: 0.095,
        },
        "visionVisible+=1.15",
      )
      .to(
        visionItems,
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power2.out",
          stagger: 0.28,
        },
        "visionVisible+=1.7",
      )
      .addLabel("missionVisionComplete");
  }, []);

  return (
    <section
      className="flex flex-col h-[calc(100vh-116px)] bg-[#004054] rounded-3xl overflow-hidden relative"
      id="atomix-playground-v1"
    >
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

      {/* FIRST TITLE - page load animation */}
      <div
        className="text-white px-6 flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 -translate-x-1/2 top-[10%] max-w-[1000px] w-full"
        id="def-hero-title-1"
      >
        <Image
          src="/logo/atomix-logo-big-white.svg"
          alt="Atomix Logo"
          width={200}
          height={60}
          className="w-[150px] md:w-[200px] h-auto"
          id="def-hero-logo"
          style={{ visibility: "hidden" }}
        />
        <div id="def-hero-split-text" style={{ visibility: "hidden" }}>
          <SplitText
            ref={title1SplitRef}
            startPaused
            text="Atomix offers a toolkit to structure loan and investment products which are fast, flexible, and secure."
          />
        </div>
        <div id="def-hero-load-btn" style={{ visibility: "hidden" }}>
          <DefButton size="large">Contact Us</DefButton>
        </div>
      </div>

      {/* IMAGES - page load animation */}
      <div
        className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[65%]"
        id="def-hero-images"
        style={{ visibility: "hidden" }}
      >
        <div className="relative w-full" id="def-hero-image-desktop">
          <img
            src="/dashboard/hero-desktop-img.svg"
            alt="Atomix desktop dashboard preview"
            className="w-full select-none object-contain pl-[12%]"
          />
        </div>

        <div id="def-hero-image-mobile">
          <img
            src="/dashboard/hero-mobile-img.svg"
            alt="Atomix mobile form preview"
            className="absolute left-0 bottom-0 w-[22%] select-none object-contain"
          />
        </div>
      </div>

      {/* SECOND TITLE BACKGROUND - scroll-driven animation */}
      <div
        className="bg-[#EBEFF2] absolute top-0 left-0 w-full h-full min-w-full min-h-full"
        id="def-hero-title-2-bg"
        style={{ visibility: "hidden" }}
      />

      {/* SECOND TITLE CONTENT - scroll-driven animation */}
      <div
        className="text-[#011F27] flex flex-col gap-y-8 justify-center items-start text-left absolute top-0 left-0 w-full h-full min-w-full min-h-full p-8 md:p-12"
        id="def-hero-title-2"
        style={{ visibility: "hidden" }}
      >
        <div
          id="def-hero-title-2-heading"
          className="w-full max-w-[1200px] mx-auto"
        >
          <SplitText
            ref={title2SplitRef}
            startPaused
            text="Property lending is overdue for a rebuild. Atomix is it."
          />
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto mt-2">
          <div
            id="def-hero-title-2-list"
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {aboutAtomixItems.map((item) => (
              <div key={item.title} className="relative h-full">
                <IconBoxLight
                  icon={item.icon}
                  title={item.title}
                  description={item.subtitle}
                  className="hero-list-item h-full"
                />
              </div>
            ))}
          </div>

          <div
            id="def-hero-mission-vision"
            className="absolute inset-x-0 top-0 w-full min-h-[520px] md:min-h-[420px] text-white"
            style={{ visibility: "hidden" }}
          >
            <MissionVisionCard
              cardRef={missionCardRef}
              title="Mission"
              description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
            />

            <MissionVisionCard
              cardRef={visionCardRef}
              title="Vision"
              description="Rebuild UK property lending. Start with bridging. Extend into SME CRE term loans — same infrastructure, no rebuild."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
