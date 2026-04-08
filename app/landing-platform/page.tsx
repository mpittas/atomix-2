"use client";

import MainHeroV3 from "@/components/MainHeroV3";
import HeaderRounded from "@/components/headerRounded";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollableTabsMission from "@/components/ScrollableTabsMission";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPlatformPage() {
  useGSAP(() => {
    // Pin section-2 to the bottom of the viewport
    ScrollTrigger.create({
      trigger: "#section-2-wrapper",
      start: "bottom bottom",
      end: "+=2000",
      pin: true,
      scrub: true,
    });

    // Basic scroll-driven animation: fade & slide up inner content
    gsap.fromTo(
      "#section-2-content",
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#section-2-wrapper",
          start: "bottom bottom",
          end: "+=1000",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <div className="overflow-x-hidden">
      <HeaderRounded />
      <MainHeroV3 />

      {/* Section 2: ScrollableTabsMission - Full screen with small offset */}
      <div className="bg-white px-3 mb-6 py-3" id="section-2-wrapper">
        <section className="flex flex-col h-[calc(100vh-120px)] bg-[#004054]/100 rounded-3xl overflow-hidden relative items-center justify-center">
          <div id="section-2-content" style={{ visibility: "hidden" }}>
            <ScrollableTabsMission />
          </div>
        </section>
      </div>

      <div className=" px-3">
        <div className="bg-green-900 min-h-screen rounded-3xl"></div>
      </div>
    </div>
  );
}
