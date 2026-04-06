"use client";

import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
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
  useGSAP(() => {
    const snapPoints = [0, 1 / 3, 2 / 3, 1];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=2300",
        scrub: 1,
        snap: { snapTo: snapPoints, duration: 0.25, delay: 0.05 },
        pin: true,
      },
    });

    tl.set("#def-hero-title-1", { opacity: 1, visibility: "visible" })
      .set("#def-hero-images", { opacity: 1, visibility: "visible" })
      .set("#def-hero-title-2", { autoAlpha: 0, scale: 0 })
      .set("#def-hero-title-2-list .hero-list-item", { autoAlpha: 0, y: 20 })
      .set("#def-hero-btn", { autoAlpha: 0 })
      .to(
        "#def-hero-title-1",
        {
          top: "-20%",
          opacity: 0,
          duration: 1,
        },
        0,
      )
      .to(
        "#def-hero-images",
        {
          top: "50%",
          y: "-50%",
          duration: 1,
        },
        0,
      )
      .addLabel("centerReached", 1)
      .to(
        "#def-hero-image-mobile",
        {
          xPercent: -300,
          duration: 1.35,
          ease: "power2.inOut",
        },
        "centerReached",
      )
      .to(
        "#def-hero-image-desktop",
        {
          xPercent: 170,
          duration: 1.35,
          ease: "power2.inOut",
        },
        "centerReached",
      )
      .to(
        "#def-hero-title-2",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.35,
          ease: "power1.out",
        },
        "centerReached",
      )
      .addLabel("title2Visible")
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
        {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        },
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

      {/* HEADING */}
      <div
        className="text-white flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 -translate-x-1/2 top-[10%] w-[1000px] opacity-0 visibility-hidden"
        id="def-hero-title-1"
      >
        <img
          src="/logo/atomix-logo-big-white.svg"
          alt="Atomix Logo"
          className="w-[200px]"
        />
        <SplitText text="Atomix offers a toolkit to structure loan and investment products which are fast, flexible, and secure." />
        <DefButton size="large">Contact Us</DefButton>
      </div>

      {/* IMAGES */}
      <div
        className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[65%] opacity-0 visibility-hidden"
        id="def-hero-images"
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

      {/* TITLE 1 */}
      <div
        className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 visibility-hidden"
        id="def-hero-title-2"
      >
        <BadgeHeadingPill>About Atomix</BadgeHeadingPill>

        <SplitText text="Property lending is overdue for a rebuild. Atomix is it." />

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
