"use client";

import { useRef } from "react";
import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
import type { SplitTextHandle } from "@/components/typo/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";

gsap.registerPlugin(ScrollTrigger);

const aboutAtomixItems = [
  {
    title: "Rules-first core",
    subtitle: "Credit policies enforced deterministically at every step.",
  },
  {
    title: "Adaptive intelligence",
    subtitle:
      "AI-assisted orchestration that adjusts to each case in real time.",
  },
  {
    title: "Operational speed",
    subtitle:
      "Automated workflows that reduce manual underwriting bottlenecks.",
  },
  {
    title: "Audit-ready trust",
    subtitle: "Decision trails remain transparent, immutable, and reviewable.",
  },
];

export default function MainHero() {
  const title1SplitRef = useRef<SplitTextHandle>(null);
  const title2SplitRef = useRef<SplitTextHandle>(null);

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
      y: 20,
    });
    gsap.set("#def-hero-btn", { autoAlpha: 0 });

    // --- SCROLL TIMELINE (scrub, no snap) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=2300",
        scrub: 1,
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
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.25,
        },
        "title2Visible+=0.35",
      )
      .addLabel("listVisible")
      .to(
        "#def-hero-btn",
        { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
        "listVisible+=0.1",
      );
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
        className="text-white flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 -translate-x-1/2 top-[10%] w-[1000px]"
        id="def-hero-title-1"
      >
        <img
          src="/logo/atomix-logo-big-white.svg"
          alt="Atomix Logo"
          className="w-[200px]"
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
        <BadgeHeadingPill>About Atomix</BadgeHeadingPill>

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
            <div
              key={item.title}
              className="hero-list-item rounded-xl bg-white/5 backdrop-blur-sm p-3 text-left"
            >
              <h4 className="text-md font-semibold text-white">{item.title}</h4>
              <p className="text-sm text-white/75 mt-1">{item.subtitle}</p>
            </div>
          ))}
        </div>

        <div id="def-hero-btn">
          <DefButton size="large">Learn More</DefButton>
        </div>
      </div>
    </section>
  );
}
