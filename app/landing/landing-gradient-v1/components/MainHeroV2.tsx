"use client";

import { Button as DefButton } from "@/components/ui";
import SplitText from "@/components/typo/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SoftAurora from "@/components/backgrounds/SoftAurora";
import { BadgeHeadingPill } from "@/components/ui/BadgeHeadingPill";

gsap.registerPlugin(ScrollTrigger);

export default function MainHeroV2() {
  useGSAP(() => {
    const heroPinTriggerId = "def-hero-main-pin";
    let lastSnapProgress = 0;
    const centerProgress = 1 / 3;
    const title2Progress = 2 / 3;
    const title3Progress = 1;

    const tl = gsap.timeline({
      scrollTrigger: {
        id: heroPinTriggerId,
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=2800",
        scrub: 1,
        snap: {
          snapTo: (value) => {
            if (value <= centerProgress) {
              lastSnapProgress = value;

              return value;
            }

            const snapPoints = [centerProgress, title2Progress, title3Progress];
            const isForward = value >= lastSnapProgress;

            if (isForward) {
              const nextPoint =
                snapPoints.find((point) => point >= value) ?? title3Progress;

              lastSnapProgress = nextPoint;

              return nextPoint;
            }

            const prevPoint =
              [...snapPoints].reverse().find((point) => point <= value) ??
              centerProgress;

            lastSnapProgress = prevPoint;

            return prevPoint;
          },
          duration: 0.25,
          delay: 0.05,
        },
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    tl.set("#def-hero-title-1", { opacity: 1, visibility: "visible" })
      .set("#def-hero-images", { opacity: 1, visibility: "visible" })
      .set("#def-hero-title-2", { autoAlpha: 0, scale: 0 })
      .set("#def-hero-title-3", { autoAlpha: 0 })
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
        "#def-hero-title-2",
        {
          autoAlpha: 0,
          scale: 0,
          duration: 0.5,
          ease: "power1.in",
        },
        "title2Visible",
      )
      .set("#def-hero-title-3", { scale: 0 })
      .to(
        "#def-hero-title-3",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        "title2Visible+=0.5",
      )
      .addLabel("title3Visible");
  }, []);

  return (
    <section
      className="flex h-[calc(100vh-116px)] bg-[#004054] rounded-3xl overflow-hidden relative flex flex-col"
      id="atomix-playground-v2"
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
        className="text-white flex flex-col gap-y-8 justify-center items-center text-center bg-red-500/0 absolute left-1/2 -translate-x-1/2 top-[10%] w-[1000px] opacity-0 visibility-hidden"
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
        className="absolute top-[70%] left-1/2 -translate-x-1/2  w-[65%] opacity-0 visibility-hidden"
        id="def-hero-images"
      >
        <div className="relative w-full" id="def-hero-image-desktop">
          <img
            src="/dashboard/hero-desktop-img.svg"
            alt="Atomix desktop dashboard preview"
            className="w-full select-none"
            style={{
              objectFit: "contain",
              paddingLeft: "12%",
            }}
          />
        </div>

        <div id="def-hero-image-mobile">
          <img
            src="/dashboard/hero-mobile-img.svg"
            alt="Atomix mobile form preview"
            className="absolute left-0 bottom-0 w-[22%] select-none"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* TITLE 1 */}
      <div
        className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center bg-green-500/0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 visibility-hidden"
        id="def-hero-title-2"
      >
        <BadgeHeadingPill>Mission</BadgeHeadingPill>

        <SplitText text="Atomix offers a toolkit to structure loan and investment products which are fast, flexible, and secure." />
        <DefButton size="large">Learn More</DefButton>
      </div>

      {/* TITLE 2 */}
      <div
        className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center bg-yellow-500/0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 visibility-hidden"
        id="def-hero-title-3"
      >
        <BadgeHeadingPill>Vision</BadgeHeadingPill>
        <SplitText text="Atomix will be the leading automated loan-processing platform & marketplace for asset-backed lending worldwide." />
        <DefButton size="large">Learn More</DefButton>
      </div>
    </section>
  );
}
