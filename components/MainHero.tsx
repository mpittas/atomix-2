"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
import type { SplitTextHandle } from "@/components/typo/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import IconBox from "@/components/IconBox";
import { TbEyeClosed } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const aboutAtomixItems = [
  {
    icon: <TbEyeClosed />,
    title: "What we are",
    subtitle:
      "a Platform-as-a-Service automating the full lifecycle of property loans, end-to-end; fully configurable and white-label ready",
  },
  {
    icon: <TbEyeClosed />,
    title: "What sets us apart",
    subtitle:
      "rules-first architecture, immutable on-chain audit and goal-driven intelligence operating within both; compliance enforced at every level, not bolted on",
  },
  {
    icon: <TbEyeClosed />,
    title: "Who we serve",
    subtitle: "lenders, capital providers, brokers and borrowers",
  },
  {
    icon: <TbEyeClosed />,
    title: "Where we operate",
    subtitle: "UK-based, with global expansion built into the model",
  },
];

export default function MainHero() {
  const title1SplitRef = useRef<SplitTextHandle>(null);
  const title2SplitRef = useRef<SplitTextHandle>(null);
  const iconBox1Ref = useRef<HTMLDivElement>(null);
  const iconBox2Ref = useRef<HTMLDivElement>(null);
  const iconBoxButtonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
    gsap.set("#def-hero-title-2", { autoAlpha: 0, scale: 0 });
    gsap.set("#def-hero-title-2-list .hero-list-item", {
      autoAlpha: 0,
      y: 40,
    });
    gsap.set("#def-hero-icon-boxes", { autoAlpha: 0 });
    gsap.set(iconBox1Ref.current, { autoAlpha: 0, x: -100 });
    gsap.set(iconBox2Ref.current, { autoAlpha: 0, x: 100 });
    gsap.set(iconBoxButtonRef.current, { autoAlpha: 0, y: 30 });

    // --- SCROLL TIMELINE (scrub, no snap) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=10000",
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

      // Stage 4: Fade out title 2, bring in icon boxes
      .to(
        "#def-hero-title-2",
        { autoAlpha: 0, scale: 0.9, duration: 1, ease: "power2.in" },
        "listVisible+=1.5",
      )
      .to(
        "#def-hero-icon-boxes",
        { autoAlpha: 1, duration: 0.01 },
        "listVisible+=2",
      )
      .addLabel("iconBoxesStart", "listVisible+=2")
      .fromTo(
        iconBox1Ref.current,
        { autoAlpha: 0, x: -100 },
        { autoAlpha: 1, x: 0, duration: 1.5, ease: "power2.out" },
        "iconBoxesStart",
      )
      .fromTo(
        iconBox2Ref.current,
        { autoAlpha: 0, x: 100 },
        { autoAlpha: 1, x: 0, duration: 1.5, ease: "power2.out" },
        "iconBoxesStart+=0.3",
      )
      .fromTo(
        iconBoxButtonRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        "iconBoxesStart+=1.5",
      )
      .addLabel("iconBoxesVisible");
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

      {/* SECOND TITLE - scroll-driven animation */}
      <div
        className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        id="def-hero-title-2"
        style={{ visibility: "hidden" }}
      >
        <SplitText
          ref={title2SplitRef}
          startPaused
          text="Property lending is overdue for a rebuild. Atomix is it."
        />

        <div
          id="def-hero-title-2-list"
          className="w-full max-w-[860px] grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        >
          {aboutAtomixItems.map((item) => (
            <div key={item.title} className="relative">
              <IconBox
                icon={item.icon}
                title={item.title}
                description={item.subtitle}
                imageSize="large"
                titleClassName="text-md"
                className="hero-list-item"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ICON BOXES - Mission & Vision, scroll-driven */}
      <div
        className="text-white max-w-[1200px] mx-auto flex flex-col gap-y-12 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        id="def-hero-icon-boxes"
        style={{ visibility: "hidden" }}
      >
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div ref={iconBox1Ref} className="flex-1">
            <div className="relative flex flex-col items-center gap-3 p-7 rounded-2xl text-center h-full border border-dashed bg-[#124652] border-[#82b0ba] overflow-hidden will-change-transform">
              <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/25 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/25 rounded-full blur-2xl" />
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="text-2xl font-semibold leading-[1.3em] text-white">
                  Fix UK property lending. Start with bridging. Extend into SME
                  CRE term loans — same infrastructure, no rebuild
                </div>
              </div>
            </div>
          </div>
          <div ref={iconBox2Ref} className="flex-1">
            <div className="relative flex flex-col items-center gap-3 p-7 rounded-2xl text-center h-full border border-dashed bg-[#124652] border-[#82b0ba] overflow-hidden will-change-transform">
              <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute -top-8 -right-4 w-32 h-32 bg-white/25 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-white/25 rounded-full blur-2xl" />
              </div>
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="text-2xl font-semibold leading-[1.3em] text-white">
                  Four interconnected marketplaces. Every stakeholder connected.
                  Property lending reimagined — starting in the UK, built for
                  global scale.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={iconBoxButtonRef} className="mt-8">
          <DefButton size="large">Learn more</DefButton>
        </div>
      </div>
    </section>
  );
}
