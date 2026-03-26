"use client";

import Header from "@/components/header";
import { Button as DefButton } from "@/components/ui";
import SplitText, { HeroSplitTextLoop } from "@/components/typo/SplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingGradientV1Page() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#def-hero-main",
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    tl.set("#def-hero-title-1", { opacity: 1, visibility: "visible" })
      .set("#def-hero-images", { opacity: 1, visibility: "visible" })
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
      );
  }, []);

  return (
    <div>
      <div className="bg-white px-12" id="def-hero-main">
        <Header />

        <section
          className="flex h-[calc(100vh-116px)] bg-[#00081F] rounded-3xl overflow-hidden relative flex flex-col"
          id="atomix-playground-v1"
        >
          {/* HEADING */}
          <div
            className="text-white flex flex-col gap-y-8 justify-center items-center text-center bg-red-500/20 absolute left-1/2 -translate-x-1/2 top-[10%] w-[1000px] opacity-0 visibility-hidden"
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
            className="absolute top-[100%] left-1/2 w-[50%] -translate-x-1/2 opacity-0 visibility-hidden"
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
            className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center bg-green-500/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 visibility-hidden"
            id="def-hero-title-2"
          >
            <div className="rounded-full bg-white/8 text-white text-sm font-semibold px-4 py-2 tracking-wide">
              Mission
            </div>
            <SplitText text="Atomix offers a toolkit to structure loan and investment products which are fast, flexible, and secure." />
            <DefButton size="large">Learn More</DefButton>
          </div>

          {/* TITLE 2 */}
          <div
            className="text-white max-w-[1000px] mx-auto flex flex-col gap-y-8 justify-center items-center text-center bg-yellow-500/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 visibility-hidden"
            id="def-hero-title-3"
          >
            <div className="rounded-full bg-white/8 text-white text-sm font-semibold px-4 py-2 tracking-wide">
              Vision
            </div>
            <SplitText text="Atomix will be the leading automated loan-processing platform & marketplace for asset-backed lending worldwide." />
            <DefButton size="large">Learn More</DefButton>
          </div>
        </section>
      </div>

      <div className="h-[100vh]"></div>
    </div>
  );
}
